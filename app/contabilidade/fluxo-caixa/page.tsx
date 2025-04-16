"use client";

import { useState } from "react";

export default function MovimentacoesPage() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);

  const adicionarMovimentacao = () => {
    setMovimentacoes([...movimentacoes, { descricao, valor }]);
    setDescricao("");
    setValor(0);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Movimentações Contábeis</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-2 rounded-md mr-2"
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(parseFloat(e.target.value))}
          className="border p-2 rounded-md mr-2"
        />
        <button
          onClick={adicionarMovimentacao}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Adicionar
        </button>
      </div>

      <ul className="list-disc pl-5">
        {movimentacoes.map((mov, index) => (
          <li key={index}>
            {mov.descricao}: R$ {mov.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

