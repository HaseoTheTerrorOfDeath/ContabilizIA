"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeducoesPage() {
  const router = useRouter();
  const [deducoes, setDeducoes] = useState([{ tipo: "", valor: "" }]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeducoes((prev) => {
      const newDeducoes = [...prev];
      newDeducoes[index][name] = value;
      return newDeducoes;
    });
  };

  const adicionarDeducao = () => {
    setDeducoes((prev) => [...prev, { tipo: "", valor: "" }]);
  };

  const salvarERedirecionar = () => {
    localStorage.setItem("deducoes", JSON.stringify(deducoes));
    alert("Deduções salvas com sucesso!");
    router.push("/declaracao/nova/resumo"); // Agora redireciona pro Resumo Final!
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Deduções</h1>

      {deducoes.map((deducao, index) => (
        <div key={index} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="tipo"
            placeholder="Tipo de Dedução"
            value={deducao.tipo}
            onChange={(e) => handleChange(index, e)}
            className="border p-3 rounded-md"
          />
          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={deducao.valor}
            onChange={(e) => handleChange(index, e)}
            className="border p-3 rounded-md"
          />
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button
          onClick={adicionarDeducao}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md"
        >
          Adicionar Dedução
        </button>

        <button
          onClick={salvarERedirecionar}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Salvar e Finalizar
        </button>
      </div>
    </div>
  );
}

