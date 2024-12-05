import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '../lib/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Personal Budget Tracker',
  description: 'Track your income and expenses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

