import '../styles/globals.css'; // <- IMPORTANTE!

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head />
      <body>{children}</body>
    </html>
  );
}

