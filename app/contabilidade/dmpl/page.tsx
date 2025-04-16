'use client';

import { useState } from 'react';

export default function DMPLPage() {
  const [entradas, setEntradas] = useState([{ descricao: '', valor: '' }]);
  const [saidas, setSaidas] = useState([{ descricao: '', valor: '' }]);

  const adicionarLinha = (tipo: 'entrada' | 'saida') => {
    const nova = { descricao: '', valor: '' };
    tipo === 'entrada' ? setEntradas([...entradas, nova]) : setSaidas([...saidas, nova]);
  };

  const atualizarCampo = (
    tipo: 'entrada' | 'saida',
    index: number,
    campo: 'descricao' | 'valor',
    valor: string
  ) => {
    const lista = tipo === 'entrada' ? [...entradas] : [...saidas];
    lista[index][campo] = valor;
    tipo === 'entrada' ? setEntradas(lista) : setSaidas(lista);
  };

  const calcularTotal = (lista: { valor: string }[]) =>
    lista.reduce((acc, cur) => acc + parseFloat(cur.valor || '0'), 0);

  const totalEntradas = calcularTotal(entradas);
  const totalSaidas = calcularTotal(saidas);
  const fluxo = totalEntradas - totalSaidas;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">DMPL / DFC</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Entradas de Capital */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Entradas (Capital / Lucros)</h2>
          {entradas.map((linha, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="Descrição"
                value={linha.descricao}
                onChange={(e) => atualizarCampo('entrada', i, 'descricao', e.target.value)}
              />
              <input
                type="number"
                className="w-32 p-2 border rounded"
                placeholder="Valor"
                value={linha.valor}
                onChange={(e) => atualizarCampo('entrada', i, 'valor', e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => adicionarLinha('entrada')} className="text-blue-600 text-sm mt-1 hover:underline">
            + Adicionar entrada
          </button>
        </div>

        {/* Saídas */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Saídas (Distribuição / Reversões)</h2>
          {saidas.map((linha, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="Descrição"
                value={linha.descricao}
                onChange={(e) => atualizarCampo('saida', i, 'descricao', e.target.value)}
              />
              <input
                type="number"
                className="w-32 p-2 border rounded"
                placeholder="Valor"
                value={linha.valor}
                onChange={(e) => atualizarCampo('saida', i, 'valor', e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => adicionarLinha('saida')} className="text-blue-600 text-sm mt-1 hover:underline">
            + Adicionar saída
          </button>
        </div>
      </div>

      {/* Resumo */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg space-y-2">
        <p>Total de Entradas: <strong>R$ {totalEntradas.toFixed(2)}</strong></p>
        <p>Total de Saídas: <strong>R$ {totalSaidas.toFixed(2)}</strong></p>
        <p>Fluxo de Caixa Líquido: <strong>R$ {fluxo.toFixed(2)}</strong></p>

        <p className="text-sm text-indigo-600 font-medium mt-4">
          {fluxo > 0
            ? 'Parabéns! Sua empresa está com fluxo de caixa positivo.'
            : fluxo < 0
            ? 'Atenção: Seu fluxo de caixa está negativo. Avalie cortes ou renegociações.'
            : 'Equilíbrio total entre entradas e saídas.'}
        </p>
      </div>
    </div>
  );
}

