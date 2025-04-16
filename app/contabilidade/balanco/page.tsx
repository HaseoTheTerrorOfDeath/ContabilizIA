'use client';

import { useState } from 'react';

export default function BalancoPatrimonialPage() {
  const [ativos, setAtivos] = useState([{ nome: '', valor: '' }]);
  const [passivos, setPassivos] = useState([{ nome: '', valor: '' }]);

  const calcularTotal = (items: { valor: string }[]) =>
    items.reduce((acc, curr) => acc + parseFloat(curr.valor || '0'), 0);

  const handleChange = (index: number, key: 'nome' | 'valor', value: string, type: 'ativo' | 'passivo') => {
    const list = type === 'ativo' ? [...ativos] : [...passivos];
    list[index][key] = value;
    type === 'ativo' ? setAtivos(list) : setPassivos(list);
  };

  const addLinha = (type: 'ativo' | 'passivo') => {
    const novaLinha = { nome: '', valor: '' };
    type === 'ativo' ? setAtivos([...ativos, novaLinha]) : setPassivos([...passivos, novaLinha]);
  };

  const totalAtivos = calcularTotal(ativos);
  const totalPassivos = calcularTotal(passivos);
  const patrimonioLiquido = totalAtivos - totalPassivos;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Balanço Patrimonial</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Ativos */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Ativos</h2>
          {ativos.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Nome"
                className="flex-1 p-2 border rounded"
                value={item.nome}
                onChange={(e) => handleChange(index, 'nome', e.target.value, 'ativo')}
              />
              <input
                type="number"
                placeholder="Valor"
                className="w-32 p-2 border rounded"
                value={item.valor}
                onChange={(e) => handleChange(index, 'valor', e.target.value, 'ativo')}
              />
            </div>
          ))}
          <button
            onClick={() => addLinha('ativo')}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Adicionar linha
          </button>
        </div>

        {/* Passivos */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Passivos</h2>
          {passivos.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Nome"
                className="flex-1 p-2 border rounded"
                value={item.nome}
                onChange={(e) => handleChange(index, 'nome', e.target.value, 'passivo')}
              />
              <input
                type="number"
                placeholder="Valor"
                className="w-32 p-2 border rounded"
                value={item.valor}
                onChange={(e) => handleChange(index, 'valor', e.target.value, 'passivo')}
              />
            </div>
          ))}
          <button
            onClick={() => addLinha('passivo')}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Adicionar linha
          </button>
        </div>
      </div>

      <div className="mt-10 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-bold">Resumo:</h3>
        <p>Total de Ativos: <strong>R$ {totalAtivos.toFixed(2)}</strong></p>
        <p>Total de Passivos: <strong>R$ {totalPassivos.toFixed(2)}</strong></p>
        <p>Patrimônio Líquido: <strong>R$ {patrimonioLiquido.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

