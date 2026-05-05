import { getInvoicesByUserAction } from '@/src/modules/invoices/invoices.actions'

interface Props {
  searchParams: Promise<{ userId?: string }>
}

export default async function InvoicesPage({ searchParams }: Props) {
  const { userId } = await searchParams
  const invoices = userId ? await getInvoicesByUserAction(userId) : []

  return (
    <div>
      <h1>Invoices</h1>
      {invoices.map(inv => (
        <div key={inv.invoice_id}>
          <span>#{inv.invoice_number ?? inv.invoice_id}</span>
          <span>{inv.total_amount}</span>
          <span>{inv.status}</span>
        </div>
      ))}
    </div>
  )
}
