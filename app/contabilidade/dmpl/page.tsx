"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function DMPLPage() {
  const [capitalSocial, setCapitalSocial] = useState(0);
  const [lucrosAcumulados, setLucrosAcumulados] = useState(0);
  const [dividendosDistribuidos, setDividendosDistribuidos] = useState(0);

  const patrimonioFinal = capitalSocial + lucrosAcumulados - dividendosDistribuidos;

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("DMPL - Demonstração das Mutações do Patrimônio Líquido", 14, 22);
    doc.setFontSize(12);

    doc.text(`Capital Social Inicial: R$ ${capitalSocial.toFixed(2)}`, 14, 40);
    doc.text(`Lucros Acumulados: R$ ${lucrosAcumulados.toFixed(2)}`, 14, 47);
    doc.text(`Dividendos Distribuídos: R$ ${dividendosDistribuidos.toFixed(2)}`, 14, 54);
    doc.text(`Patrimônio Líquido Final: R$ ${patrimonioFinal.toFixed(2)}`, 14, 65);

    doc.save("dmpl.pdf");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">DMPL - Demonstração das Mutações do Patrimônio Líquido</h1>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div className="flex flex-col">
          <label className="mb-1">Capital Social (R$)</label>
          <input
            type="number"
            value={capitalSocial}
            onChange={(e) => setCapitalSocial(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Lucros Acumulados (R$)</label>
          <input
            type="number"
            value={lucrosAcumulados}
            onChange={(e) => setLucrosAcumulados(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Dividendos Distribuídos (R$)</label>
          <input
            type="number"
            value={dividendosDistribuidos}
            onChange={(e) => setDividendosDistribuidos(parseFloat(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto mb-10">
        <p className="text-lg">
          Patrimônio Líquido Final: <strong>R$ {patrimonioFinal.toFixed(2)}</strong>
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={gerarPDF}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition"
        >
          Gerar PDF
        </button>
      </div>
    </div>
  );
}

