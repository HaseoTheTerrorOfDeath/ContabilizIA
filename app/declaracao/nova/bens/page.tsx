"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BensPage() {
  const router = useRouter();
  const [bens, setBens] = useState([{ descricao: "", valor: "" }]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBens((prev) => {
      const newBens = [...prev];
      newBens[index][name] = value;
      return newBens;
    });
  };

  const adicionarBem = () => {
    setBens((prev) => [...prev, { descricao: "", valor: "" }]);
  };

  const salvarERedirecionar = () => {
    localStorage.setItem("bens", JSON.stringify(bens));
    alert("Bens salvos com sucesso!");
    router.push("/declaracao/nova/deducoes"); // Agora redireciona pra Deduções!
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Bens e Direitos</h1>

      {bens.map((bem, index) => (
        <div key={index} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="descricao"
            placeholder="Descrição do Bem"
            value={bem.descricao}
            onChange={(e) => handleChange(index, e)}
            className="border p-3 rounded-md"
          />
          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={bem.valor}
            onChange={(e) => handleChange(index, e)}
            className="border p-3 rounded-md"
          />
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button
          onClick={adicionarBem}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md"
        >
          Adicionar Bem
        </button>

        <button
          onClick={salvarERedirecionar}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Salvar e Continuar
        </button>
      </div>
    </div>
  );
}

