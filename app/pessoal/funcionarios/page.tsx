"use client";

import { useState } from "react";

interface Funcionario {
  nome: string;
  cpf: string;
  cargo: string;
  salario: number;
}

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [novoFuncionario, setNovoFuncionario] = useState<Funcionario>({
    nome: "",
    cpf: "",
    cargo: "",
    salario: 0,
  });

  const adicionarFuncionario = () => {
    if (!novoFuncionario.nome || !novoFuncionario.cpf || !novoFuncionario.cargo || novoFuncionario.salario <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    setFuncionarios([...funcionarios, novoFuncionario]);
    setNovoFuncionario({ nome: "", cpf: "", cargo: "", salario: 0 });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Funcionários</h1>

      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Nome"
          value={novoFuncionario.nome}
          onChange={(e) => setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })}
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="CPF"
          value={novoFuncionario.cpf}
          onChange={(e) => setNovoFuncionario({ ...novoFuncionario, cpf: e.target.value })}
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Cargo"
          value={novoFuncionario.cargo}
          onChange={(e) => setNovoFuncionario({ ...novoFuncionario, cargo: e.target.value })}
          className="border p-3 rounded-md"
        />
        <input
          type="number"
          placeholder="Salário (R$)"
          value={novoFuncionario.salario}
          onChange={(e) => setNovoFuncionario({ ...novoFuncionario, salario: parseFloat(e.target.value) })}
          className="border p-3 rounded-md"
        />
      </div>

      <button
        onClick={adicionarFuncionario}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition mb-10"
      >
        Adicionar Funcionário
      </button>

      {/* Lista de Funcionários */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Funcionários Cadastrados</h2>
        {funcionarios.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Nome</th>
                  <th className="px-4 py-2 border">CPF</th>
                  <th className="px-4 py-2 border">Cargo</th>
                  <th className="px-4 py-2 border">Salário</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((f, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="px-4 py-2 border">{f.nome}</td>
                    <td className="px-4 py-2 border">{f.cpf}</td>
                    <td className="px-4 py-2 border">{f.cargo}</td>
                    <td className="px-4 py-2 border">R$ {f.salario.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Nenhum funcionário cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}

