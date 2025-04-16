"use client";

import { useRouter } from "next/navigation";
import { FileText, PieChart, Wallet, MessageSquare, Calculator } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Top bar */}
      <div className="w-full flex items-center gap-2 p-4 bg-white shadow-md">
        <Calculator className="text-blue-600 w-8 h-8" />
        <h1 className="text-2xl font-bold text-gray-800">ContabilizIA</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-800">
            Contabilidade Inteligente para Todos
          </h2>
          <p className="text-lg text-gray-500 mt-4">
            Simplifique sua vida financeira com nossa IA especializada em contabilidade
          </p>
        </div>

        {/* Features + Login */}
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl">
          {/* Features */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-blue-600" />}
              title="Declaração de Imposto"
              description="Automatize sua declaração de imposto de renda"
              onClick={() => router.push("/dashboard")}
            />
            <FeatureCard
              icon={<PieChart className="h-10 w-10 text-green-600" />}
              title="Dashboard Financeiro"
              description="Visualize e gerencie suas finanças"
              onClick={() => router.push("/dashboard")}
            />
            <FeatureCard
              icon={<Wallet className="h-10 w-10 text-purple-600" />}
              title="Upload de Documentos"
              description="Armazene seus documentos com segurança"
              onClick={() => router.push("/dashboard")}
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-indigo-600" />}
              title="Assistente IA"
              description="Tire dúvidas com nosso assistente inteligente"
              onClick={() => router.push("/dashboard")}
            />
          </div>

          {/* Login Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center">
            {/* Top blue part */}
            <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-center">
              <h3 className="text-2xl font-bold text-white">Acesse sua conta</h3>
              <p className="text-white text-sm mt-1">Entre para gerenciar suas finanças</p>
            </div>
            {/* Content */}
            <div className="p-6 w-full flex flex-col items-center">
              <p className="text-gray-600 text-center text-sm mb-6">
                Faça login para acessar todas as funcionalidades do seu assistente de contabilidade.
              </p>
              <button
                onClick={handleLogin}
                className="bg-black hover:brightness-110 text-white font-semibold py-3 px-8 rounded-md transition duration-300 shadow-md w-full max-w-xs"
              >
                Entrar com Google
              </button>
              <p className="text-xs text-gray-400 text-center mt-4">
                Ao fazer login, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Security */}
        <div className="mt-12 text-center text-sm bg-white p-4 rounded-lg shadow-md max-w-3xl">
          <span className="text-blue-600 font-semibold">Segurança em primeiro lugar: </span>
          Seus dados são criptografados e nunca compartilhados com terceiros.
        </div>
      </div>
    </main>
  );
}

// FeatureCard component
function FeatureCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center cursor-pointer hover:scale-105"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </div>
  );
}

