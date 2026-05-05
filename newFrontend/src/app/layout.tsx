import type { Metadata } from 'next'
import '@/styles/Global.css'

export const metadata: Metadata = {
  title: 'Cutting Corners',
  description: 'Stone cutting and restoration services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
