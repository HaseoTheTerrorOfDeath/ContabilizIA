"use client";


import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";

interface Movimento {
  data: string;
  descricao: string;
  tipo: "Receita" | "Despesa";
  valor: number;
}

export default function RegistroMovimentacao() {
  const [movimentos, setMovimentos] = useState<Movimento[]>([]);
  const [form, setForm] = useState<Movimento>({
    data: "",
    descricao: "",
    tipo: "Receita",
    valor: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "valor" ? parseFloat(value) : value }));
  };

  const adicionarMovimento = () => {
    if (form.data && form.descricao && form.valor > 0) {
      setMovimentos((prev) => [...prev, form]);
      setForm({ data: "", descricao: "", tipo: "Receita", valor: 0 });
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Registro de Movimentações</h1>

      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="border p-3 rounded-md"
        >
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </select>
        <input
          type="number"
          name="valor"
          placeholder="Valor (R$)"
          value={form.valor}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
      </div>

      <button
        onClick={adicionarMovimento}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md mb-10"
      >
        Adicionar
      </button>

      {/* Lista de Movimentações */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Data</th>
              <th className="px-4 py-2 border">Descrição</th>
              <th className="px-4 py-2 border">Tipo</th>
              <th className="px-4 py-2 border">Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {movimentos.map((movimento, idx) => (
              <tr key={idx} className="text-center">
                <td className="px-4 py-2 border">{movimento.data}</td>
                <td className="px-4 py-2 border">{movimento.descricao}</td>
                <td className="px-4 py-2 border">{movimento.tipo}</td>
                <td className="px-4 py-2 border">{movimento.valor.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const gerarPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Relatório de Movimentações", 14, 22);
  doc.setFontSize(12);
  doc.setTextColor(100);

  const tableColumn = ["Descrição", "Valor (R$)", "Tipo"];
  const tableRows = transacoes.map((t) => [
    t.descricao,
    t.valor.toFixed(2),
    t.tipo,
  ]);

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("relatorio_movimentacoes.pdf");
};

<button
  onClick={gerarPDF}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition mb-10"
>
  Gerar PDF
</button>


