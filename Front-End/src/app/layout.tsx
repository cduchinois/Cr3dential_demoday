'use client';

import '@/styles/colors.css';
import '@/styles/globals.css';

import { Web3AuthProvider } from '@/components/Provider/Web3AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Web3AuthProvider>{children}</Web3AuthProvider>
      </body>
    </html>
  );
}
