
# Cutting Corners Gems — System Architecture & Data Flow

**Database:** Supabase (PostgreSQL)
**Client:** Supabase JS (`@supabase/supabase-js`)
**Auth:** Supabase Auth (`auth.users`)
**Last Updated:** February 2026

-----

## How the System is Structured

The app has two types of authenticated users — **admins** and **account users** — plus **anonymous guests** who can submit inquiries without an account. All three interact with the same Supabase backend but have different levels of access enforced by RLS policies and the `is_admin()` function.

```
┌─────────────────────────────────────────────────────────┐
│                        Supabase Auth                     │
│                        auth.users                        │
└────────────────────┬──────────────┬──────────────────────┘
                     │              │
              ┌──────▼──────┐ ┌────▼────────┐
              │ admin_users │ │account_users│
              └──────┬──────┘ └────┬────────┘
                     │              │
        ┌────────────┼──────────────┼──────────────────┐
        │            │              │                   │
   [manages]    [notified]     [owns/creates]      [receives]
        │            │              │                   │
   products   admin_notifications  work_orders    user_notifications
   portfolio  admin_notif_config   invoices       user_sms_preferences
   activity_log                    service_requests
                                   account_inquiries
                                   chat_threads ──► chat_messages
                                   
┌─────────────┐
│  anon users │──► guest_inquiries
└─────────────┘
```

-----

## Table Relationship Map

### auth.users (Supabase Auth)

The root of all user identity. Both `admin_users` and `account_users` reference `auth.users` via their primary key matching the auth UID.

```
auth.users
  ├── admin_users.admin_user_id         (1:1)
  ├── account_users.account_user_id     (1:1)
  └── user_sms_preferences.user_id      (1:1, FK with CASCADE DELETE)
```

### account_users (hub for all customer activity)

Every piece of customer data ties back to `account_users`.

```
account_users
  ├── work_orders.account_user_id           (1:many)
  ├── invoices.account_user_id              (1:many)
  ├── service_requests.account_user_id      (1:many)
  ├── account_inquiries.account_user_id     (1:many)
  ├── chat_threads.account_user_id          (1:1)
  ├── user_notifications.user_id            (1:many)
  └── user_sms_preferences.user_id          (1:1)
```

### chat_threads → chat_messages

Each account user has one thread. Messages live inside that thread.

```
chat_threads
  └── chat_messages.chat_thread_id   (1:many)
```

### work_orders

Work orders reference both the customer and the admin who created them.

```
work_orders
  ├── account_users.account_user_id       (many:1)
  └── admin_users.created_by_admin_id     (many:1)
```

### Standalone tables (no FK to account_users)

These tables are self-contained and managed purely by admin.

```
products                  (admin manages, public reads)
portfolio_photos          (admin manages, public reads)
guest_inquiries           (anon submits, admin reads)
activity_log              (system writes, admin reads)
admin_notifications       (system writes, admin reads)
admin_notification_config (admin configures)
```

-----

## Key User Journeys & Data Flow

### 1. Guest submits an inquiry

```
anon user fills out contact form
  → INSERT into guest_inquiries (anon role, no auth required)
  → Edge Function triggers → INSERT into admin_notifications
  → Edge Function triggers → SMS sent if notify_inquiries = true in admin_notification_config
```

### 2. Account user registers

```
Supabase Auth creates auth.users row
  → App INSERTs into account_users (matching auth UID)
  → App INSERTs into chat_threads (one thread created per user)
  → App INSERTs into user_sms_preferences (default all false)
```

### 3. Admin creates a work order

```
Admin fills out work order form
  → INSERT into work_orders (admin role)
  → Edge Function triggers → INSERT into user_notifications for the account user
  → Edge Function triggers → INSERT into activity_log
  → Edge Function triggers → SMS sent if opt_in_work_orders = true in user_sms_preferences
```

### 4. Account user accepts a work order

```
User taps Accept on their work order
  → UPDATE work_orders SET status = 'ACCEPTED', accepted_at = now()
  → Edge Function triggers → INSERT into admin_notifications
  → Edge Function triggers → INSERT into activity_log
```

### 5. Customer purchases a product (Stripe)

```
User initiates Stripe checkout
  → Stripe webhook fires on payment success
  → Edge Function → INSERT into invoices with line_items, account_snapshot, admin_snapshot
  → Edge Function → UPDATE product_state to reflect sale if needed
  → Edge Function → INSERT into user_notifications
  → Edge Function → INSERT into admin_notifications
  → Edge Function → SMS sent if notify_purchases = true in admin_notification_config
```

### 6. Chat message sent

```
User or admin sends a message
  → INSERT into chat_messages
  → UPDATE chat_threads SET last_message_at, last_message_preview, admin_has_unread / account_has_unread
  → Edge Function triggers → INSERT into user_notifications or admin_notifications
  → Edge Function triggers → SMS sent if opt_in_chat = true
```

-----

## Code Patterns

All database interaction uses the Supabase JS client. The client is initialized once and imported across the app.

### Client Setup

```javascript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

For server-side operations that need to bypass RLS (e.g. Edge Functions, webhooks):

```javascript
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // Never expose this to the client
)
```

-----

### account_users

**Fetch current user’s profile:**

```javascript
const { data, error } = await supabase
  .from('account_users')
  .select('*')
  .eq('account_user_id', userId)
  .single()
```

**Update profile:**

```javascript
const { error } = await supabase
  .from('account_users')
  .update({ name, phone, shipping_address })
  .eq('account_user_id', userId)
```

**Admin fetches all account users:**

```javascript
const { data, error } = await supabase
  .from('account_users')
  .select('*')
  .order('created_at', { ascending: false })
```

-----

### products

**Fetch all published products (public):**

```javascript
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('product_state', 'PUBLISHED')
  .order('created_at', { ascending: false })
```

**Admin fetches all products including drafts:**

```javascript
const { data, error } = await supabase
  .from('products')
  .select('*')
  .order('created_at', { ascending: false })
```

**Admin creates a product:**

```javascript
const { data, error } = await supabase
  .from('products')
  .insert({
    title,
    description,
    total_price,
    gem_type,
    product_state: 'DRAFT'
  })
```

**Admin publishes a product:**

```javascript
const { error } = await supabase
  .from('products')
  .update({ product_state: 'PUBLISHED' })
  .eq('product_id', productId)
```

-----

### work_orders

**Admin creates a work order:**

```javascript
const { data, error } = await supabase
  .from('work_orders')
  .insert({
    account_user_id,
    created_by_admin_id: adminId,
    title,
    description,
    service_type,
    estimated_price,
    status: 'CREATED'
  })
```

**Account user fetches their work orders:**

```javascript
const { data, error } = await supabase
  .from('work_orders')
  .select('*')
  .eq('account_user_id', userId)
  .order('created_at', { ascending: false })
```

**Account user accepts a work order:**

```javascript
const { error } = await supabase
  .from('work_orders')
  .update({ status: 'ACCEPTED', accepted_at: new Date().toISOString() })
  .eq('work_order_id', workOrderId)
```

**Admin marks a work order complete:**

```javascript
const { error } = await supabase
  .from('work_orders')
  .update({ status: 'COMPLETED', completed_at: new Date().toISOString() })
  .eq('work_order_id', workOrderId)
```

-----

### invoices

**Account user fetches their invoices:**

```javascript
const { data, error } = await supabase
  .from('invoices')
  .select('*')
  .eq('account_user_id', userId)
  .order('paid_at', { ascending: false })
```

**Create invoice after Stripe webhook (server-side, service role):**

```javascript
const { error } = await supabaseAdmin
  .from('invoices')
  .insert({
    account_user_id,
    stripe_session_id,
    stripe_payment_intent_id,
    total_amount,
    line_items,
    account_snapshot,
    admin_snapshot,
    invoice_state: 'PAID'
  })
```

-----

### service_requests

**Account user submits a service request:**

```javascript
const { error } = await supabase
  .from('service_requests')
  .insert({
    account_user_id: userId,
    subject,
    service_type,
    description,
    photo_url
  })
```

**Admin fetches all unread service requests:**

```javascript
const { data, error } = await supabase
  .from('service_requests')
  .select('*, account_users(name, email)')
  .eq('is_read', false)
  .order('created_at', { ascending: false })
```

**Admin marks a service request as read:**

```javascript
const { error } = await supabase
  .from('service_requests')
  .update({ is_read: true, read_at: new Date().toISOString() })
  .eq('service_request_id', requestId)
```

-----

### account_inquiries

**Account user submits an inquiry:**

```javascript
const { error } = await supabase
  .from('account_inquiries')
  .insert({
    account_user_id: userId,
    description,
    photo_url
  })
```

**Admin fetches all unread account inquiries:**

```javascript
const { data, error } = await supabase
  .from('account_inquiries')
  .select('*, account_users(name, email)')
  .eq('is_read', false)
  .order('created_at', { ascending: false })
```

-----

### guest_inquiries

**Guest submits an inquiry (no auth required):**

```javascript
const { error } = await supabase
  .from('guest_inquiries')
  .insert({
    name,
    email,
    phone,
    shipping_address,
    description,
    photo_url
  })
```

**Admin fetches all unread guest inquiries:**

```javascript
const { data, error } = await supabase
  .from('guest_inquiries')
  .select('*')
  .eq('is_read', false)
  .order('created_at', { ascending: false })
```

-----

### chat_threads & chat_messages

**Fetch the current user’s chat thread with messages:**

```javascript
const { data: thread, error } = await supabase
  .from('chat_threads')
  .select(`
    *,
    chat_messages (*)
  `)
  .eq('account_user_id', userId)
  .single()
```

**Admin fetches all threads (inbox view):**

```javascript
const { data, error } = await supabase
  .from('chat_threads')
  .select('*, account_users(name, email)')
  .order('last_message_at', { ascending: false })
```

**Send a message:**

```javascript
const { error } = await supabase
  .from('chat_messages')
  .insert({
    chat_thread_id,
    actor: 'account_user',   // or 'admin'
    actor_id: userId,
    body,
    attachment_url,
    attachment_type
  })
```

**Subscribe to new messages in real time:**

```javascript
const channel = supabase
  .channel('chat_messages')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `chat_thread_id=eq.${threadId}` },
    (payload) => {
      // handle new message
    }
  )
  .subscribe()
```

**Mark thread as read (account user side):**

```javascript
const { error } = await supabase
  .from('chat_threads')
  .update({ account_has_unread: false })
  .eq('chat_thread_id', threadId)
```

-----

### user_notifications

**Fetch unread notifications for current user:**

```javascript
const { data, error } = await supabase
  .from('user_notifications')
  .select('*')
  .eq('user_id', userId)
  .eq('read', false)
  .order('created_at', { ascending: false })
```

**Mark a notification as read:**

```javascript
const { error } = await supabase
  .from('user_notifications')
  .update({ read: true })
  .eq('id', notificationId)
```

**Subscribe to new notifications in real time:**

```javascript
const channel = supabase
  .channel('user_notifications')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'user_notifications', filter: `user_id=eq.${userId}` },
    (payload) => {
      // show notification badge or toast
    }
  )
  .subscribe()
```

-----

### user_sms_preferences

**Fetch current user’s SMS preferences:**

```javascript
const { data, error } = await supabase
  .from('user_sms_preferences')
  .select('*')
  .eq('user_id', userId)
  .single()
```

**Save SMS preferences:**

```javascript
const { error } = await supabase
  .from('user_sms_preferences')
  .upsert({
    user_id: userId,
    phone,
    opt_in_work_orders,
    opt_in_chat,
    opt_in_purchases,
    opt_in_tracking,
    opt_in_new_listings
  }, { onConflict: 'user_id' })
```

-----

### admin_notification_config

**Fetch admin notification config:**

```javascript
const { data, error } = await supabase
  .from('admin_notification_config')
  .select('*')
  .single()
```

**Update notification toggles:**

```javascript
const { error } = await supabase
  .from('admin_notification_config')
  .update({
    notify_purchases,
    notify_chat,
    notify_inquiries,
    notify_work_orders,
    notify_service_requests
  })
  .eq('id', configId)
```

-----

### portfolio_photos

**Fetch published portfolio photos (public):**

```javascript
const { data, error } = await supabase
  .from('portfolio_photos')
  .select('*')
  .eq('published', true)
  .eq('archived', false)
  .order('sort_order', { ascending: true })
```

**Admin adds a photo:**

```javascript
const { error } = await supabase
  .from('portfolio_photos')
  .insert({
    photo_url,
    caption,
    description,
    year,
    sort_order,
    published: false
  })
```

-----

### activity_log

**Admin fetches recent activity:**

```javascript
const { data, error } = await supabase
  .from('activity_log')
  .select('*')
  .eq('archived', false)
  .order('created_at', { ascending: false })
  .limit(50)
```

**System writes an activity entry (server-side, service role):**

```javascript
const { error } = await supabaseAdmin
  .from('activity_log')
  .insert({
    actor: 'admin',
    actor_id: adminId,
    action_type: 'work_order_created',
    entity_type: 'work_orders',
    entity_id: workOrderId,
    payload: { title, account_user_id }
  })
```

-----

## Real-Time Subscriptions Summary

Supabase Realtime is used on these tables to keep the UI live without polling:

|Table                |Event |Used By                               |
|---------------------|------|--------------------------------------|
|`chat_messages`      |INSERT|Both admin and account user chat views|
|`chat_threads`       |UPDATE|Admin inbox (unread badge updates)    |
|`user_notifications` |INSERT|Account user notification bell        |
|`admin_notifications`|INSERT|Admin notification bell               |
|`work_orders`        |UPDATE|Account user work order status updates|

-----

## Edge Functions Summary

Server-side logic that runs after database events or external webhooks:

|Function                      |Trigger                                      |What it does                                                    |
|------------------------------|---------------------------------------------|----------------------------------------------------------------|
|`on-work-order-created`       |INSERT on work_orders                        |Notifies account user, logs activity, sends SMS if opted in     |
|`on-work-order-updated`       |UPDATE on work_orders                        |Notifies account user of status change, logs activity           |
|`on-stripe-webhook`           |Stripe payment_intent.succeeded              |Creates invoice, notifies user and admin, logs activity         |
|`on-message-sent`             |INSERT on chat_messages                      |Updates thread preview, sets unread flags, sends SMS if opted in|
|`on-inquiry-submitted`        |INSERT on account_inquiries / guest_inquiries|Notifies admin, sends SMS if notify_inquiries = true            |
|`on-service-request-submitted`|INSERT on service_requests                   |Notifies admin, sends SMS if notify_service_requests = true     |