"use client";

import { useState } from "react";

interface Certidao {
  tipo: "Federal" | "Estadual" | "Municipal";
  empresa: string;
  vencimento: string;
  status: "Válida" | "Vencida" | "Em andamento";
}

export default function CompliancePage() {
  const [certidoes, setCertidoes] = useState<Certidao[]>([]);
  const [novaCertidao, setNovaCertidao] = useState<Certidao>({
    tipo: "Federal",
    empresa: "",
    vencimento: "",
    status: "Em andamento",
  });

  const adicionarCertidao = () => {
    if (!novaCertidao.empresa || !novaCertidao.vencimento) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    setCertidoes([...certidoes, novaCertidao]);
    setNovaCertidao({ tipo: "Federal", empresa: "", vencimento: "", status: "Em andamento" });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Compliance e Regularizações</h1>

      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <select
          value={novaCertidao.tipo}
          onChange={(e) => setNovaCertidao({ ...novaCertidao, tipo: e.target.value as Certidao["tipo"] })}
          className="border p-3 rounded-md"
        >
          <option value="Federal">Federal</option>
          <option value="Estadual">Estadual</option>
          <option value="Municipal">Municipal</option>
        </select>
        <input
          type="text"
          placeholder="Empresa"
          value={novaCertidao.empresa}
          onChange={(e) => setNovaCertidao({ ...novaCertidao, empresa: e.target.value })}
          className="border p-3 rounded-md"
        />
        <input
          type="date"
          placeholder="Vencimento"
          value={novaCertidao.vencimento}
          onChange={(e) => setNovaCertidao({ ...novaCertidao, vencimento: e.target.value })}
          className="border p-3 rounded-md"
        />
        <select
          value={novaCertidao.status}
          onChange={(e) => setNovaCertidao({ ...novaCertidao, status: e.target.value as Certidao["status"] })}
          className="border p-3 rounded-md"
        >
          <option value="Válida">Válida</option>
          <option value="Vencida">Vencida</option>
          <option value="Em andamento">Em andamento</option>
        </select>
      </div>

      <button
        onClick={adicionarCertidao}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition mb-10"
      >
        Adicionar Certidão
      </button>

      {/* Lista de Certidões */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Certidões Gerenciadas</h2>
        {certidoes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Tipo</th>
                  <th className="px-4 py-2 border">Empresa</th>
                  <th className="px-4 py-2 border">Vencimento</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {certidoes.map((c, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="px-4 py-2 border">{c.tipo}</td>
                    <td className="px-4 py-2 border">{c.empresa}</td>
                    <td className="px-4 py-2 border">{c.vencimento}</td>
                    <td
                      className={`px-4 py-2 border ${
                        c.status === "Válida"
                          ? "text-green-600"
                          : c.status === "Vencida"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {c.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Nenhuma certidão gerenciada ainda.</p>
        )}
      </div>
    </div>
  );
}

