'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface User {
  id: number;
  cpf: string;
  name: string;
  email: string;
}

export default function EditUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id'); // Obtém o ID do usuário pela query string

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');

  // Busca os dados do usuário para pré-preencher os campos
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/articles/${userId}`, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Erro ao buscar usuário.');
          }
          const data = await response.json();
          setUser(data);
          setName(data.name);
          setEmail(data.email);
          setCpf(data.cpf);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  // Função para atualizar os dados
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/articles/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, cpf }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar usuário.');
      }

      alert('Usuário atualizado com sucesso!');
      router.push('read'); // Redireciona para a lista de usuários
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar o usuário.');
    }
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Editar Usuário</h1>

        <form onSubmit={handleUpdateUser} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">CPF:</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
