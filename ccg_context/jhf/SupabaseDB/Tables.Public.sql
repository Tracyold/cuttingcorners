-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.account_inquiries (
  account_inquiry_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  account_user_id uuid NOT NULL,
  description text NOT NULL,
  photo_url text,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamp with time zone,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT account_inquiries_pkey PRIMARY KEY (account_inquiry_id),
  CONSTRAINT account_inquiries_account_user_id_fkey FOREIGN KEY (account_user_id) REFERENCES public.account_users(account_user_id)
);
CREATE TABLE public.account_users (
  account_user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  shipping_address text,
  status USER-DEFINED NOT NULL DEFAULT 'ACTIVE'::account_status,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  business_name text,
  CONSTRAINT account_users_pkey PRIMARY KEY (account_user_id)
);
CREATE TABLE public.activity_log (
  activity_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  actor USER-DEFINED NOT NULL,
  actor_id text NOT NULL,
  action_type text NOT NULL,
  entity_type text,
  entity_id uuid,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  archived boolean NOT NULL DEFAULT false,
  archived_at timestamp with time zone,
  CONSTRAINT activity_log_pkey PRIMARY KEY (activity_id)
);
CREATE TABLE public.admin_notification_config (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  admin_phone text NOT NULL,
  notify_purchases boolean DEFAULT true,
  notify_chat boolean DEFAULT true,
  notify_inquiries boolean DEFAULT true,
  notify_work_orders boolean DEFAULT true,
  notify_service_requests boolean DEFAULT true,
  CONSTRAINT admin_notification_config_pkey PRIMARY KEY (id)
);
CREATE TABLE public.admin_notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  type text NOT NULL,
  message text NOT NULL,
  user_id uuid,
  read boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT admin_notifications_pkey PRIMARY KEY (id),
  CONSTRAINT admin_notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.admin_users (
  admin_user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  business_name text,
  full_name text,
  address text,
  phone text,
  contact_email text,
  CONSTRAINT admin_users_pkey PRIMARY KEY (admin_user_id)
);
CREATE TABLE public.chat_messages (
  chat_message_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  chat_thread_id uuid NOT NULL,
  actor USER-DEFINED NOT NULL,
  actor_id text NOT NULL,
  body text NOT NULL CHECK (body <> ''::text),
  attachment_url text,
  attachment_type text,
  CONSTRAINT chat_messages_pkey PRIMARY KEY (chat_message_id),
  CONSTRAINT chat_messages_chat_thread_id_fkey FOREIGN KEY (chat_thread_id) REFERENCES public.chat_threads(chat_thread_id)
);
CREATE TABLE public.chat_threads (
  chat_thread_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  account_user_id uuid NOT NULL UNIQUE,
  admin_has_unread boolean NOT NULL DEFAULT false,
  account_has_unread boolean NOT NULL DEFAULT false,
  last_message_at timestamp with time zone,
  last_message_preview text,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT chat_threads_pkey PRIMARY KEY (chat_thread_id),
  CONSTRAINT chat_threads_account_user_id_fkey FOREIGN KEY (account_user_id) REFERENCES public.account_users(account_user_id)
);
CREATE TABLE public.guest_inquiries (
  guest_inquiry_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  shipping_address text NOT NULL,
  description text NOT NULL,
  photo_url text,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamp with time zone,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT guest_inquiries_pkey PRIMARY KEY (guest_inquiry_id)
);
CREATE TABLE public.invoices (
  invoice_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  account_user_id uuid NOT NULL,
  stripe_session_id text NOT NULL UNIQUE,
  stripe_payment_intent_id text UNIQUE,
  invoice_state USER-DEFINED NOT NULL DEFAULT 'PAID'::invoice_state,
  paid_at timestamp with time zone NOT NULL DEFAULT now(),
  line_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount numeric NOT NULL,
  account_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  admin_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  archived_at timestamp with time zone,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT invoices_pkey PRIMARY KEY (invoice_id),
  CONSTRAINT invoices_account_user_id_fkey FOREIGN KEY (account_user_id) REFERENCES public.account_users(account_user_id)
);
CREATE TABLE public.portfolio_photos (
  portfolio_photo_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  photo_url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT false,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  archived boolean NOT NULL DEFAULT false,
  year text,
  description text,
  CONSTRAINT portfolio_photos_pkey PRIMARY KEY (portfolio_photo_id)
);
CREATE TABLE public.products (
  product_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text NOT NULL,
  total_price numeric NOT NULL,
  gem_type text,
  shape text,
  weight numeric,
  color text,
  origin text,
  treatment text,
  description text,
  price_per_carat numeric,
  gia_report_number text,
  gia_report_pdf_url text,
  photo_url text,
  product_state USER-DEFINED NOT NULL DEFAULT 'DRAFT'::product_state,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (product_id)
);
CREATE TABLE public.service_requests (
  service_request_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  account_user_id uuid NOT NULL,
  description text NOT NULL,
  photo_url text,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamp with time zone,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  subject text,
  service_type text,
  CONSTRAINT service_requests_pkey PRIMARY KEY (service_request_id),
  CONSTRAINT service_requests_account_user_id_fkey FOREIGN KEY (account_user_id) REFERENCES public.account_users(account_user_id)
);
CREATE TABLE public.user_notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  type text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT user_notifications_pkey PRIMARY KEY (id),
  CONSTRAINT user_notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_sms_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  phone text NOT NULL,
  opt_in_work_orders boolean DEFAULT false,
  opt_in_tracking boolean DEFAULT false,
  opt_in_chat boolean DEFAULT false,
  opt_in_purchases boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  opt_in_new_listings boolean DEFAULT false,
  CONSTRAINT user_sms_preferences_pkey PRIMARY KEY (id),
  CONSTRAINT user_sms_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.work_orders (
  work_order_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  account_user_id uuid NOT NULL,
  created_by_admin_id uuid NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  service_type text,
  gem_type text,
  estimated_price numeric,
  notes text,
  status USER-DEFINED NOT NULL DEFAULT 'CREATED'::work_order_status,
  accepted_at timestamp with time zone,
  completed_at timestamp with time zone,
  edit_history jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  cancelled_at timestamp with time zone,
  cancel_reason text,
  CONSTRAINT work_orders_pkey PRIMARY KEY (work_order_id),
  CONSTRAINT work_orders_account_user_id_fkey FOREIGN KEY (account_user_id) REFERENCES public.account_users(account_user_id),
  CONSTRAINT work_orders_created_by_admin_id_fkey FOREIGN KEY (created_by_admin_id) REFERENCES public.admin_users(admin_user_id)
);
