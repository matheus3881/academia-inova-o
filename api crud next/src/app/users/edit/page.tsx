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
      router.push('/users/list'); // Redireciona para a lista de usuários
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar o usuário.');
    }
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Usuário</h1>
      <form onSubmit={handleUpdateUser}>
        <div className="mb-4">
          <label className="block text-gray-700">Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
          
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
