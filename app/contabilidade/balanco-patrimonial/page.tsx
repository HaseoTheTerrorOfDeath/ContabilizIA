"use client";

import { useState } from "react";

export default function BalancoPage() {
  const [ativo, setAtivo] = useState(0);
  const [passivo, setPassivo] = useState(0);

  const patrimonioLiquido = ativo - passivo;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Balanço Patrimonial</h1>

      <div className="mb-4">
        <label className="block mb-2">Ativo (R$)</label>
        <input
          type="number"
          value={ativo}
          onChange={(e) => setAtivo(parseFloat(e.target.value))}
          className="border p-2 rounded-md w-full max-w-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Passivo (R$)</label>
        <input
          type="number"
          value={passivo}
          onChange={(e) => setPassivo(parseFloat(e.target.value))}
          className="border p-2 rounded-md w-full max-w-md"
        />
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md">
        <p className="text-lg">
          Patrimônio Líquido: <strong>R$ {patrimonioLiquido.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
}

