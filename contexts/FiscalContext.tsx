"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FiscalData = {
  receita: number;
  setReceita: (valor: number) => void;
};

const FiscalContext = createContext<FiscalData | undefined>(undefined);

export const FiscalProvider = ({ children }: { children: ReactNode }) => {
  const [receita, setReceita] = useState(0);

  return (
    <FiscalContext.Provider value={{ receita, setReceita }}>
      {children}
    </FiscalContext.Provider>
  );
};

export const useFiscal = () => {
  const context = useContext(FiscalContext);
  if (!context) throw new Error("useFiscal deve estar dentro do FiscalProvider");
  return context;
};

