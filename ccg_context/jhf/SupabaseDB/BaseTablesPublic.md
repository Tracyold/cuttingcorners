| table_name                | column_name              | data_type                   | is_nullable | column_default               |
| ------------------------- | ------------------------ | --------------------------- | ----------- | ---------------------------- |
| account_inquiries         | account_inquiry_id       | uuid                        | NO          | uuid_generate_v4()           |
| account_inquiries         | created_at               | timestamp with time zone    | NO          | now()                        |
| account_inquiries         | account_user_id          | uuid                        | NO          | null                         |
| account_inquiries         | description              | text                        | NO          | null                         |
| account_inquiries         | photo_url                | text                        | YES         | null                         |
| account_inquiries         | is_read                  | boolean                     | NO          | false                        |
| account_inquiries         | read_at                  | timestamp with time zone    | YES         | null                         |
| account_inquiries         | updated_at               | timestamp with time zone    | NO          | now()                        |
| account_users             | account_user_id          | uuid                        | NO          | uuid_generate_v4()           |
| account_users             | created_at               | timestamp with time zone    | NO          | now()                        |
| account_users             | name                     | text                        | NO          | null                         |
| account_users             | email                    | text                        | NO          | null                         |
| account_users             | phone                    | text                        | YES         | null                         |
| account_users             | shipping_address         | text                        | YES         | null                         |
| account_users             | status                   | USER-DEFINED                | NO          | ‘ACTIVE’::account_status     |
| account_users             | updated_at               | timestamp with time zone    | NO          | now()                        |
| account_users             | business_name            | text                        | YES         | null                         |
| activity_log              | activity_id              | uuid                        | NO          | uuid_generate_v4()           |
| activity_log              | created_at               | timestamp with time zone    | NO          | now()                        |
| activity_log              | actor                    | USER-DEFINED                | NO          | null                         |
| activity_log              | actor_id                 | text                        | NO          | null                         |
| activity_log              | action_type              | text                        | NO          | null                         |
| activity_log              | entity_type              | text                        | YES         | null                         |
| activity_log              | entity_id                | uuid                        | YES         | null                         |
| activity_log              | payload                  | jsonb                       | NO          | ‘{}’::jsonb                  |
| activity_log              | archived                 | boolean                     | NO          | false                        |
| activity_log              | archived_at              | timestamp with time zone    | YES         | null                         |
| admin_notification_config | id                       | uuid                        | NO          | gen_random_uuid()            |
| admin_notification_config | admin_phone              | text                        | NO          | null                         |
| admin_notification_config | notify_purchases         | boolean                     | YES         | true                         |
| admin_notification_config | notify_chat              | boolean                     | YES         | true                         |
| admin_notification_config | notify_inquiries         | boolean                     | YES         | true                         |
| admin_notification_config | notify_work_orders       | boolean                     | YES         | true                         |
| admin_notification_config | notify_service_requests  | boolean                     | YES         | true                         |
| admin_notifications       | id                       | uuid                        | NO          | gen_random_uuid()            |
| admin_notifications       | type                     | text                        | NO          | null                         |
| admin_notifications       | message                  | text                        | NO          | null                         |
| admin_notifications       | user_id                  | uuid                        | YES         | null                         |
| admin_notifications       | read                     | boolean                     | YES         | false                        |
| admin_notifications       | created_at               | timestamp without time zone | YES         | now()                        |
| admin_users               | admin_user_id            | uuid                        | NO          | uuid_generate_v4()           |
| admin_users               | created_at               | timestamp with time zone    | NO          | now()                        |
| admin_users               | email                    | text                        | NO          | null                         |
| admin_users               | name                     | text                        | NO          | null                         |
| admin_users               | updated_at               | timestamp with time zone    | NO          | now()                        |
| admin_users               | business_name            | text                        | YES         | null                         |
| admin_users               | full_name                | text                        | YES         | null                         |
| admin_users               | address                  | text                        | YES         | null                         |
| admin_users               | phone                    | text                        | YES         | null                         |
| admin_users               | contact_email            | text                        | YES         | null                         |
| chat_messages             | chat_message_id          | uuid                        | NO          | uuid_generate_v4()           |
| chat_messages             | created_at               | timestamp with time zone    | NO          | now()                        |
| chat_messages             | chat_thread_id           | uuid                        | NO          | null                         |
| chat_messages             | actor                    | USER-DEFINED                | NO          | null                         |
| chat_messages             | actor_id                 | text                        | NO          | null                         |
| chat_messages             | body                     | text                        | YES         | null                         |
| chat_messages             | attachment_url           | text                        | YES         | null                         |
| chat_messages             | attachment_type          | text                        | YES         | null                         |
| chat_threads              | chat_thread_id           | uuid                        | NO          | uuid_generate_v4()           |
| chat_threads              | created_at               | timestamp with time zone    | NO          | now()                        |
| chat_threads              | account_user_id          | uuid                        | NO          | null                         |
| chat_threads              | admin_has_unread         | boolean                     | NO          | false                        |
| chat_threads              | account_has_unread       | boolean                     | NO          | false                        |
| chat_threads              | last_message_at          | timestamp with time zone    | YES         | null                         |
| chat_threads              | last_message_preview     | text                        | YES         | null                         |
| chat_threads              | updated_at               | timestamp with time zone    | NO          | now()                        |
| guest_inquiries           | guest_inquiry_id         | uuid                        | NO          | uuid_generate_v4()           |
| guest_inquiries           | created_at               | timestamp with time zone    | NO          | now()                        |
| guest_inquiries           | name                     | text                        | NO          | null                         |
| guest_inquiries           | email                    | text                        | NO          | null                         |
| guest_inquiries           | phone                    | text                        | NO          | null                         |
| guest_inquiries           | shipping_address         | text                        | NO          | null                         |
| guest_inquiries           | description              | text                        | NO          | null                         |
| guest_inquiries           | photo_url                | text                        | YES         | null                         |
| guest_inquiries           | is_read                  | boolean                     | NO          | false                        |
| guest_inquiries           | read_at                  | timestamp with time zone    | YES         | null                         |
| guest_inquiries           | updated_at               | timestamp with time zone    | NO          | now()                        |
| invoices                  | invoice_id               | uuid                        | NO          | uuid_generate_v4()           |
| invoices                  | created_at               | timestamp with time zone    | NO          | now()                        |
| invoices                  | account_user_id          | uuid                        | NO          | null                         |
| invoices                  | stripe_session_id        | text                        | NO          | null                         |
| invoices                  | stripe_payment_intent_id | text                        | YES         | null                         |
| invoices                  | invoice_state            | USER-DEFINED                | NO          | ‘PAID’::invoice_state        |
| invoices                  | paid_at                  | timestamp with time zone    | NO          | now()                        |
| invoices                  | line_items               | jsonb                       | NO          | ‘[]’::jsonb                  |
| invoices                  | total_amount             | numeric                     | NO          | null                         |
| invoices                  | account_snapshot         | jsonb                       | NO          | ‘{}’::jsonb                  |
| invoices                  | admin_snapshot           | jsonb                       | NO          | ‘{}’::jsonb                  |
| invoices                  | archived_at              | timestamp with time zone    | YES         | null                         |
| invoices                  | updated_at               | timestamp with time zone    | NO          | now()                        |
| portfolio_photos          | portfolio_photo_id       | uuid                        | NO          | uuid_generate_v4()           |
| portfolio_photos          | created_at               | timestamp with time zone    | NO          | now()                        |
| portfolio_photos          | photo_url                | text                        | NO          | null                         |
| portfolio_photos          | caption                  | text                        | YES         | null                         |
| portfolio_photos          | sort_order               | integer                     | NO          | 0                            |
| portfolio_photos          | published                | boolean                     | NO          | false                        |
| portfolio_photos          | updated_at               | timestamp with time zone    | NO          | now()                        |
| portfolio_photos          | archived                 | boolean                     | NO          | false                        |
| portfolio_photos          | year                     | text                        | YES         | null                         |
| portfolio_photos          | description              | text                        | YES         | null                         |
| products                  | product_id               | uuid                        | NO          | uuid_generate_v4()           |
| products                  | created_at               | timestamp with time zone    | NO          | now()                        |
| products                  | title                    | text                        | NO          | null                         |
| products                  | total_price              | numeric                     | NO          | null                         |
| products                  | gem_type                 | text                        | YES         | null                         |
| products                  | shape                    | text                        | YES         | null                         |
| products                  | weight                   | numeric                     | YES         | null                         |
| products                  | color                    | text                        | YES         | null                         |
| products                  | origin                   | text                        | YES         | null                         |
| products                  | treatment                | text                        | YES         | null                         |
| products                  | description              | text                        | YES         | null                         |
| products                  | price_per_carat          | numeric                     | YES         | null                         |
| products                  | gia_report_number        | text                        | YES         | null                         |
| products                  | gia_report_pdf_url       | text                        | YES         | null                         |
| products                  | photo_url                | text                        | YES         | null                         |
| products                  | product_state            | USER-DEFINED                | NO          | ‘DRAFT’::product_state       |
| products                  | updated_at               | timestamp with time zone    | NO          | now()                        |
| service_requests          | service_request_id       | uuid                        | NO          | uuid_generate_v4()           |
| service_requests          | created_at               | timestamp with time zone    | NO          | now()                        |
| service_requests          | account_user_id          | uuid                        | NO          | null                         |
| service_requests          | description              | text                        | NO          | null                         |
| service_requests          | photo_url                | text                        | YES         | null                         |
| service_requests          | is_read                  | boolean                     | NO          | false                        |
| service_requests          | read_at                  | timestamp with time zone    | YES         | null                         |
| service_requests          | updated_at               | timestamp with time zone    | NO          | now()                        |
| service_requests          | subject                  | text                        | YES         | null                         |
| service_requests          | service_type             | text                        | YES         | null                         |
| user_notifications        | id                       | uuid                        | NO          | gen_random_uuid()            |
| user_notifications        | user_id                  | uuid                        | YES         | null                         |
| user_notifications        | type                     | text                        | NO          | null                         |
| user_notifications        | message                  | text                        | NO          | null                         |
| user_notifications        | read                     | boolean                     | YES         | false                        |
| user_notifications        | created_at               | timestamp without time zone | YES         | now()                        |
| user_sms_preferences      | id                       | uuid                        | NO          | gen_random_uuid()            |
| user_sms_preferences      | user_id                  | uuid                        | YES         | null                         |
| user_sms_preferences      | phone                    | text                        | NO          | null                         |
| user_sms_preferences      | opt_in_work_orders       | boolean                     | YES         | false                        |
| user_sms_preferences      | opt_in_tracking          | boolean                     | YES         | false                        |
| user_sms_preferences      | opt_in_chat              | boolean                     | YES         | false                        |
| user_sms_preferences      | opt_in_purchases         | boolean                     | YES         | false                        |
| user_sms_preferences      | created_at               | timestamp without time zone | YES         | now()                        |
| user_sms_preferences      | opt_in_new_listings      | boolean                     | YES         | false                        |
| work_orders               | work_order_id            | uuid                        | NO          | uuid_generate_v4()           |
| work_orders               | created_at               | timestamp with time zone    | NO          | now()                        |
| work_orders               | account_user_id          | uuid                        | NO          | null                         |
| work_orders               | created_by_admin_id      | uuid                        | NO          | null                         |
| work_orders               | title                    | text                        | NO          | null                         |
| work_orders               | description              | text                        | NO          | null                         |
| work_orders               | service_type             | text                        | YES         | null                         |
| work_orders               | gem_type                 | text                        | YES         | null                         |
| work_orders               | estimated_price          | numeric                     | YES         | null                         |
| work_orders               | notes                    | text                        | YES         | null                         |
| work_orders               | status                   | USER-DEFINED                | NO          | ‘CREATED’::work_order_status |
| work_orders               | accepted_at              | timestamp with time zone    | YES         | null                         |
| work_orders               | completed_at             | timestamp with time zone    | YES         | null                         |
| work_orders               | edit_history             | jsonb                       | NO          | ‘[]’::jsonb                  |
| work_orders               | updated_at               | timestamp with time zone    | NO          | now()                        |
| work_orders               | cancelled_at             | timestamp with time zone    | YES         | null                         |
| work_orders               | cancel_reason            | text                        | YES         | null                         |
