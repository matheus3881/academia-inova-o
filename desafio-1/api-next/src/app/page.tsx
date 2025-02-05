import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Gerenciamento de Usuários</h1>

        <div className="space-y-4">
          <Link
            href="/users/read"
            className="block w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Ver Usuários
          </Link>

          <Link
            href="/users/create"
            className="block w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Criar Usuário
          </Link>
        </div>
      </div>
    </div>
  );
}
