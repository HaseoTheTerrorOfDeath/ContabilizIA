'use client';

import React from 'react';

const regimes = [
  {
    nome: "Simples Nacional",
    descricao:
      "Regime simplificado para micro e pequenas empresas. Unifica tributos federais, estaduais e municipais em uma guia única (DAS, ICMS, ISS). Ideal para empresas com faturamento anual de até R$ 4,8 milhões.",
  },
  {
    nome: "Lucro Presumido",
    descricao:
      "Regime para empresas com faturamento anual de até R$ 78 milhões. A base de cálculo do imposto é presumida, facilitando a apuração dos tributos.",
  },
  {
    nome: "Lucro Real",
    descricao:
      "Obrigatório para empresas com faturamento acima de R$ 78 milhões ou que exercem atividades específicas. Os tributos são calculados sobre o lucro efetivamente apurado.",
  },
];

const RegimePage = () => {
  return (
    <div>
      <h1>Regimes Tributários</h1>
      <ul>
        {regimes.map((regime, index) => (
          <li key={index}>
            <h2>{regime.nome}</h2>
            <p>{regime.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegimePage;

