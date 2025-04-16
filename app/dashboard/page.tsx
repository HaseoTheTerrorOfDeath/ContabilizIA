import { LayoutDashboard, Upload, Bot } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Bem-vindo ao ContabilizIA</h1>
      <p className="text-gray-500 mb-8">
        Gestão financeira simplificada e inteligente para seu escritório contábil
      </p>

      <div className="flex gap-6">
        <Link href="/dashboard">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer w-48">
            <LayoutDashboard className="h-10 w-10 mx-auto text-blue-500" />
            <p className="mt-4 font-semibold">Dashboard</p>
          </div>
        </Link>
        <Link href="/upload">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer w-48">
            <Upload className="h-10 w-10 mx-auto text-green-500" />
            <p className="mt-4 font-semibold">Upload de Documentos</p>
          </div>
        </Link>
        <Link href="/chatbot">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer w-48">
            <Bot className="h-10 w-10 mx-auto text-purple-500" />
            <p className="mt-4 font-semibold">Assistente IA</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

