"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeclaracaoNovaPage() {
  const router = useRouter();
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosPessoais((prev) => ({ ...prev, [name]: value }));
  };

  const salvarERedirecionar = () => {
    localStorage.setItem("dadosPessoais", JSON.stringify(dadosPessoais));
    alert("Informações pessoais salvas com sucesso!");
    router.push("/declaracao/nova/rendimentos"); // Agora ele avança pra Rendimentos!
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Informações Pessoais</h1>
      <p className="mb-6 text-gray-600">Preencha seus dados para iniciar a declaração.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input
          type="text"
          name="nome"
          placeholder="Nome Completo"
          value={dadosPessoais.nome}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={dadosPessoais.cpf}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={dadosPessoais.email}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={dadosPessoais.telefone}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
      </div>

      <button
        onClick={salvarERedirecionar}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
      >
        Salvar e Continuar
      </button>
    </div>
  );
}

