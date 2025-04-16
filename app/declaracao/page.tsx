"use client";

import { useRouter } from "next/navigation";
import { FilePlus, FileText } from "lucide-react";

export default function DeclaracaoPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      {/* Título da seção */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Declaração de Imposto de Renda</h1>
      <p className="text-gray-500 mb-10">
        Gerencie suas declarações de imposto de renda com segurança e praticidade.
      </p>

      {/* Área dos cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Nova Declaração */}
        <div
          onClick={() => router.push("/declaracao/nova")}
          className="cursor-pointer bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center"
        >
          <FilePlus className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nova Declaração</h2>
          <p className="text-center text-sm opacity-90">Inicie uma nova declaração para este ano.</p>
        </div>

        {/* Continuar Declaração */}
        <div
          onClick={() => router.push("/declaracao/continuar")}
          className="cursor-pointer bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center border border-gray-200"
        >
          <FileText className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Continuar Declaração</h2>
          <p className="text-center text-sm text-gray-500">Continue uma declaração que você já começou.</p>
        </div>

      </div>
    </div>
  );
}

