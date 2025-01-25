'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface User {
  id: number;
  cpf: string;
  name: string;
  email: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  nationality: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
}

export default function EditUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id'); // Obtém o ID do usuário pela query string

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married' | 'divorced' | 'widowed'>('single');

  // Busca os dados do usuário para pré-preencher os campos
  useEffect(() => {
    if (userId) {
      console.log('ID do usuário:', userId);  // Verifique o id aqui
      const userIdNumber = Number(userId); // Converte para número
      if (!isNaN(userIdNumber)) {
        const fetchUser = async (id: number) => {
          try {
            const response = await fetch(`http://localhost:4000/user/${id}`, { method: 'GET' });
            if (!response.ok) {
              throw new Error('Erro ao buscar usuário.');
            }
            const data = await response.json();
            setUser(data);
            setName(data.name);
            setEmail(data.email);
            setCpf(data.cpf);
            setDateOfBirth(new Date(data.dateOfBirth));
            setAge(data.age);
            setGender(data.gender);
            setPhone(data.phone);
            setNationality(data.nationality);
            setMaritalStatus(data.maritalStatus);
          } catch (error) {
            console.error(error);
          }
        };

        fetchUser(userIdNumber); // Passa o id convertido para número
      } else {
        console.error('ID inválido');
      }
    }
  }, [userId]);

  // Função para atualizar os dados
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      try {
        const response = await fetch(`http://localhost:4000/user/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            cpf,
            dateOfBirth,
            age,
            gender,
            phone,
            nationality,
            maritalStatus
          }), // Envia todos os campos para atualização
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
    }
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Editar Usuário</h1>

        <form onSubmit={handleUpdateUser}>
          {/* Campo de Nome */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Campo de Email */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Campo de CPF */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">CPF:</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Campo de Data de Nascimento */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Data de Nascimento:</label>
            <input
              type="date"
              value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
              onChange={(e) => setDateOfBirth(new Date(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Campo de Idade */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Idade:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Campo de Gênero */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Gênero:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          </div>

          {/* Campo de Telefone */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Telefone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Campo de Nacionalidade */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Nacionalidade:</label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Campo de Estado Civil */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Estado Civil:</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value as 'single' | 'married' | 'divorced' | 'widowed')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="single">Solteiro</option>
              <option value="married">Casado</option>
              <option value="divorced">Divorciado</option>
              <option value="widowed">Viúvo</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
