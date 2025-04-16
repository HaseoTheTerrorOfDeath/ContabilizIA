"use client";

import { useState } from "react";

interface Empresa {
  razaoSocial: string;
  cnpj: string;
  tipo: "MEI" | "LTDA" | "EIRELI" | "SA" | "Outro";
  responsavel: string;
  status: "Abertura" | "Alteração" | "Encerramento";
}

export default function GerenciarEmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [novaEmpresa, setNovaEmpresa] = useState<Empresa>({
    razaoSocial: "",
    cnpj: "",
    tipo: "MEI",
    responsavel: "",
    status: "Abertura",
  });

  const adicionarEmpresa = () => {
    if (!novaEmpresa.razaoSocial || !novaEmpresa.cnpj || !novaEmpresa.responsavel) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    setEmpresas([...empresas, novaEmpresa]);
    setNovaEmpresa({
      razaoSocial: "",
      cnpj: "",
      tipo: "MEI",
      responsavel: "",
      status: "Abertura",
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Empresas</h1>

      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="Razão Social"
          value={novaEmpresa.razaoSocial}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, razaoSocial: e.target.value })}
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="CNPJ"
          value={novaEmpresa.cnpj}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, cnpj: e.target.value })}
          className="border p-3 rounded-md"
        />
        <select
          value={novaEmpresa.tipo}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, tipo: e.target.value as Empresa["tipo"] })}
          className="border p-3 rounded-md"
        >
          <option value="MEI">MEI</option>
          <option value="LTDA">LTDA</option>
          <option value="EIRELI">EIRELI</option>
          <option value="SA">S.A.</option>
          <option value="Outro">Outro</option>
        </select>
        <input
          type="text"
          placeholder="Responsável Legal"
          value={novaEmpresa.responsavel}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, responsavel: e.target.value })}
          className="border p-3 rounded-md"
        />
        <select
          value={novaEmpresa.status}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, status: e.target.value as Empresa["status"] })}
          className="border p-3 rounded-md"
        >
          <option value="Abertura">Abertura</option>
          <option value="Alteração">Alteração</option>
          <option value="Encerramento">Encerramento</option>
        </select>
      </div>

      <button
        onClick={adicionarEmpresa}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition mb-10"
      >
        Registrar Empresa
      </button>

      {/* Lista de Empresas */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Empresas Registradas</h2>
        {empresas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Razão Social</th>
                  <th className="px-4 py-2 border">CNPJ</th>
                  <th className="px-4 py-2 border">Tipo</th>
                  <th className="px-4 py-2 border">Responsável</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {empresas.map((e, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="px-4 py-2 border">{e.razaoSocial}</td>
                    <td className="px-4 py-2 border">{e.cnpj}</td>
                    <td className="px-4 py-2 border">{e.tipo}</td>
                    <td className="px-4 py-2 border">{e.responsavel}</td>
                    <td className="px-4 py-2 border">{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Nenhuma empresa registrada ainda.</p>
        )}
      </div>
    </div>
  );
}

