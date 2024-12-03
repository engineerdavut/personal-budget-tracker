import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

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
    <html lang="en">
      <body className={`${inter.className} bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

