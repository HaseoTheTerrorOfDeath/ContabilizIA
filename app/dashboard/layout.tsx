import Sidebar from "../../components/Sidebar";
import "../../styles/globals.css";
import { FiscalProvider } from "../../contexts/FiscalContext";

export const metadata = {
  title: "Dashboard - ContabilizIA",
  description: "Área interna para gestão contábil inteligente",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen">
        <FiscalProvider>
          <Sidebar />
          <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
        </FiscalProvider>
      </body>
    </html>
  );
}

