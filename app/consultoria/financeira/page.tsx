"use client";

import { useState } from "react";

interface EntradaSaida {
  descricao: string;
  valor: number;
  tipo: "Entrada" | "Saída";
}

export default function ConsultoriaFinanceiraPage() {
  const [transacoes, setTransacoes] = useState<EntradaSaida[]>([]);
  const [novaTransacao, setNovaTransacao] = useState<EntradaSaida>({
    descricao: "",
    valor: 0,
    tipo: "Entrada",
  });

  const adicionarTransacao = () => {
    if (!novaTransacao.descricao || novaTransacao.valor <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
    setTransacoes([...transacoes, novaTransacao]);
    setNovaTransacao({ descricao: "", valor: 0, tipo: "Entrada" });
  };

  const totalEntradas = transacoes
    .filter((t) => t.tipo === "Entrada")
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalSaidas = transacoes
    .filter((t) => t.tipo === "Saída")
    .reduce((acc, curr) => acc + curr.valor, 0);

  const lucro = totalEntradas - totalSaidas;
  const margem = totalEntradas > 0 ? ((lucro / totalEntradas) * 100).toFixed(2) : "0.00";

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Consultoria Contábil e Financeira</h1>

      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Descrição"
          value={novaTransacao.descricao}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
          className="border p-3 rounded-md"
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={novaTransacao.valor}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: parseFloat(e.target.value) })}
          className="border p-3 rounded-md"
        />
        <select
          value={novaTransacao.tipo}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, tipo: e.target.value as "Entrada" | "Saída" })}
          className="border p-3 rounded-md"
        >
          <option value="Entrada">Entrada</option>
          <option value="Saída">Saída</option>
        </select>
        <button
          onClick={adicionarTransacao}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition"
        >
          Adicionar
        </button>
      </div>

      {/* Resumo Financeiro */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Resumo Financeiro</h2>
        <div className="flex flex-col md:flex-row justify-around gap-6 text-center">
          <div>
            <h3 className="text-green-600 text-xl font-bold">Total de Entradas</h3>
            <p className="text-2xl font-bold mt-2">R$ {totalEntradas.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-red-600 text-xl font-bold">Total de Saídas</h3>
            <p className="text-2xl font-bold mt-2">R$ {totalSaidas.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-indigo-600 text-xl font-bold">Lucro</h3>
            <p className="text-2xl font-bold mt-2">R$ {lucro.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-blue-600 text-xl font-bold">Margem (%)</h3>
            <p className="text-2xl font-bold mt-2">{margem}%</p>
          </div>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Histórico de Transações</h2>
        {transacoes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Descrição</th>
                  <th className="px-4 py-2 border">Valor</th>
                  <th className="px-4 py-2 border">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((t, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="px-4 py-2 border">{t.descricao}</td>
                    <td className="px-4 py-2 border">R$ {t.valor.toFixed(2)}</td>
                    <td className={`px-4 py-2 border ${t.tipo === "Entrada" ? "text-green-600" : "text-red-600"}`}>
                      {t.tipo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Nenhuma transação registrada.</p>
        )}
      </div>
    </div>
  );
}

