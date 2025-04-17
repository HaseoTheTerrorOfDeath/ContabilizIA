import { ReactNode } from "react";
import { FiscalProvider } from "@/contexts/FiscalContext";

export default function FiscalLayout({ children }: { children: ReactNode }) {
  return <FiscalProvider>{children}</FiscalProvider>;
}

