'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Olá! Como posso ajudar você hoje com suas dúvidas ou necessidades contábeis e financeiras?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const response = await axios.post('/api/gpt-4', {
        message: input,
      });

      const botMessage = { role: 'assistant', content: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erro:', error);
      const botMessage = { role: 'assistant', content: 'Desculpe, ocorreu um erro ao processar sua mensagem.' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          ContabilizIA Chatbot <span className="inline-block">🤖</span>
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-white p-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Enviar
        </button>
      </footer>
    </div>
  );
}

