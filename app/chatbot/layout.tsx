import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import "@/styles/globals.css";

export default function ChatbotLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
      </body>
    </html>
  );
}

