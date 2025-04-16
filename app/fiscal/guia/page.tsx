"use client";

import jsPDF from "jspdf";
import { useState } from "react";
import { useFiscal } from "@/contexts/FiscalContext";

export default function GuiaTributosPage() {
  const { receita } = useFiscal();
  const [gerado, setGerado] = useState(false);

  const tributos = {
    IRPJ: receita * 0.15,
    CSLL: receita * 0.09,
    PIS: receita * 0.0065,
    COFINS: receita * 0.03,
    ISS: receita * 0.02,
    ICMS: receita * 0.18,
  };

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Guia de Tributos Federais e Municipais", 20, 20);
    doc.setFontSize(12);
    doc.text(`Receita Bruta: R$ ${receita.toFixed(2)}`, 20, 40);

    let y = 60;
    for (const [nome, valor] of Object.entries(tributos)) {
      doc.text(`${nome}: R$ ${valor.toFixed(2)}`, 20, y);
      y += 10;
    }

    doc.save("guia_tributos.pdf");
    setGerado(true);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Geração de Guia de Tributos</h1>

      <p className="text-gray-600 mb-6">
        Receita cadastrada: <strong>R$ {receita.toFixed(2)}</strong>
      </p>

      <button
        onClick={gerarPDF}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Gerar Guia em PDF
      </button>

      {gerado && <p className="text-green-600 mt-4">PDF gerado com sucesso!</p>}
    </div>
  );
}

