# Cutting Corners Gems — Database Schema Reference

**Database:** Supabase (PostgreSQL)
**Schema:** `public`
**Last Updated:** February 2026

---

## Overview

All 16 tables have Row Level Security (RLS) enabled. Access is controlled via policies scoped to `authenticated` and `anon` roles. The `is_admin()` function is used across policies to distinguish admin users from account users.

---

## Custom Types (Enums)

| Type                   | Values                                                    |
| ---------------------- | --------------------------------------------------------- |
| `account_status`       | `ACTIVE`, `INACTIVE` (assumed)                            |
| `invoice_state`        | `PAID` (default), others TBD                              |
| `product_state`        | `DRAFT` (default), `PUBLISHED`, others TBD                |
| `work_order_status`    | `CREATED` (default), `ACCEPTED`, `COMPLETED`, `CANCELLED` |
| `actor` (USER-DEFINED) | Used in `activity_log` and `chat_messages`                |

---

## Tables

### account_users

Registered customers with accounts.

| Column             | Type           | Nullable | Default              |
| ------------------ | -------------- | -------- | -------------------- |
| `account_user_id`  | uuid           | NO       | `uuid_generate_v4()` |
| `created_at`       | timestamptz    | NO       | `now()`              |
| `updated_at`       | timestamptz    | NO       | `now()`              |
| `name`             | text           | NO       | —                    |
| `email`            | text           | NO       | —                    |
| `phone`            | text           | YES      | —                    |
| `business_name`    | text           | YES      | —                    |
| `shipping_address` | text           | YES      | —                    |
| `status`           | account_status | NO       | `ACTIVE`             |

**RLS Policies:**

- `account_users_admin_delete` — admin can DELETE
- `account_users_insert_own` — user can INSERT own row
- `account_users_own_read` — user can SELECT own row
- `account_users_own_update` — user can UPDATE own row

---

### admin_users

Admin/staff accounts.

| Column          | Type        | Nullable | Default              |
| --------------- | ----------- | -------- | -------------------- |
| `admin_user_id` | uuid        | NO       | `uuid_generate_v4()` |
| `created_at`    | timestamptz | NO       | `now()`              |
| `updated_at`    | timestamptz | NO       | `now()`              |
| `email`         | text        | NO       | —                    |
| `name`          | text        | NO       | —                    |
| `full_name`     | text        | YES      | —                    |
| `business_name` | text        | YES      | —                    |
| `address`       | text        | YES      | —                    |
| `phone`         | text        | YES      | —                    |
| `contact_email` | text        | YES      | —                    |

**RLS Policies:**

- `admin_own_row_select` — admin can SELECT own row
- `admin_own_row_update` — admin can UPDATE own row

---

### products

Gem listings available for purchase.

| Column               | Type          | Nullable | Default              |
| -------------------- | ------------- | -------- | -------------------- |
| `product_id`         | uuid          | NO       | `uuid_generate_v4()` |
| `created_at`         | timestamptz   | NO       | `now()`              |
| `updated_at`         | timestamptz   | NO       | `now()`              |
| `title`              | text          | NO       | —                    |
| `description`        | text          | YES      | —                    |
| `product_state`      | product_state | NO       | `DRAFT`              |
| `total_price`        | numeric       | NO       | —                    |
| `price_per_carat`    | numeric       | YES      | —                    |
| `gem_type`           | text          | YES      | —                    |
| `shape`              | text          | YES      | —                    |
| `weight`             | numeric       | YES      | —                    |
| `color`              | text          | YES      | —                    |
| `origin`             | text          | YES      | —                    |
| `treatment`          | text          | YES      | —                    |
| `gia_report_number`  | text          | YES      | —                    |
| `gia_report_pdf_url` | text          | YES      | —                    |
| `photo_url`          | text          | YES      | —                    |

**RLS Policies:**

- `products_admin_all` — admin has full access
- `products_public_read` — anon + authenticated can SELECT

---

### work_orders

Service jobs created by admin and assigned to account users.

| Column                | Type              | Nullable | Default              |
| --------------------- | ----------------- | -------- | -------------------- |
| `work_order_id`       | uuid              | NO       | `uuid_generate_v4()` |
| `created_at`          | timestamptz       | NO       | `now()`              |
| `updated_at`          | timestamptz       | NO       | `now()`              |
| `account_user_id`     | uuid              | NO       | —                    |
| `created_by_admin_id` | uuid              | NO       | —                    |
| `title`               | text              | NO       | —                    |
| `description`         | text              | NO       | —                    |
| `status`              | work_order_status | NO       | `CREATED`            |
| `service_type`        | text              | YES      | —                    |
| `gem_type`            | text              | YES      | —                    |
| `estimated_price`     | numeric           | YES      | —                    |
| `notes`               | text              | YES      | —                    |
| `accepted_at`         | timestamptz       | YES      | —                    |
| `completed_at`        | timestamptz       | YES      | —                    |
| `cancelled_at`        | timestamptz       | YES      | —                    |
| `cancel_reason`       | text              | YES      | —                    |
| `edit_history`        | jsonb             | NO       | `[]`                 |

**RLS Policies:**

- `wo_admin_all` — admin has full access
- `wo_own_read` — user can SELECT own work orders
- `wo_own_accept` — user can UPDATE to accept

---

### invoices

Payment records tied to account users and Stripe.

| Column                     | Type          | Nullable | Default              |
| -------------------------- | ------------- | -------- | -------------------- |
| `invoice_id`               | uuid          | NO       | `uuid_generate_v4()` |
| `created_at`               | timestamptz   | NO       | `now()`              |
| `updated_at`               | timestamptz   | NO       | `now()`              |
| `account_user_id`          | uuid          | NO       | —                    |
| `invoice_state`            | invoice_state | NO       | `PAID`               |
| `stripe_session_id`        | text          | NO       | —                    |
| `stripe_payment_intent_id` | text          | YES      | —                    |
| `paid_at`                  | timestamptz   | NO       | `now()`              |
| `total_amount`             | numeric       | NO       | —                    |
| `line_items`               | jsonb         | NO       | `[]`                 |
| `account_snapshot`         | jsonb         | NO       | `{}`                 |
| `admin_snapshot`           | jsonb         | NO       | `{}`                 |
| `archived_at`              | timestamptz   | YES      | —                    |

**RLS Policies:**

- `invoices_admin_all` — admin has full access
- `invoices_own_read` — user can SELECT own invoices

---

### service_requests

Requests submitted by account users for services.

| Column               | Type        | Nullable | Default              |
| -------------------- | ----------- | -------- | -------------------- |
| `service_request_id` | uuid        | NO       | `uuid_generate_v4()` |
| `created_at`         | timestamptz | NO       | `now()`              |
| `updated_at`         | timestamptz | NO       | `now()`              |
| `account_user_id`    | uuid        | NO       | —                    |
| `subject`            | text        | YES      | —                    |
| `service_type`       | text        | YES      | —                    |
| `description`        | text        | NO       | —                    |
| `photo_url`          | text        | YES      | —                    |
| `is_read`            | boolean     | NO       | `false`              |
| `read_at`            | timestamptz | YES      | —                    |

**RLS Policies:**

- `sr_admin_all` — admin has full access
- `sr_own_insert` — user can INSERT
- `sr_own_read` — user can SELECT own requests

---

### account_inquiries

Inquiries submitted by logged-in account users.

| Column               | Type        | Nullable | Default              |
| -------------------- | ----------- | -------- | -------------------- |
| `account_inquiry_id` | uuid        | NO       | `uuid_generate_v4()` |
| `created_at`         | timestamptz | NO       | `now()`              |
| `updated_at`         | timestamptz | NO       | `now()`              |
| `account_user_id`    | uuid        | NO       | —                    |
| `description`        | text        | NO       | —                    |
| `photo_url`          | text        | YES      | —                    |
| `is_read`            | boolean     | NO       | `false`              |
| `read_at`            | timestamptz | YES      | —                    |

**RLS Policies:**

- `inquiries_admin_all` — admin has full access
- `inquiries_own_insert` — user can INSERT
- `inquiries_own_read` — user can SELECT own inquiries

---

### guest_inquiries

Inquiries submitted by unauthenticated (guest) visitors.

| Column             | Type        | Nullable | Default              |
| ------------------ | ----------- | -------- | -------------------- |
| `guest_inquiry_id` | uuid        | NO       | `uuid_generate_v4()` |
| `created_at`       | timestamptz | NO       | `now()`              |
| `updated_at`       | timestamptz | NO       | `now()`              |
| `name`             | text        | NO       | —                    |
| `email`            | text        | NO       | —                    |
| `phone`            | text        | NO       | —                    |
| `shipping_address` | text        | NO       | —                    |
| `description`      | text        | NO       | —                    |
| `photo_url`        | text        | YES      | —                    |
| `is_read`          | boolean     | NO       | `false`              |
| `read_at`          | timestamptz | YES      | —                    |

**RLS Policies:**

- `guest_inquiries_admin_all` — admin has full access
- `guest_submit_inquiry` — anon can INSERT only (authenticated users cannot submit guest inquiries)

---

### chat_threads

One thread per account user for admin ↔ user messaging.

| Column                 | Type        | Nullable | Default              |
| ---------------------- | ----------- | -------- | -------------------- |
| `chat_thread_id`       | uuid        | NO       | `uuid_generate_v4()` |
| `created_at`           | timestamptz | NO       | `now()`              |
| `updated_at`           | timestamptz | NO       | `now()`              |
| `account_user_id`      | uuid        | NO       | —                    |
| `admin_has_unread`     | boolean     | NO       | `false`              |
| `account_has_unread`   | boolean     | NO       | `false`              |
| `last_message_at`      | timestamptz | YES      | —                    |
| `last_message_preview` | text        | YES      | —                    |

**RLS Policies:**

- `threads_admin_all` — admin has full access
- `threads_own_read` — user can SELECT own thread
- `threads_own_update` — user can UPDATE own thread

---

### chat_messages

Individual messages within a chat thread.

| Column            | Type         | Nullable | Default              |
| ----------------- | ------------ | -------- | -------------------- |
| `chat_message_id` | uuid         | NO       | `uuid_generate_v4()` |
| `created_at`      | timestamptz  | NO       | `now()`              |
| `chat_thread_id`  | uuid         | NO       | —                    |
| `actor`           | USER-DEFINED | NO       | —                    |
| `actor_id`        | text         | NO       | —                    |
| `body`            | text         | YES      | —                    |
| `attachment_url`  | text         | YES      | —                    |
| `attachment_type` | text         | YES      | —                    |

**Constraints:**

- `chat_messages_body_or_attachment` — either `body` must be non-empty OR `attachment_url` must be present

**RLS Policies:**

- `messages_admin_all` — admin has full access
- `messages_own_insert` — user can INSERT
- `messages_own_read` — user can SELECT own messages

---

### portfolio_photos

Admin-managed portfolio gallery visible to the public.

| Column               | Type        | Nullable | Default              |
| -------------------- | ----------- | -------- | -------------------- |
| `portfolio_photo_id` | uuid        | NO       | `uuid_generate_v4()` |
| `created_at`         | timestamptz | NO       | `now()`              |
| `updated_at`         | timestamptz | NO       | `now()`              |
| `photo_url`          | text        | NO       | —                    |
| `caption`            | text        | YES      | —                    |
| `description`        | text        | YES      | —                    |
| `year`               | text        | YES      | —                    |
| `sort_order`         | integer     | NO       | `0`                  |
| `published`          | boolean     | NO       | `false`              |
| `archived`           | boolean     | NO       | `false`              |

**RLS Policies:**

- `portfolio_admin_all` — admin has full access
- `portfolio_public_read` — anon + authenticated can SELECT

---

### user_notifications

In-app notifications for account users.

| Column       | Type      | Nullable | Default             |
| ------------ | --------- | -------- | ------------------- |
| `id`         | uuid      | NO       | `gen_random_uuid()` |
| `created_at` | timestamp | YES      | `now()`             |
| `user_id`    | uuid      | YES      | —                   |
| `type`       | text      | NO       | —                   |
| `message`    | text      | NO       | —                   |
| `read`       | boolean   | YES      | `false`             |

**RLS Policies:**

- `user_notif_admin_all` — admin has full access
- `user_own_notifications_select` — user can SELECT own notifications
- `user_own_notifications_update` — user can UPDATE own notifications (mark as read)

---

### admin_notifications

In-app notifications for admin users.

| Column       | Type      | Nullable | Default             |
| ------------ | --------- | -------- | ------------------- |
| `id`         | uuid      | NO       | `gen_random_uuid()` |
| `created_at` | timestamp | YES      | `now()`             |
| `type`       | text      | NO       | —                   |
| `message`    | text      | NO       | —                   |
| `user_id`    | uuid      | YES      | —                   |
| `read`       | boolean   | YES      | `false`             |

**RLS Policies:**

- `admin_notif_admin_all` — admin has full access only

---

### admin_notification_config

Admin preferences for which event types trigger SMS notifications.

| Column                    | Type    | Nullable | Default             |
| ------------------------- | ------- | -------- | ------------------- |
| `id`                      | uuid    | NO       | `gen_random_uuid()` |
| `admin_phone`             | text    | NO       | —                   |
| `notify_purchases`        | boolean | YES      | `true`              |
| `notify_chat`             | boolean | YES      | `true`              |
| `notify_inquiries`        | boolean | YES      | `true`              |
| `notify_work_orders`      | boolean | YES      | `true`              |
| `notify_service_requests` | boolean | YES      | `true`              |

**RLS Policies:**

- `notif_config_admin_all` — admin has full access
- `admin_insert_notification_config` — admin can INSERT
- `admin_read_notification_config` — admin can SELECT
- `admin_update_notification_config` — admin can UPDATE

---

### user_sms_preferences

Per-user SMS opt-in settings.

| Column                | Type      | Nullable | Default             |
| --------------------- | --------- | -------- | ------------------- |
| `id`                  | uuid      | NO       | `gen_random_uuid()` |
| `created_at`          | timestamp | YES      | `now()`             |
| `user_id`             | uuid      | YES      | —                   |
| `phone`               | text      | NO       | —                   |
| `opt_in_work_orders`  | boolean   | YES      | `false`             |
| `opt_in_tracking`     | boolean   | YES      | `false`             |
| `opt_in_chat`         | boolean   | YES      | `false`             |
| `opt_in_purchases`    | boolean   | YES      | `false`             |
| `opt_in_new_listings` | boolean   | YES      | `false`             |

**Constraints:**

- `user_sms_preferences_user_id_key` — UNIQUE on `user_id` (one record per user)
- `user_sms_preferences_user_id_fkey` — FK to `auth.users(id)` ON DELETE CASCADE

**RLS Policies:**

- `sms_prefs_admin_all` — admin has full access
- `sms_prefs_own_insert` — user can INSERT own prefs
- `sms_prefs_own_read` — user can SELECT own prefs
- `sms_prefs_own_update` — user can UPDATE own prefs

---

### activity_log

Audit trail for all significant actions in the system.

| Column        | Type         | Nullable | Default              |
| ------------- | ------------ | -------- | -------------------- |
| `activity_id` | uuid         | NO       | `uuid_generate_v4()` |
| `created_at`  | timestamptz  | NO       | `now()`              |
| `actor`       | USER-DEFINED | NO       | —                    |
| `actor_id`    | text         | NO       | —                    |
| `action_type` | text         | NO       | —                    |
| `entity_type` | text         | YES      | —                    |
| `entity_id`   | uuid         | YES      | —                    |
| `payload`     | jsonb        | NO       | `{}`                 |
| `archived`    | boolean      | NO       | `false`              |
| `archived_at` | timestamptz  | YES      | —                    |

**RLS Policies:**

- `activity_log_admin_all` — admin has full access only

---

## Security Notes

- `is_admin()` function is set to `SECURITY DEFINER` — runs with the privileges of the function owner. This is acceptable for an admin check function but should be reviewed periodically.
- All views should use `SECURITY INVOKER` where possible to respect RLS on underlying tables.
- Guest inquiries are intentionally restricted to `anon` role only — authenticated users cannot submit guest inquiries.
- `activity_log` and `admin_notifications` are admin-only with no account user access.
