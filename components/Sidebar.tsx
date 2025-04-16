import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-6">
      <div>
        <h2 className="text-xl font-bold mb-6">ContabilizIA</h2>

        <nav className="space-y-6">
          {/* Contabilidade Geral */}
          <div>
            <p className="text-sm font-semibold uppercase text-gray-400 mb-2">
              Contabilidade Geral
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/contabilidade/movimentacoes">
                  <span className="cursor-pointer block hover:text-blue-400">Movimentações</span>
                </Link>
              </li>
              <li>
                <Link href="/contabilidade/balanco">
                  <span className="cursor-pointer block hover:text-blue-400">Balanço Patrimonial</span>
                </Link>
              </li>
              <li>
                <Link href="/contabilidade/dre">
                  <span className="cursor-pointer block hover:text-blue-400">DRE / DMPL / DFC</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Fiscal e Tributária */}
          <div>
            <p className="text-sm font-semibold uppercase text-gray-400 mb-2">
              Fiscal & Tributária
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/fiscal/apuracao">
                  <span className="cursor-pointer block hover:text-blue-400">Apuração Fiscal</span>
                </Link>
              </li>
              <li>
                <Link href="/fiscal/regime">
                  <span className="cursor-pointer block hover:text-blue-400">Resumo Tributário</span>
                </Link>
              </li>
              <li>
                <Link href="/fiscal/guias">
                  <span className="cursor-pointer block hover:text-blue-400">Guias e Vencimentos</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Departamento Pessoal */}
          <div>
            <p className="text-sm font-semibold uppercase text-gray-400 mb-2">
              Departamento Pessoal
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/pessoal/folha">
                  <span className="cursor-pointer block hover:text-blue-400">Folha de Pagamento</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Abertura / Encerramento */}
          <div>
            <p className="text-sm font-semibold uppercase text-gray-400 mb-2">
              Abertura / Encerramento
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/empresa/gestao">
                  <span className="cursor-pointer block hover:text-blue-400">Gestão de Empresas</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Consultoria */}
          <div>
            <p className="text-sm font-semibold uppercase text-gray-400 mb-2">
              Consultoria
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/consultoria/financeira">
                  <span className="cursor-pointer block hover:text-blue-400">Financeira</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <p className="text-sm font-semibold uppercase text-gray-400 mb-2">
              Compliance
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/compliance/fiscal">
                  <span className="cursor-pointer block hover:text-blue-400">Fiscal & Certidões</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="text-xs text-gray-500 text-center">
        © 2025 ContabilizIA
      </div>
    </aside>
  );
};

export default Sidebar;

