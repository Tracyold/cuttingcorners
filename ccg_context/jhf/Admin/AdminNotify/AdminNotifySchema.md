# AdminAccountNotifications — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/Admin/AdminNotify/AdminNotify.md`_

## Overview

Server-side admin notification system that automatically logs user activity into a notifications table when key events occur. Admin dashboard reads from this table in real time. SMS alerts fire simultaneously via Edge Functions.

---

## Table: `admin_notifications`

Stores every event that requires admin attention.

| Column     | Type      | Default           | Description                                            |
| ---------- | --------- | ----------------- | ------------------------------------------------------ |
| id         | uuid      | gen_random_uuid() | Primary key                                            |
| type       | text      | –                 | Event type (matches event_type in edge function calls) |
| message    | text      | –                 | Human readable description of the event                |
| user_id    | uuid      | –                 | References auth.users — which user triggered the event |
| read       | boolean   | false             | Whether admin has seen this notification               |
| created_at | timestamp | now()             | When the event occurred                                |

**RLS:** Enabled — admin only via `is_admin()`

---

## Trigger Function: `notify_admin_on_event()`

Server-side function that automatically inserts a row into `admin_notifications` whenever a key event fires.

- **Language:** plpgsql
- **Security:** DEFINER (runs with elevated privileges server-side)
- **Search Path:** public (security best practice)

---

## Database Triggers (Server-Side, Automatic)

These fire automatically — no frontend code required to log these events.

### Admin Notification Triggers → `notify_admin_on_event()`

| Trigger Name               | Table             | Event  | Timing | Confirmed |
| -------------------------- | ----------------- | ------ | ------ | --------- |
| admin_notify_inquiry       | account_inquiries | INSERT | AFTER  | ✅        |
| admin_notify_guest_inquiry | guest_inquiries   | INSERT | AFTER  | ✅        |
| admin_notify_service       | service_requests  | INSERT | AFTER  | ✅        |
| admin_notify_chat          | chat_messages     | INSERT | AFTER  | ✅        |
| admin_notify_work_order    | work_orders       | INSERT | AFTER  | ✅        |

### User Notification Triggers → `notify_user_on_event()`

| Trigger Name           | Table             | Event  | Timing | Confirmed |
| ---------------------- | ----------------- | ------ | ------ | --------- |
| user_notify_inquiry    | account_inquiries | INSERT | AFTER  | ✅        |
| user_notify_service    | service_requests  | INSERT | AFTER  | ✅        |
| user_notify_work_order | work_orders       | INSERT | AFTER  | ✅        |

### Other Triggers

| Trigger Name               | Table         | Event  | Timing | Purpose                                     | Confirmed |
| -------------------------- | ------------- | ------ | ------ | ------------------------------------------- | --------- |
| trigger_create_chat_thread | account_users | INSERT | AFTER  | Auto creates chat thread for new users      | ✅        |
| trigger_update_chat_thread | chat_messages | INSERT | AFTER  | Updates chat thread metadata on new message | ✅        |
| trigger_mark_products_sold | invoices      | INSERT | AFTER  | Marks product INACTIVE when invoice created | ✅        |
| user_notify_invoice        | invoices      | INSERT | AFTER  | Notifies user when invoice created          | ✅        |
| user_notify_new_product    | products      | INSERT | AFTER  | Notifies users when new product goes ACTIVE | ✅        |

---

## How Admin Notifications Work End to End

1. User action occurs (inquiry, guest inquiry, chat, work order, service request)
1. Supabase trigger fires automatically server-side
1. Row inserted into `admin_notifications` with type, message, and user_id
1. Simultaneously — Edge Function `send-admin-notification` sends SMS to admin phone
1. Admin logs into dashboard → reads unread notifications from `admin_notifications` table
1. Admin marks notifications as read → `read` column updates to `true`

---

## RLS Policy

| Policy Name              | Role          | Command | Condition  |
| ------------------------ | ------------- | ------- | ---------- |
| admin_full_notifications | authenticated | ALL     | is_admin() |

---

## How Emergent Should Connect to This

**To display notifications in admin dashboard:**

```javascript
// Load unread notifications
const { data } = await supabase
    .from("admin_notifications")
    .select("*")
    .eq("read", false)
    .order("created_at", { ascending: false });

// Mark all as read
await supabase
    .from("admin_notifications")
    .update({ read: true })
    .eq("read", false);
```

**Enable Supabase Realtime on this table** so the notification bell updates instantly without page refresh:

- Go to Supabase → Database → Replication
- Enable replication on `admin_notifications` table

---

## Notification Types

### Admin Notifications (`admin_notifications` table)

These are all the `type` values that will appear in `admin_notifications` and the `event_type` values sent in `send-admin-notification` edge function calls. They must match exactly.

| type                | Display Message                       | Triggered By                              |
| ------------------- | ------------------------------------- | ----------------------------------------- |
| `account_inquiries` | New product inquiry from account user | account user submits inquiry on shop page |
| `guest_inquiries`   | New product inquiry from guest        | guest submits inquiry on shop page        |
| `service_requests`  | New service request submitted         | account user submits service request      |
| `chat_messages`     | New chat message from user            | account user sends chat message           |
| `work_orders`       | Work order accepted by user           | account user accepts a work order         |

### User Notifications (`notify_user_on_event()`)

These fire automatically server-side — no frontend call needed. The user receives an SMS/in-app notification when:

| Trigger                | Table             | When It Fires                                   |
| ---------------------- | ----------------- | ----------------------------------------------- |
| user_notify_inquiry    | account_inquiries | Admin receives a product inquiry from this user |
| user_notify_service    | service_requests  | Admin receives a service request from this user |
| user_notify_work_order | work_orders       | Work order status changes (admin-driven)        |

---

## Edge Function: `send-admin-notification`

Called from frontend after certain user actions. Sends SMS to admin phone in addition to the DB trigger logging the event.

| Caller                | event_type          | Additional body fields |
| --------------------- | ------------------- | ---------------------- |
| PublicProductPage.tsx | `account_inquiries` | `user_id`              |
| PublicProductPage.tsx | `guest_inquiries`   | `guest_name`           |
| UserDashboardUserView | `service_requests`  | `user_id`              |
| UserDashboardUserView | `work_orders`       | `work_order_id`        |
| UserDashboardUserView | `chat`              | `thread_id`            |

---

## Admin Permission Model

- Single admin account
- Admin identity verified server-side via `is_admin()` function on every request
- No client-side permission checks — all enforced at database level
- Admin can log in from any device or network securely
