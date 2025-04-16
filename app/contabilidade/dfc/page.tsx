"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function DFCPage() {
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);

  const saldoFinal = entradas - saidas;

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("DFC - Demonstração do Fluxo de Caixa", 14, 22);
    doc.setFontSize(12);

    doc.text(`Entradas de Caixa: R$ ${entradas.toFixed(2)}`, 14, 40);
    doc.text(`Saídas de Caixa: R$ ${saidas.toFixed(2)}`, 14, 47);
    doc.text(`Saldo Final: R$ ${saldoFinal.toFixed(2)}`, 14, 55);

    doc.save("dfc.pdf");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">DFC - Demonstração do Fluxo de Caixa</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="flex flex-col">
          <label className="mb-1">Entradas de Caixa (R$)</label>
          <input
            type="number"
            value={entradas}
            onChange={(e) => setEntradas(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Saídas de Caixa (R$)</label>
          <input
            type="number"
            value={saidas}
            onChange={(e) => setSaidas(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto mb-10">
        <p className="text-lg">
          Saldo Final: <strong>R$ {saldoFinal.toFixed(2)}</strong>
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={gerarPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition"
        >
          Gerar PDF
        </button>
      </div>
    </div>
  );
}

