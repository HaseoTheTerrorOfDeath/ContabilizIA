"use client";

import { useFiscal } from "@/contexts/FiscalContext";
import { useState } from "react";

export default function ApuracaoFiscalPage() {
  const { receita, setReceita } = useFiscal();

  const tributos = {
    IRPJ: receita * 0.15,
    CSLL: receita * 0.09,
    PIS: receita * 0.0065,
    COFINS: receita * 0.03,
    ISS: receita * 0.02,
    ICMS: receita * 0.18,
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Apuração de Tributos</h1>

      <div className="mb-6">
        <label className="block mb-2">Receita Bruta (R$)</label>
        <input
          type="number"
          value={receita}
          onChange={(e) => setReceita(parseFloat(e.target.value))}
          className="border p-2 rounded-md w-full max-w-md"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10 bg-gray-50 p-6 rounded-md shadow-md max-w-2xl">
        {Object.entries(tributos).map(([nome, valor]) => (
          <p key={nome}>
            {nome}: <strong>R$ {valor.toFixed(2)}</strong>
          </p>
        ))}
      </div>
    </div>
  );
}

