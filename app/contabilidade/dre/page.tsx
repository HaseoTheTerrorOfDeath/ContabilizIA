'use client';

import { useState } from 'react';

type Linha = { nome: string; valor: string };

export default function DREPage() {
  const [receitas, setReceitas] = useState<Linha[]>([{ nome: '', valor: '' }]);
  const [despesas, setDespesas] = useState<Linha[]>([{ nome: '', valor: '' }]);

  const handleChange = (
    index: number,
    key: 'nome' | 'valor',
    value: string,
    tipo: 'receita' | 'despesa'
  ) => {
    const lista = tipo === 'receita' ? [...receitas] : [...despesas];
    lista[index][key] = value;
    tipo === 'receita' ? setReceitas(lista) : setDespesas(lista);
  };

  const adicionarLinha = (tipo: 'receita' | 'despesa') => {
    const nova = { nome: '', valor: '' };
    tipo === 'receita' ? setReceitas([...receitas, nova]) : setDespesas([...despesas, nova]);
  };

  const calcularTotal = (linhas: Linha[]) =>
    linhas.reduce((acc, cur) => acc + parseFloat(cur.valor || '0'), 0);

  const totalReceitas = calcularTotal(receitas);
  const totalDespesas = calcularTotal(despesas);
  const resultado = totalReceitas - totalDespesas;

  const sugestaoIA = resultado < 0
    ? "Alerta: Seu resultado está negativo. Considere revisar suas despesas e renegociar dívidas."
    : resultado === 0
    ? "Atenção: Lucro nulo. Pode indicar margem apertada ou erro de lançamento."
    : "Bom resultado! Continue controlando os gastos e otimizando receitas.";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Demonstrativo de Resultado do Exercício (DRE)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Receitas */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Receitas</h2>
          {receitas.map((linha, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="Origem da receita"
                value={linha.nome}
                onChange={(e) => handleChange(i, 'nome', e.target.value, 'receita')}
              />
              <input
                type="number"
                className="w-32 p-2 border rounded"
                placeholder="Valor"
                value={linha.valor}
                onChange={(e) => handleChange(i, 'valor', e.target.value, 'receita')}
              />
            </div>
          ))}
          <button onClick={() => adicionarLinha('receita')} className="text-blue-600 text-sm mt-1 hover:underline">
            + Adicionar receita
          </button>
        </div>

        {/* Despesas */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Despesas</h2>
          {despesas.map((linha, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="Tipo de despesa"
                value={linha.nome}
                onChange={(e) => handleChange(i, 'nome', e.target.value, 'despesa')}
              />
              <input
                type="number"
                className="w-32 p-2 border rounded"
                placeholder="Valor"
                value={linha.valor}
                onChange={(e) => handleChange(i, 'valor', e.target.value, 'despesa')}
              />
            </div>
          ))}
          <button onClick={() => adicionarLinha('despesa')} className="text-blue-600 text-sm mt-1 hover:underline">
            + Adicionar despesa
          </button>
        </div>
      </div>

      <div className="mt-10 bg-gray-100 p-6 rounded-lg space-y-2">
        <p>Total de Receitas: <strong>R$ {totalReceitas.toFixed(2)}</strong></p>
        <p>Total de Despesas: <strong>R$ {totalDespesas.toFixed(2)}</strong></p>
        <p>Resultado (Lucro / Prejuízo): <strong>R$ {resultado.toFixed(2)}</strong></p>
        <p className="text-sm text-indigo-600 font-medium mt-4">
          {sugestaoIA}
        </p>
      </div>
    </div>
  );
}

