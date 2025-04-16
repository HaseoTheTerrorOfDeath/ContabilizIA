// app/(home)/layout.tsx
import '../../globals.css';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}

