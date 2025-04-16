"use client";

import { useState } from "react";

export default function DividasOnusPage() {
  const [financiamentos, setFinanciamentos] = useState("");
  const [emprestimos, setEmprestimos] = useState("");
  const [outrasDividas, setOutrasDividas] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      financiamentos,
      emprestimos,
      outrasDividas,
    });

    alert("Dívidas e Ônus salvos! (Futuro: Avançar para a próxima etapa)");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dívidas e Ônus</h1>
      <p className="text-gray-500 mb-10">Informe suas dívidas existentes em 31/12/2024.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Financiamentos */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2">Financiamentos (R$)</label>
          <input
            type="number"
            min="0"
            className="border border-gray-300 rounded-md p-3"
            value={financiamentos}
            onChange={(e) => setFinanciamentos(e.target.value)}
          />
        </div>

        {/* Empréstimos */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2">Empréstimos (R$)</label>
          <input
            type="number"
            min="0"
            className="border border-gray-300 rounded-md p-3"
            value={emprestimos}
            onChange={(e) => setEmprestimos(e.target.value)}
          />
        </div>

        {/* Outras Dívidas */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2">Outras dívidas (R$)</label>
          <input
            type="number"
            min="0"
            className="border border-gray-300 rounded-md p-3"
            value={outrasDividas}
            onChange={(e) => setOutrasDividas(e.target.value)}
          />
        </div>

        {/* Botão de avançar */}
        <div className="flex col-span-1 md:col-span-2 justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition"
          >
            Salvar e Continuar
          </button>
        </div>
      </form>
    </div>
  );
}

