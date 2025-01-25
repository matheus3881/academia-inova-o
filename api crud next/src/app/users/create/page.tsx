'use client';

import { redirect, useRouter } from 'next/navigation'
import { title } from 'process';
import { useState } from 'react';



export default function CreateUser() {
  // dadosPessoais
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married' | 'divorced' | 'widowed'>('single');

  const route = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dateOfBirth, age, gender, cpf, phone, email, nationality, maritalStatus }),
      });

      
      if (response.ok) {
        alert('Usuário criado com sucesso!');
        const data = await response.json(); // data = { id: 1 }
        localStorage.setItem('personalId', data.id); // Salva o ID no localStorage
        route.push('create/residential')
      } else {
        alert('Erro ao criar usuário.');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
    
   
  };



  return (
    // Contêiner principal para centralizar o formulário na tela
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Caixa do formulário com fundo branco, bordas arredondadas e sombra */}
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md">
        {/* Título do formulário */}
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Criar Novo Usuário</h1>
        {/* Início do formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo para o nome */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Campo para a data de nascimento */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Data de Nascimento</label>
            <input
              type="date"
              value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
              onChange={(e) => setDateOfBirth(new Date(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Campo para a idade */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Idade</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Campo para o gênero */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Gênero</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          </div>
  
          {/* Campo para o CPF */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Campo para o telefone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Campo para o e-mail */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Campo para a nacionalidade */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nacionalidade</label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Campo para o estado civil */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Estado Civil</label>
            <select
              value={maritalStatus}
              onChange={(e) =>
                setMaritalStatus(e.target.value as 'single' | 'married' | 'divorced' | 'widowed')
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            >
              <option value="single">Solteiro(a)</option>
              <option value="married">Casado(a)</option>
              <option value="divorced">Divorciado(a)</option>
              <option value="widowed">Viúvo(a)</option>
            </select>
          </div>
  
          {/* Botão de envio do formulário */}
          <button
            type="submit"
            className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Criar Usuário
          </button>
        </form>
      </div>
    </div>
  );
  
  
}
