"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";

export default function ResumoPage() {
  const router = useRouter();
  const [dados, setDados] = useState<any>(null);

  useEffect(() => {
    const dadosPessoais = JSON.parse(localStorage.getItem("dadosPessoais") || "{}");
    const rendimentos = JSON.parse(localStorage.getItem("rendimentos") || "[]");
    const bens = JSON.parse(localStorage.getItem("bens") || "[]");
    const deducoes = JSON.parse(localStorage.getItem("deducoes") || "[]");

    setDados({ dadosPessoais, rendimentos, bens, deducoes });
  }, []);

  const gerarPDF = () => {
    const doc = new jsPDF();

    const { dadosPessoais, rendimentos, bens, deducoes } = dados;

    doc.setFontSize(18);
    doc.text("Resumo da Declaração de Imposto de Renda", 14, 22);

    doc.setFontSize(14);
    doc.text("Dados Pessoais", 14, 35);
    autoTable(doc, {
      startY: 40,
      body: Object.entries(dadosPessoais).map(([chave, valor]) => [chave, String(valor)]) as any,
    });

    doc.text("Rendimentos", 14, (doc as any).lastAutoTable.finalY + 10);
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 15,
      head: [["Fonte Pagadora", "CNPJ", "Valor"]],
      body: rendimentos.map((r: any) => [r.fonte, r.cnpj, r.valor]),
    });

    doc.text("Bens e Direitos", 14, (doc as any).lastAutoTable.finalY + 10);
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 15,
      head: [["Descrição", "Valor"]],
      body: bens.map((b: any) => [b.descricao, b.valor]),
    });

    doc.text("Deduções", 14, (doc as any).lastAutoTable.finalY + 10);
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 15,
      head: [["Tipo", "Valor"]],
      body: deducoes.map((d: any) => [d.tipo, d.valor]),
    });

    doc.save("declaracao-imposto-de-renda.pdf");
  };

  if (!dados) {
    return <div className="p-10 text-center">Carregando dados...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Resumo da Declaração</h1>

      {/* Seções */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dados Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(dados.dadosPessoais).map(([key, value]) => (
            <div key={key} className="p-4 bg-white rounded shadow">
              <span className="font-semibold capitalize">
                {key.replace("_", " ")}:
              </span>{" "}
              {String(value)}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Rendimentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dados.rendimentos.map((r: any, idx: number) => (
            <div key={idx} className="p-4 bg-white rounded shadow">
              <p><strong>Fonte:</strong> {r.fonte}</p>
              <p><strong>CNPJ:</strong> {r.cnpj}</p>
              <p><strong>Valor:</strong> R$ {r.valor}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bens e Direitos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dados.bens.map((b: any, idx: number) => (
            <div key={idx} className="p-4 bg-white rounded shadow">
              <p><strong>Descrição:</strong> {b.descricao}</p>
              <p><strong>Valor:</strong> R$ {b.valor}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Deduções</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dados.deducoes.map((d: any, idx: number) => (
            <div key={idx} className="p-4 bg-white rounded shadow">
              <p><strong>Tipo:</strong> {d.tipo}</p>
              <p><strong>Valor:</strong> R$ {d.valor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Botões */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/declaracao")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md"
        >
          Voltar para Declarações
        </button>

        <button
          onClick={gerarPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
        >
          Gerar PDF da Declaração
        </button>
      </div>
    </div>
  );
}

