"use client";

import { useState } from "react";

const regimes = [
  {
    nome: "Simples Nacional",
    descricao:
      "Regime simplificado para micro e pequenas empresas. Unifica tributos federais, estaduais e municipais em uma guia única (D
::contentReference[oaicite:0]{index=0} AS, ICMS, ISS). Ideal para empresas com faturamento anual de até R$ 4,8 milhões.",
  },
  {
    nome: "Lucro Presumido",
    descricao:
      "Utiliza uma base de cálculo fixa sobre a receita bruta para apurar os impostos. Indicado para empresas com receita anual de até R$ 78 milhões.",
  },
  {
    nome: "Lucro Real",
    descricao:
      "Tributação com base no lucro efetivamente apurado. Exigido para empresas com receita acima de R$ 78 milhões ou atividades específicas.",
  },
];

export default function RegimeTributarioPage() {
  const [regimeSelecionado, setRegimeSelecionado] = useState("");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Regime Tributário</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {regimes.map((regime) => (
          <div
            key={regime.nome}
            className={`p-6 rounded-md shadow-md cursor-pointer border-2 ${
              regimeSelecionado === regime.nome
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
            onClick={() => setRegimeSelecionado(regime.nome)}
          >
            <h2 className="text-xl font-semibold mb-2">{regime.nome}</h2>
            <p className="text-sm text-gray-600">{regime.descricao}</p>
          </div>
        ))}
      </div>

      {regimeSelecionado && (
        <div className="mt-10 bg-white p-6 rounded-md shadow-md max-w-2xl">
          <h3 className="text-lg font-bold text-blue-700 mb-2">
            Regime selecionado:
          </h3>
          <p className="text-gray-700">
            {regimes.find((r) => r.nome === regimeSelecionado)?.descricao}
          </p>
        </div>
      )}
    </div>
  );
}

 

