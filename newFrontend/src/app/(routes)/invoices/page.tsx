import { getInvoicesAction } from '../modules/imvoices/invoices.actions'

export default async function InvoicesPage() {
  // ONLY call actions
  const invoices = await getInvoicesAction()
  
  // ONLY render
  return (
    <div>
      <h1>Invoices</h1>
      {invoices.map(inv => (
        <div key={inv.id}>{inv.amount}</div>
      ))}
    </div>
  )
}