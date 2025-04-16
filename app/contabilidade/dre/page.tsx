"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function DREPage() {
  const [receitaBruta, setReceitaBruta] = useState(0);
  const [deducoes, setDeducoes] = useState(0);
  const [custos, setCustos] = useState(0);
  const [despesas, setDespesas] = useState(0);

  const receitaLiquida = receitaBruta - deducoes;
  const lucroOperacional = receitaLiquida - custos - despesas;

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Demonstração do Resultado do Exercício (DRE)", 14, 22);
    doc.setFontSize(12);

    doc.text(`Receita Bruta: R$ ${receitaBruta.toFixed(2)}`, 14, 40);
    doc.text(`(-) Deduções: R$ ${deducoes.toFixed(2)}`, 14, 47);
    doc.text(`= Receita Líquida: R$ ${receitaLiquida.toFixed(2)}`, 14, 54);
    doc.text(`(-) Custos: R$ ${custos.toFixed(2)}`, 14, 61);
    doc.text(`(-) Despesas Operacionais: R$ ${despesas.toFixed(2)}`, 14, 68);
    doc.text(`= Lucro/Prejuízo do Exercício: R$ ${lucroOperacional.toFixed(2)}`, 14, 75);

    doc.save("dre.pdf");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Demonstração do Resultado do Exercício (DRE)</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="flex flex-col">
          <label className="mb-1">Receita Bruta (R$)</label>
          <input
            type="number"
            value={receitaBruta}
            onChange={(e) => setReceitaBruta(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Deduções (R$)</label>
          <input
            type="number"
            value={deducoes}
            onChange={(e) => setDeducoes(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Custos (R$)</label>
          <input
            type="number"
            value={custos}
            onChange={(e) => setCustos(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Despesas Operacionais (R$)</label>
          <input
            type="number"
            value={despesas}
            onChange={(e) => setDespesas(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto mb-10">
        <p className="text-lg">Receita Líquida: <strong>R$ {receitaLiquida.toFixed(2)}</strong></p>
        <p className="text-lg">Lucro/Prejuízo: <strong>R$ {lucroOperacional.toFixed(2)}</strong></p>
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

