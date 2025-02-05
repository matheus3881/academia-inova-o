'use client';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Função para buscar usuários da API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/articles', { method: 'GET' });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar o usuário.');
      }

        // Apenas chame `response.json()` se houver um corpo esperado na resposta
        let message = '';
        if (response.status !== 204) { // Assumindo que 204 não retorna corpo
          const data = await response.json();
          message = data.message;
        }

      // Atualize a lista de usuários localmente
      setUsers(users.filter(user => user.id !== id));
      alert(message || 'Usuário deletado com sucesso!');


    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Lista de Usuários</h1>

        <div className="overflow-x-auto text-black" >
          <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nome</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                    >
                      Deletar
                    </button>
                    <a
                      href={`/users/edit?id=${user.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                    >
                      Editar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
