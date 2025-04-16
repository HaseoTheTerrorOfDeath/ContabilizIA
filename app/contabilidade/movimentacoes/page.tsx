'use client';

import { useState } from 'react';

export default function MovimentacoesPage() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/classify-movement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      setCategory(data.category || 'Categoria não identificada');
    } catch (error) {
      console.error('Erro ao classificar:', error);
      setCategory('Erro ao classificar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Movimentações Contábeis</h1>
      <div className="mb-4">
        <label className="block mb-2">Descrição da Movimentação:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleClassify}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Classificando...' : 'Classificar'}
      </button>
      {category && (
        <div className="mt-4">
          <strong>Categoria Sugerida:</strong> {category}
        </div>
      )}
    </div>
  );
}

