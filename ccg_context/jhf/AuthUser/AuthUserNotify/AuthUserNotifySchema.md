# UserAccountNotifications — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/Admin/AuthUserNotify/AuthUserNotify.md`_

## What This Document Covers

This document is the single source of truth for all user-facing SMS notifications in the system. It covers:

- The `user_sms_preferences` table and the five opt-in toggles
- Every event that can notify the account user via SMS
- Which events are trigger-fired automatically (never call manually)
- Which events require a manual `send-user-notification` edge function call and from which file
- The correct `send-user-notification` body format

For **admin-facing** notifications, see `AdminAccountNotifications.md`.

---

## `user_sms_preferences` Table

One row per account user. Created on first toggle if it doesn’t exist yet.

| Column                | Type    | Default | Controls                                   |
| --------------------- | ------- | ------- | ------------------------------------------ |
| `user_id`             | uuid    | —       | FK → `auth.users(id)`, unique, primary key |
| `phone`               | text    | —       | Phone number to send SMS to                |
| `opt_in_work_orders`  | boolean | false   | Work order created / status updated        |
| `opt_in_tracking`     | boolean | false   | Work order marked COMPLETED                |
| `opt_in_chat`         | boolean | false   | New chat message from admin                |
| `opt_in_purchases`    | boolean | false   | Invoice created after Stripe purchase      |
| `opt_in_new_listings` | boolean | false   | New gem product goes live in shop          |

### Upsert Pattern (from UserDashboardUserView)

```javascript
await supabase
    .from("user_sms_preferences")
    .upsert(
        { user_id: session.user.id, [columnName]: newValue },
        { onConflict: "user_id" }
    );
```

If no row exists for the user yet, this INSERT creates one. If a row already exists, it updates the toggled column only. Never manually INSERT and then UPDATE — always use upsert.

---

## Five SMS Toggles — What Each One Controls

### 1. Work Order Updates — `opt_in_work_orders`

Fires when:

- A new work order is created for the user (admin-created)
- The work order status changes (CREATED → ACCEPTED → COMPLETED → CANCELLED)

Fired by: `user_notify_work_order` DB trigger on `work_orders` INSERT and UPDATE.

Also gates: **Service request submission** — user must have `opt_in_work_orders = true` AND a phone number on file before the service request form opens. If either condition fails, show the message below and block the form:

> “To submit a service request you must have a phone number on file and work order SMS notifications enabled. This keeps you informed every step of the way. Update your preferences in your profile.”

### 2. Tracking Updates — `opt_in_tracking`

Fires when:

- Admin marks a work order `COMPLETED`

This is technically a subset of `opt_in_work_orders` but is a separate toggle so users can opt into completion alerts specifically.

Fired by: `user_notify_work_order` DB trigger on `work_orders` UPDATE where `status = 'COMPLETED'`.

### 3. Chat Message Alerts — `opt_in_chat`

Fires when:

- Admin sends a new chat message to the user

Fired by: **manual `send-user-notification` call** from `AdminMobileDesktopUserDash.tsx` after admin sends a message. No DB trigger handles this — the frontend call is required.

### 4. Purchase Confirmations — `opt_in_purchases`

Fires when:

- Stripe webhook creates a new invoice for the user after a successful purchase

Fired by: `user_notify_invoice` DB trigger on `invoices` INSERT.

### 5. New Gem Listings — `opt_in_new_listings`

Fires when:

- Admin publishes a new product (product goes ACTIVE in the shop)

Fired by: `user_notify_new_product` DB trigger on `products` INSERT where `product_state = 'ACTIVE'`.

---

## Complete User Notification Event Table

Every event that can trigger an SMS to the account user, how it fires, and which `opt_in` column gates it.

| Event                             | Opt-In Column         | Fired By                          | From File                        | Manual Call Required |
| --------------------------------- | --------------------- | --------------------------------- | -------------------------------- | -------------------- |
| New work order created (by admin) | `opt_in_work_orders`  | `user_notify_work_order` trigger  | —                                | ❌ No                |
| Work order status changed         | `opt_in_work_orders`  | `user_notify_work_order` trigger  | —                                | ❌ No                |
| Work order COMPLETED              | `opt_in_tracking`     | `user_notify_work_order` trigger  | —                                | ❌ No                |
| New chat message from admin       | `opt_in_chat`         | —                                 | `AdminMobileDesktopUserDash.tsx` | ✅ Yes               |
| Invoice created after purchase    | `opt_in_purchases`    | `user_notify_invoice` trigger     | —                                | ❌ No                |
| New gem listing goes live         | `opt_in_new_listings` | `user_notify_new_product` trigger | —                                | ❌ No                |

---

## DB Triggers That Fire Automatically

These triggers fire server-side with no frontend involvement. **Never call `send-user-notification` manually for these events** — doing so will double-fire the SMS.

| Trigger                   | Table               | Event         | Opt-In Column                           | Confirmed |
| ------------------------- | ------------------- | ------------- | --------------------------------------- | --------- |
| `user_notify_work_order`  | `work_orders`       | INSERT/UPDATE | `opt_in_work_orders`, `opt_in_tracking` | ✅        |
| `user_notify_invoice`     | `invoices`          | INSERT        | `opt_in_purchases`                      | ✅        |
| `user_notify_new_product` | `products`          | INSERT        | `opt_in_new_listings`                   | ✅        |
| `user_notify_inquiry`     | `account_inquiries` | INSERT        | —                                       | ✅        |
| `user_notify_service`     | `service_requests`  | INSERT        | —                                       | ✅        |

> Note: `user_notify_inquiry` and `user_notify_service` fire on submission — they notify the user that their inquiry or service request was received. These do not have a dedicated opt-in toggle — they always fire.

---

## Manual `send-user-notification` Calls Required

Only one event requires a manual edge function call from the frontend:

### Chat message from admin → user

Called from: `AdminMobileDesktopUserDash.tsx` after admin sends a chat message.

```javascript
await supabase.functions.invoke("send-user-notification", {
    body: {
        event_type: "chat",
        user_id: chatThread.account_user_id
    }
});
```

Gates on: `opt_in_chat = true` in `user_sms_preferences` — the edge function checks this before sending.

No trigger handles this event — the manual call is always required.

---

## `send-user-notification` Edge Function Body Format

```javascript
// Always pass event_type and user_id
await supabase.functions.invoke("send-user-notification", {
    body: {
        event_type: "chat", // one of: 'chat', 'work_orders', 'service_requests', 'account_inquiries'
        user_id: "<account_user_id>"
    }
});
```

The edge function:

1. Looks up `user_sms_preferences` for the user
1. Checks the relevant `opt_in_*` column
1. If opted in: sends SMS to `user_sms_preferences.phone`
1. If not opted in: silently does nothing

---

## Where Each Piece Lives in the Codebase

| Concern                               | File                                          |
| ------------------------------------- | --------------------------------------------- |
| Toggle UI + upsert logic              | `UserDashboardUserView` (Home tab)            |
| Service request SMS gate check        | `UserDashboardUserView` (Inquiries tab)       |
| Manual chat notification call (admin) | `AdminMobileDesktopUserDash.tsx`              |
| All automatic trigger definitions     | Supabase DB (server-side)                     |
| Edge function implementation          | `send-user-notification` (Supabase Functions) |

---

## Notes for Emergent

- **Never call `send-user-notification` manually for work order, invoice, or new listing events** — DB triggers handle these automatically. Manual calls double-fire SMS.
- **The only manual call is for admin chat messages** — always call it from `AdminMobileDesktopUserDash.tsx` after insert.
- `user_sms_preferences` uses upsert with `onConflict: 'user_id'` — never INSERT then UPDATE separately.
- `phone` in `user_sms_preferences` should be kept in sync with `account_users.phone` — when user updates their phone in profile, update both tables.
- Service request form is gated on `opt_in_work_orders = true` AND `account_users.phone` not null — check both before opening the form.
- The edge function silently does nothing if the user has opted out — no error handling needed for the opt-out case.
- `user_notify_inquiry` and `user_notify_service` have no opt-in gate — they always fire on submission to confirm receipt.
