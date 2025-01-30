import Image from "next/image";

import Link from 'next/link';

export default function Home() {
  return (

    <div className="p-4">
      <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
      <div className="mt-4">
        <Link href="users/read">
          Ver Usuários
        </Link>
        <Link href="/users/create">
          Criar Usuário
        </Link>
      </div>
    </div>
  );
}


