"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RendimentosPage() {
  const router = useRouter();
  const [rendimentos, setRendimentos] = useState([{ fonte: "", cnpj: "", valor: "" }]);

const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setRendimentos((prev) => {
    const newRendimentos = [...prev];
    (newRendimentos[index] as any)[name] = value;
    return newRendimentos;
  });
};

  const adicionarRendimento = () => {
    setRendimentos((prev) => [...prev, { fonte: "", cnpj: "", valor: "" }]);
  };

  const salvarERedirecionar = () => {
    localStorage.setItem("rendimentos", JSON.stringify(rendimentos));
    alert("Rendimentos salvos com sucesso!");
    router.push("/declaracao/nova/bens"); // Agora redireciona pra Bens!
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Rendimentos</h1>

      {rendimentos.map((rendimento, index) => (
        <div key={index} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="fonte"
            placeholder="Fonte Pagadora"
            value={rendimento.fonte}
            onChange={(e) => handleChange(index, e)}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={rendimento.cnpj}
            onChange={(e) => handleChange(index, e)}
            className="border p-3 rounded-md"
          />
          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={rendimento.valor}
            onChange={(e) => handleChange(index, e)}
            className="border p-3 rounded-md"
          />
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button
          onClick={adicionarRendimento}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md"
        >
          Adicionar Rendimento
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

