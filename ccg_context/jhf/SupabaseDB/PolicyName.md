|tablename                |policyname                      |cmd   |roles               |
|-------------------------|--------------------------------|------|--------------------|
|account_inquiries        |inquiries_admin_all             |ALL   |{authenticated}     |
|account_inquiries        |inquiries_own_insert            |INSERT|{authenticated}     |
|account_inquiries        |inquiries_own_read              |SELECT|{authenticated}     |
|account_users            |account_users_admin_delete      |DELETE|{authenticated}     |
|account_users            |account_users_insert_own        |INSERT|{authenticated}     |
|account_users            |account_users_own_read          |SELECT|{authenticated}     |
|account_users            |account_users_own_update        |UPDATE|{authenticated}     |
|activity_log             |activity_log_admin_all          |ALL   |{authenticated}     |
|admin_notification_config|notif_config_admin_all          |ALL   |{authenticated}     |
|admin_notification_config|admin_insert_notification_config|INSERT|{authenticated}     |
|admin_notification_config|admin_read_notification_config  |SELECT|{authenticated}     |
|admin_notification_config|admin_update_notification_config|UPDATE|{authenticated}     |
|admin_notifications      |admin_notif_admin_all           |ALL   |{authenticated}     |
|admin_users              |admin_own_row_select            |SELECT|{authenticated}     |
|admin_users              |admin_own_row_update            |UPDATE|{authenticated}     |
|chat_messages            |messages_admin_all              |ALL   |{authenticated}     |
|chat_messages            |messages_own_insert             |INSERT|{authenticated}     |
|chat_messages            |messages_own_read               |SELECT|{authenticated}     |
|chat_threads             |threads_admin_all               |ALL   |{authenticated}     |
|chat_threads             |threads_own_read                |SELECT|{authenticated}     |
|chat_threads             |threads_own_update              |UPDATE|{authenticated}     |
|guest_inquiries          |guest_inquiries_admin_all       |ALL   |{authenticated}     |
|guest_inquiries          |guest_submit_inquiry            |INSERT|{anon}              |
|invoices                 |invoices_admin_all              |ALL   |{authenticated}     |
|invoices                 |invoices_own_read               |SELECT|{authenticated}     |
|portfolio_photos         |portfolio_admin_all             |ALL   |{authenticated}     |
|portfolio_photos         |portfolio_public_read           |SELECT|{anon,authenticated}|
|products                 |products_admin_all              |ALL   |{authenticated}     |
|products                 |products_public_read            |SELECT|{anon,authenticated}|
|service_requests         |sr_admin_all                    |ALL   |{authenticated}     |
|service_requests         |sr_own_insert                   |INSERT|{authenticated}     |
|service_requests         |sr_own_read                     |SELECT|{authenticated}     |
|user_notifications       |user_notif_admin_all            |ALL   |{authenticated}     |
|user_notifications       |user_own_notifications_select   |SELECT|{authenticated}     |
|user_notifications       |user_own_notifications_update   |UPDATE|{authenticated}     |
|user_sms_preferences     |sms_prefs_admin_all             |ALL   |{authenticated}     |
|user_sms_preferences     |sms_prefs_own_insert            |INSERT|{authenticated}     |
|user_sms_preferences     |sms_prefs_own_read              |SELECT|{authenticated}     |
|user_sms_preferences     |sms_prefs_own_update            |UPDATE|{authenticated}     |
|work_orders              |wo_admin_all                    |ALL   |{authenticated}     |
|work_orders              |wo_own_read                     |SELECT|{authenticated}     |
|work_orders              |wo_own_accept                   |UPDATE|{authenticated}     |
