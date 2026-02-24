# Cutting Corners Gems — Database Schema Reference

**Database:** Supabase (PostgreSQL)
**Schema:** `public`
**Last Updated:** February 2026

-----

## Overview

Cutting Corners Gems is a gemstone business with an admin-facing management portal and a customer-facing account portal. All 16 tables have Row Level Security (RLS) enabled. Access is controlled via policies scoped to `authenticated` and `anon` roles. The `is_admin()` function is used across policies to distinguish admin users from account users.

-----

## Custom Types (Enums)

|Type                  |Values                                         |Description                                               |
|----------------------|-----------------------------------------------|----------------------------------------------------------|
|`account_status`      |`ACTIVE`, `INACTIVE`                           |Whether a customer account is active and allowed to log in|
|`invoice_state`       |`PAID`                                         |The payment state of an invoice                           |
|`product_state`       |`DRAFT`, `PUBLISHED`                           |Controls whether a gem listing is visible to the public   |
|`work_order_status`   |`CREATED`, `ACCEPTED`, `COMPLETED`, `CANCELLED`|Lifecycle state of a work order                           |
|`actor` (USER-DEFINED)|admin, account_user                            |Identifies who performed an action in logs and chat       |

-----

## Tables

### account_users

Registered customers who have created an account on the platform. Account users can browse products, submit inquiries and service requests, chat with admin, view their invoices and work orders, and manage their SMS notification preferences.

|Column            |Type          |Nullable|Default             |Description                                                                |
|------------------|--------------|--------|--------------------|---------------------------------------------------------------------------|
|`account_user_id` |uuid          |NO      |`uuid_generate_v4()`|Primary key                                                                |
|`created_at`      |timestamptz   |NO      |`now()`             |When the account was created                                               |
|`updated_at`      |timestamptz   |NO      |`now()`             |When the account was last updated                                          |
|`name`            |text          |NO      |—                   |Customer’s full name                                                       |
|`email`           |text          |NO      |—                   |Customer’s email address, used for login                                   |
|`phone`           |text          |YES     |—                   |Customer’s phone number                                                    |
|`business_name`   |text          |YES     |—                   |Optional business name if the customer is purchasing on behalf of a company|
|`shipping_address`|text          |YES     |—                   |Default shipping address for the customer                                  |
|`status`          |account_status|NO      |`ACTIVE`            |Whether the account is active or inactive                                  |

**RLS Policies:**

- `account_users_admin_delete` — admin can DELETE any account user
- `account_users_insert_own` — a user can INSERT their own row on registration
- `account_users_own_read` — a user can SELECT their own row only
- `account_users_own_update` — a user can UPDATE their own row only

-----

### admin_users

Admin and staff accounts that have access to the management portal. Admins can manage products, respond to inquiries, create work orders, view all customer activity, and configure notifications.

|Column         |Type       |Nullable|Default             |Description                                             |
|---------------|-----------|--------|--------------------|--------------------------------------------------------|
|`admin_user_id`|uuid       |NO      |`uuid_generate_v4()`|Primary key                                             |
|`created_at`   |timestamptz|NO      |`now()`             |When the admin account was created                      |
|`updated_at`   |timestamptz|NO      |`now()`             |When the admin account was last updated                 |
|`email`        |text       |NO      |—                   |Admin’s login email address                             |
|`name`         |text       |NO      |—                   |Admin’s display name                                    |
|`full_name`    |text       |YES     |—                   |Admin’s full legal name                                 |
|`business_name`|text       |YES     |—                   |Business name shown on invoices and communications      |
|`address`      |text       |YES     |—                   |Business address                                        |
|`phone`        |text       |YES     |—                   |Admin’s contact phone number                            |
|`contact_email`|text       |YES     |—                   |Public-facing contact email, may differ from login email|

**RLS Policies:**

- `admin_own_row_select` — an admin can SELECT their own row only
- `admin_own_row_update` — an admin can UPDATE their own row only

-----

### products

Gem listings managed by admin. Products start as drafts and are published when ready for customers to view and purchase. Includes detailed gemological attributes and optional GIA certification.

|Column              |Type         |Nullable|Default             |Description                                                   |
|--------------------|-------------|--------|--------------------|--------------------------------------------------------------|
|`product_id`        |uuid         |NO      |`uuid_generate_v4()`|Primary key                                                   |
|`created_at`        |timestamptz  |NO      |`now()`             |When the listing was created                                  |
|`updated_at`        |timestamptz  |NO      |`now()`             |When the listing was last updated                             |
|`title`             |text         |NO      |—                   |Display name of the gem listing                               |
|`description`       |text         |YES     |—                   |Detailed description of the gem for customers                 |
|`product_state`     |product_state|NO      |`DRAFT`             |Controls visibility — DRAFT is admin-only, PUBLISHED is public|
|`total_price`       |numeric      |NO      |—                   |Full listing price in dollars                                 |
|`price_per_carat`   |numeric      |YES     |—                   |Optional per-carat price for reference                        |
|`gem_type`          |text         |YES     |—                   |Type of gemstone (e.g. Ruby, Sapphire, Emerald)               |
|`shape`             |text         |YES     |—                   |Cut shape of the gem (e.g. Round, Oval, Cushion)              |
|`weight`            |numeric      |YES     |—                   |Weight of the gem in carats                                   |
|`color`             |text         |YES     |—                   |Color grade or description of the gem                         |
|`origin`            |text         |YES     |—                   |Geographic origin of the gem (e.g. Burma, Colombia)           |
|`treatment`         |text         |YES     |—                   |Any treatments applied (e.g. Heat, No Heat, Beryllium)        |
|`gia_report_number` |text         |YES     |—                   |GIA certification report number if certified                  |
|`gia_report_pdf_url`|text         |YES     |—                   |URL to the GIA report PDF                                     |
|`photo_url`         |text         |YES     |—                   |Main product photo URL                                        |

**RLS Policies:**

- `products_admin_all` — admin has full access to all products
- `products_public_read` — anon and authenticated users can SELECT published products

-----

### work_orders

Service jobs created by admin on behalf of account users. Represents custom work such as gem setting, cleaning, appraisal, or other jewelry services. The account user can view and accept their work orders.

|Column               |Type             |Nullable|Default             |Description                                            |
|---------------------|-----------------|--------|--------------------|-------------------------------------------------------|
|`work_order_id`      |uuid             |NO      |`uuid_generate_v4()`|Primary key                                            |
|`created_at`         |timestamptz      |NO      |`now()`             |When the work order was created                        |
|`updated_at`         |timestamptz      |NO      |`now()`             |When the work order was last updated                   |
|`account_user_id`    |uuid             |NO      |—                   |The customer this work order belongs to                |
|`created_by_admin_id`|uuid             |NO      |—                   |The admin who created the work order                   |
|`title`              |text             |NO      |—                   |Short title describing the work to be done             |
|`description`        |text             |NO      |—                   |Full description of the job                            |
|`status`             |work_order_status|NO      |`CREATED`           |Current lifecycle state of the work order              |
|`service_type`       |text             |YES     |—                   |Category of service (e.g. Setting, Cleaning, Appraisal)|
|`gem_type`           |text             |YES     |—                   |Type of gem involved in the work                       |
|`estimated_price`    |numeric          |YES     |—                   |Estimated cost of the work                             |
|`notes`              |text             |YES     |—                   |Internal admin notes about the job                     |
|`accepted_at`        |timestamptz      |YES     |—                   |When the customer accepted the work order              |
|`completed_at`       |timestamptz      |YES     |—                   |When the work was marked complete                      |
|`cancelled_at`       |timestamptz      |YES     |—                   |When the work order was cancelled if applicable        |
|`cancel_reason`      |text             |YES     |—                   |Reason provided for cancellation                       |
|`edit_history`       |jsonb            |NO      |`[]`                |Array of previous edits for audit tracking             |

**RLS Policies:**

- `wo_admin_all` — admin has full access to all work orders
- `wo_own_read` — a user can SELECT their own work orders
- `wo_own_accept` — a user can UPDATE their work order to accept it

-----

### invoices

Payment records generated after a successful Stripe checkout. Captures a snapshot of the account and admin details at time of purchase so the invoice remains accurate even if account details change later.

|Column                    |Type         |Nullable|Default             |Description                                                   |
|--------------------------|-------------|--------|--------------------|--------------------------------------------------------------|
|`invoice_id`              |uuid         |NO      |`uuid_generate_v4()`|Primary key                                                   |
|`created_at`              |timestamptz  |NO      |`now()`             |When the invoice record was created                           |
|`updated_at`              |timestamptz  |NO      |`now()`             |When the invoice was last updated                             |
|`account_user_id`         |uuid         |NO      |—                   |The customer who made the purchase                            |
|`invoice_state`           |invoice_state|NO      |`PAID`              |Payment state of the invoice                                  |
|`stripe_session_id`       |text         |NO      |—                   |Stripe checkout session ID for reference                      |
|`stripe_payment_intent_id`|text         |YES     |—                   |Stripe payment intent ID for the transaction                  |
|`paid_at`                 |timestamptz  |NO      |`now()`             |When the payment was completed                                |
|`total_amount`            |numeric      |NO      |—                   |Total amount charged in dollars                               |
|`line_items`              |jsonb        |NO      |`[]`                |Array of purchased items with prices and details              |
|`account_snapshot`        |jsonb        |NO      |`{}`                |Snapshot of the customer’s account details at time of purchase|
|`admin_snapshot`          |jsonb        |NO      |`{}`                |Snapshot of the business/admin details at time of purchase    |
|`archived_at`             |timestamptz  |YES     |—                   |When the invoice was archived, if applicable                  |

**RLS Policies:**

- `invoices_admin_all` — admin has full access to all invoices
- `invoices_own_read` — a user can SELECT their own invoices

-----

### service_requests

Requests submitted by account users asking for a specific service such as custom work, repairs, or appraisals. Admin reviews these and may convert them into a work order.

|Column              |Type       |Nullable|Default             |Description                                    |
|--------------------|-----------|--------|--------------------|-----------------------------------------------|
|`service_request_id`|uuid       |NO      |`uuid_generate_v4()`|Primary key                                    |
|`created_at`        |timestamptz|NO      |`now()`             |When the request was submitted                 |
|`updated_at`        |timestamptz|NO      |`now()`             |When the request was last updated              |
|`account_user_id`   |uuid       |NO      |—                   |The customer who submitted the request         |
|`subject`           |text       |YES     |—                   |Brief subject line describing the request      |
|`service_type`      |text       |YES     |—                   |Type of service being requested                |
|`description`       |text       |NO      |—                   |Detailed description of what the customer needs|
|`photo_url`         |text       |YES     |—                   |Optional photo attached to the request         |
|`is_read`           |boolean    |NO      |`false`             |Whether the admin has read this request        |
|`read_at`           |timestamptz|YES     |—                   |When the admin first read the request          |

**RLS Policies:**

- `sr_admin_all` — admin has full access to all service requests
- `sr_own_insert` — a user can INSERT a new service request
- `sr_own_read` — a user can SELECT their own service requests

-----

### account_inquiries

General inquiries submitted by logged-in account users. Used for questions, custom purchase requests, or anything that doesn’t fit a service request.

|Column              |Type       |Nullable|Default             |Description                            |
|--------------------|-----------|--------|--------------------|---------------------------------------|
|`account_inquiry_id`|uuid       |NO      |`uuid_generate_v4()`|Primary key                            |
|`created_at`        |timestamptz|NO      |`now()`             |When the inquiry was submitted         |
|`updated_at`        |timestamptz|NO      |`now()`             |When the inquiry was last updated      |
|`account_user_id`   |uuid       |NO      |—                   |The customer who submitted the inquiry |
|`description`       |text       |NO      |—                   |The content of the inquiry             |
|`photo_url`         |text       |YES     |—                   |Optional photo attached to the inquiry |
|`is_read`           |boolean    |NO      |`false`             |Whether the admin has read this inquiry|
|`read_at`           |timestamptz|YES     |—                   |When the admin first read the inquiry  |

**RLS Policies:**

- `inquiries_admin_all` — admin has full access to all account inquiries
- `inquiries_own_insert` — a user can INSERT a new inquiry
- `inquiries_own_read` — a user can SELECT their own inquiries

-----

### guest_inquiries

Inquiries submitted by unauthenticated visitors who have not created an account. Used to capture interest from potential new customers. Authenticated users cannot submit guest inquiries — they must use account_inquiries instead.

|Column            |Type       |Nullable|Default             |Description                            |
|------------------|-----------|--------|--------------------|---------------------------------------|
|`guest_inquiry_id`|uuid       |NO      |`uuid_generate_v4()`|Primary key                            |
|`created_at`      |timestamptz|NO      |`now()`             |When the inquiry was submitted         |
|`updated_at`      |timestamptz|NO      |`now()`             |When the inquiry was last updated      |
|`name`            |text       |NO      |—                   |Guest’s full name                      |
|`email`           |text       |NO      |—                   |Guest’s email address for follow-up    |
|`phone`           |text       |NO      |—                   |Guest’s phone number                   |
|`shipping_address`|text       |NO      |—                   |Guest’s shipping address               |
|`description`     |text       |NO      |—                   |The content of the inquiry             |
|`photo_url`       |text       |YES     |—                   |Optional photo attached to the inquiry |
|`is_read`         |boolean    |NO      |`false`             |Whether the admin has read this inquiry|
|`read_at`         |timestamptz|YES     |—                   |When the admin first read the inquiry  |

**RLS Policies:**

- `guest_inquiries_admin_all` — admin has full access to all guest inquiries
- `guest_submit_inquiry` — anon users only can INSERT (authenticated users cannot submit guest inquiries)

-----

### chat_threads

One chat thread exists per account user, representing an ongoing conversation between that customer and admin. Tracks unread state for both sides and stores a preview of the most recent message for inbox display.

|Column                |Type       |Nullable|Default             |Description                                                     |
|----------------------|-----------|--------|--------------------|----------------------------------------------------------------|
|`chat_thread_id`      |uuid       |NO      |`uuid_generate_v4()`|Primary key                                                     |
|`created_at`          |timestamptz|NO      |`now()`             |When the thread was created                                     |
|`updated_at`          |timestamptz|NO      |`now()`             |When the thread was last updated                                |
|`account_user_id`     |uuid       |NO      |—                   |The customer this thread belongs to                             |
|`admin_has_unread`    |boolean    |NO      |`false`             |Whether there are messages the admin hasn’t read yet            |
|`account_has_unread`  |boolean    |NO      |`false`             |Whether there are messages the customer hasn’t read yet         |
|`last_message_at`     |timestamptz|YES     |—                   |Timestamp of the most recent message, used for sorting the inbox|
|`last_message_preview`|text       |YES     |—                   |Short preview of the last message shown in the inbox list       |

**RLS Policies:**

- `threads_admin_all` — admin has full access to all threads
- `threads_own_read` — a user can SELECT their own thread
- `threads_own_update` — a user can UPDATE their own thread (e.g. marking messages as read)

-----

### chat_messages

Individual messages within a chat thread. Messages can contain a text body, an attachment, or both. Either a body or an attachment is required — empty messages are not allowed.

|Column           |Type        |Nullable|Default             |Description                                            |
|-----------------|------------|--------|--------------------|-------------------------------------------------------|
|`chat_message_id`|uuid        |NO      |`uuid_generate_v4()`|Primary key                                            |
|`created_at`     |timestamptz |NO      |`now()`             |When the message was sent                              |
|`chat_thread_id` |uuid        |NO      |—                   |The thread this message belongs to                     |
|`actor`          |USER-DEFINED|NO      |—                   |Who sent the message — either admin or account_user    |
|`actor_id`       |text        |NO      |—                   |The ID of the sender (admin_user_id or account_user_id)|
|`body`           |text        |YES     |—                   |Text content of the message                            |
|`attachment_url` |text        |YES     |—                   |URL to an attached file or image                       |
|`attachment_type`|text        |YES     |—                   |MIME type or category of the attachment                |

**Constraints:**

- `chat_messages_body_or_attachment` — either `body` must be non-empty OR `attachment_url` must be present; a message cannot be completely empty

**RLS Policies:**

- `messages_admin_all` — admin has full access to all messages
- `messages_own_insert` — a user can INSERT messages into their own thread
- `messages_own_read` — a user can SELECT messages in their own thread

-----

### portfolio_photos

Admin-managed photo gallery showcasing past work and gems. Published photos are visible to all visitors including unauthenticated users. Used to build trust and showcase the quality of Cutting Corners Gems’ work.

|Column              |Type       |Nullable|Default             |Description                                                  |
|--------------------|-----------|--------|--------------------|-------------------------------------------------------------|
|`portfolio_photo_id`|uuid       |NO      |`uuid_generate_v4()`|Primary key                                                  |
|`created_at`        |timestamptz|NO      |`now()`             |When the photo was added                                     |
|`updated_at`        |timestamptz|NO      |`now()`             |When the photo record was last updated                       |
|`photo_url`         |text       |NO      |—                   |URL to the portfolio photo                                   |
|`caption`           |text       |YES     |—                   |Short caption displayed with the photo                       |
|`description`       |text       |YES     |—                   |Longer description or context for the photo                  |
|`year`              |text       |YES     |—                   |Year the photo was taken or the work was completed           |
|`sort_order`        |integer    |NO      |`0`                 |Controls display order in the gallery                        |
|`published`         |boolean    |NO      |`false`             |Whether the photo is visible to the public                   |
|`archived`          |boolean    |NO      |`false`             |Whether the photo has been archived and hidden from all views|

**RLS Policies:**

- `portfolio_admin_all` — admin has full access to all portfolio photos
- `portfolio_public_read` — anon and authenticated users can SELECT published photos

-----

### user_notifications

In-app notifications delivered to account users. Used to alert customers of updates such as work order status changes, new invoices, or messages from admin.

|Column      |Type     |Nullable|Default            |Description                                                                   |
|------------|---------|--------|-------------------|------------------------------------------------------------------------------|
|`id`        |uuid     |NO      |`gen_random_uuid()`|Primary key                                                                   |
|`created_at`|timestamp|YES     |`now()`            |When the notification was created                                             |
|`user_id`   |uuid     |YES     |—                  |The account user this notification belongs to                                 |
|`type`      |text     |NO      |—                  |Notification type used for display logic (e.g. work_order_update, new_message)|
|`message`   |text     |NO      |—                  |Human-readable notification message shown to the user                         |
|`read`      |boolean  |YES     |`false`            |Whether the user has read the notification                                    |

**RLS Policies:**

- `user_notif_admin_all` — admin has full access to all user notifications
- `user_own_notifications_select` — a user can SELECT their own notifications
- `user_own_notifications_update` — a user can UPDATE their own notifications (e.g. mark as read)

-----

### admin_notifications

In-app notifications delivered to admin users. Used to alert admin of new inquiries, service requests, messages, purchases, and other customer activity requiring attention.

|Column      |Type     |Nullable|Default            |Description                                                           |
|------------|---------|--------|-------------------|----------------------------------------------------------------------|
|`id`        |uuid     |NO      |`gen_random_uuid()`|Primary key                                                           |
|`created_at`|timestamp|YES     |`now()`            |When the notification was created                                     |
|`type`      |text     |NO      |—                  |Notification type used for display logic (e.g. new_inquiry, new_order)|
|`message`   |text     |NO      |—                  |Human-readable notification message shown to admin                    |
|`user_id`   |uuid     |YES     |—                  |The account user who triggered this notification, if applicable       |
|`read`      |boolean  |YES     |`false`            |Whether the admin has read the notification                           |

**RLS Policies:**

- `admin_notif_admin_all` — admin has full access only; no account user access

-----

### admin_notification_config

Stores admin preferences for which event types should trigger SMS alerts. There is typically one row for the admin’s phone number and toggle settings for each notification category.

|Column                   |Type   |Nullable|Default            |Description                                        |
|-------------------------|-------|--------|-------------------|---------------------------------------------------|
|`id`                     |uuid   |NO      |`gen_random_uuid()`|Primary key                                        |
|`admin_phone`            |text   |NO      |—                  |The phone number SMS notifications are sent to     |
|`notify_purchases`       |boolean|YES     |`true`             |Whether to send SMS alerts for new purchases       |
|`notify_chat`            |boolean|YES     |`true`             |Whether to send SMS alerts for new chat messages   |
|`notify_inquiries`       |boolean|YES     |`true`             |Whether to send SMS alerts for new inquiries       |
|`notify_work_orders`     |boolean|YES     |`true`             |Whether to send SMS alerts for work order updates  |
|`notify_service_requests`|boolean|YES     |`true`             |Whether to send SMS alerts for new service requests|

**RLS Policies:**

- `notif_config_admin_all` — admin has full access
- `admin_insert_notification_config` — admin can INSERT a config row
- `admin_read_notification_config` — admin can SELECT the config
- `admin_update_notification_config` — admin can UPDATE notification toggle preferences

-----

### user_sms_preferences

Stores each account user’s opt-in preferences for SMS notifications. One row per user enforced by a unique constraint. Users must provide a phone number and opt in to each notification category individually.

|Column               |Type     |Nullable|Default            |Description                                                       |
|---------------------|---------|--------|-------------------|------------------------------------------------------------------|
|`id`                 |uuid     |NO      |`gen_random_uuid()`|Primary key                                                       |
|`created_at`         |timestamp|YES     |`now()`            |When the preferences were first saved                             |
|`user_id`            |uuid     |YES     |—                  |The account user these preferences belong to                      |
|`phone`              |text     |NO      |—                  |The phone number to send SMS notifications to                     |
|`opt_in_work_orders` |boolean  |YES     |`false`            |Whether the user wants SMS alerts for work order updates          |
|`opt_in_tracking`    |boolean  |YES     |`false`            |Whether the user wants SMS alerts for shipment tracking           |
|`opt_in_chat`        |boolean  |YES     |`false`            |Whether the user wants SMS alerts for new chat messages from admin|
|`opt_in_purchases`   |boolean  |YES     |`false`            |Whether the user wants SMS confirmations for purchases            |
|`opt_in_new_listings`|boolean  |YES     |`false`            |Whether the user wants SMS alerts when new gems are listed        |

**Constraints:**

- `user_sms_preferences_user_id_key` — UNIQUE on `user_id` — enforces one SMS preference record per user
- `user_sms_preferences_user_id_fkey` — FK to `auth.users(id)` ON DELETE CASCADE — deletes preferences when the user account is deleted

**RLS Policies:**

- `sms_prefs_admin_all` — admin has full access
- `sms_prefs_own_insert` — a user can INSERT their own preferences
- `sms_prefs_own_read` — a user can SELECT their own preferences
- `sms_prefs_own_update` — a user can UPDATE their own preferences

-----

### activity_log

System-wide audit trail that records all significant actions taken by admins and account users. Used for debugging, support, and compliance. Regular users have no access — admin only.

|Column       |Type        |Nullable|Default             |Description                                                                |
|-------------|------------|--------|--------------------|---------------------------------------------------------------------------|
|`activity_id`|uuid        |NO      |`uuid_generate_v4()`|Primary key                                                                |
|`created_at` |timestamptz |NO      |`now()`             |When the action occurred                                                   |
|`actor`      |USER-DEFINED|NO      |—                   |Who performed the action — admin or account_user                           |
|`actor_id`   |text        |NO      |—                   |The ID of the person who performed the action                              |
|`action_type`|text        |NO      |—                   |The type of action performed (e.g. work_order_created, invoice_paid)       |
|`entity_type`|text        |YES     |—                   |The type of record the action was performed on (e.g. work_orders, invoices)|
|`entity_id`  |uuid        |YES     |—                   |The ID of the specific record affected                                     |
|`payload`    |jsonb       |NO      |`{}`                |Additional context or data about the action                                |
|`archived`   |boolean     |NO      |`false`             |Whether this log entry has been archived                                   |
|`archived_at`|timestamptz |YES     |—                   |When the log entry was archived                                            |

**RLS Policies:**

- `activity_log_admin_all` — admin has full access only; no account user access

-----

## Security Notes

- `is_admin()` is set to `SECURITY DEFINER` — it runs with the privileges of the function owner rather than the calling user. This is an acceptable pattern for an admin check function but should be reviewed periodically.
- All views should use `SECURITY INVOKER` where possible to respect RLS on underlying tables.
- Guest inquiries are intentionally restricted to the `anon` role only — authenticated users cannot submit guest inquiries and must use `account_inquiries` instead.
- `activity_log` and `admin_notifications` are admin-only tables with no account user access.
