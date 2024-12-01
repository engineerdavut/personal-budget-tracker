import './globals.css';
import { Inter } from 'next/font/google';
import ClientProvider from '../components/ClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Personal Budget Tracker',
  description: 'Track your income and expenses with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <header className="header">
            <h1>Personal Budget Tracker</h1>
          </header>
          <main>{children}</main>
          <footer className="footer">© 2024 Personal Budget Tracker</footer>
        </ClientProvider>
      </body>
    </html>
  );
}
