'use client';

import { useState } from 'react';

export default function IndicadoresPage() {
  const [dados, setDados] = useState({
    ativoCirculante: '',
    estoque: '',
    passivoCirculante: '',
    passivoTotal: '',
    ativoTotal: '',
    receitaLiquida: '',
    lucroLiquido: '',
    patrimonioLiquido: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const parse = (value: string) => parseFloat(value.replace(',', '.')) || 0;

  const ativoCirculante = parse(dados.ativoCirculante);
  const estoque = parse(dados.estoque);
  const passivoCirculante = parse(dados.passivoCirculante);
  const passivoTotal = parse(dados.passivoTotal);
  const ativoTotal = parse(dados.ativoTotal);
  const receitaLiquida = parse(dados.receitaLiquida);
  const lucroLiquido = parse(dados.lucroLiquido);
  const patrimonioLiquido = parse(dados.patrimonioLiquido);

  const liquidezCorrente = passivoCirculante ? ativoCirculante / passivoCirculante : 0;
  const liquidezSeca = passivoCirculante ? (ativoCirculante - estoque) / passivoCirculante : 0;
  const endividamentoGeral = ativoTotal ? passivoTotal / ativoTotal : 0;
  const margemLiquida = receitaLiquida ? lucroLiquido / receitaLiquida : 0;
  const roa = ativoTotal ? lucroLiquido / ativoTotal : 0;
  const roe = patrimonioLiquido ? lucroLiquido / patrimonioLiquido : 0;

  const insights = [
    {
      nome: 'Liquidez Corrente',
      valor: liquidezCorrente,
      interpretacao:
        liquidezCorrente >= 1.5
          ? 'Boa capacidade de pagamento no curto prazo.'
          : 'Atenção: capacidade de pagamento no curto prazo pode estar comprometida.',
    },
    {
      nome: 'Liquidez Seca',
      valor: liquidezSeca,
      interpretacao:
        liquidezSeca >= 1
          ? 'Boa liquidez mesmo desconsiderando estoques.'
          : 'Atenção: liquidez reduzida sem considerar estoques.',
    },
    {
      nome: 'Endividamento Geral',
      valor: endividamentoGeral,
      interpretacao:
        endividamentoGeral <= 0.5
          ? 'Nível de endividamento saudável.'
          : 'Atenção: alto nível de endividamento.',
    },
    {
      nome: 'Margem Líquida',
      valor: margemLiquida,
      interpretacao:
        margemLiquida >= 0.1
          ? 'Boa margem de lucro sobre as vendas.'
          : 'Atenção: margem de lucro baixa.',
    },
    {
      nome: 'ROA (Rentabilidade do Ativo)',
      valor: roa,
      interpretacao:
        roa >= 0.05
          ? 'Boa rentabilidade dos ativos.'
          : 'Atenção: baixa rentabilidade dos ativos.',
    },
    {
      nome: 'ROE (Rentabilidade do Patrimônio Líquido)',
      valor: roe,
      interpretacao:
        roe >= 0.15
          ? 'Excelente retorno sobre o patrimônio líquido.'
          : 'Atenção: retorno sobre o patrimônio líquido abaixo do ideal.',
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Análise de Indicadores Contábeis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(dados).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="0,00"
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Indicador</th>
              <th className="border px-4 py-2">Valor</th>
              <th className="border px-4 py-2">Interpretação</th>
            </tr>
          </thead>
          <tbody>
               {insights.map((indicador) => (
              <tr key={indicador.nome} className="hover:bg-gray-100">
                <td className="border px-4 py-2 font-medium">{indicador.nome}</td>
                <td className="border px-4 py-2">
                  {indicador.valor.toLocaleString('pt-BR', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="border px-4 py-2">{indicador.interpretacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


