import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold text-blue-600">ContabilizIA</h1>
          <div className="flex gap-4">
            <button className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">PT</button>
            <button className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">EN</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="flex flex-col items-center justify-center flex-grow text-center p-6">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Contabilidade Inteligente para Todos
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Simplifique sua vida financeira com nossa IA especializada em contabilidade.
        </p>
        <Link href="/chatbot">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-md transition">
            Vamos lá!
          </button>
        </Link>
      </main>

      {/* FOOTER */}
      <footer className="bg-white text-gray-400 text-center py-6 mt-10 text-sm">
        © 2025 ContabilizIA - Todos os direitos reservados
      </footer>
    </div>
  );
}

