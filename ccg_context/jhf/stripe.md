
| table_name | index_name                            | is_unique | index_def                                                                                                           |
| ---------- | ------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| invoices   | invoices_pkey                         | true      | CREATE UNIQUE INDEX invoices_pkey ON public.invoices USING btree (invoice_id)                                       |
| invoices   | invoices_stripe_payment_intent_id_key | true      | CREATE UNIQUE INDEX invoices_stripe_payment_intent_id_key ON public.invoices USING btree (stripe_payment_intent_id) |
| invoices   | invoices_stripe_session_id_key        | true      | CREATE UNIQUE INDEX invoices_stripe_session_id_key ON public.invoices USING btree (stripe_session_id)               |
| invoices   | idx_invoices_intent                   | false     | CREATE INDEX idx_invoices_intent ON public.invoices USING btree (stripe_payment_intent_id)                          |
| invoices   | idx_invoices_paid_at                  | false     | CREATE INDEX idx_invoices_paid_at ON public.invoices USING btree (paid_at DESC)                                     |
| invoices   | idx_invoices_session                  | false     | CREATE INDEX idx_invoices_session ON public.invoices USING btree (stripe_session_id)                                |
| invoices   | idx_invoices_state                    | false     | CREATE INDEX idx_invoices_state ON public.invoices USING btree (invoice_state)                                      |
| invoices   | idx_invoices_user                     | false     | CREATE INDEX idx_invoices_user ON public.invoices USING btree (account_user_id)                                     |




| schema_name | table_name | trigger_name               | trigger_def                                                                                                                      | function_name                 | function_schema |
| ----------- | ---------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------------- |
| public      | invoices   | trigger_mark_products_sold | CREATE TRIGGER trigger_mark_products_sold AFTER INSERT ON invoices FOR EACH ROW EXECUTE FUNCTION mark_products_sold_on_invoice() | mark_products_sold_on_invoice | public          |
| public      | invoices   | user_notify_invoice        | CREATE TRIGGER user_notify_invoice AFTER INSERT ON invoices FOR EACH ROW EXECUTE FUNCTION notify_user_on_event()                 | notify_user_on_event          | public          |