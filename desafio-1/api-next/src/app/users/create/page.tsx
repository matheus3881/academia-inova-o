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
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dateOfBirth, age, gender, cpf, phone, email, nationality, maritalStatus }),
      });

      
      if (response.ok) {
        alert('Usuário criado com sucesso!');
        setName('');
        setEmail('');
        setPhone('');
        setCpf('');
        setAge(0);
        setDateOfBirth(null);
        route.push('read');
      } else {
        alert('Erro ao criar usuário.');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
    
   
  };



  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Usuário</h1>
      <form onSubmit={handleSubmit}>
        {/* name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 w-full text-black"
            required
          />
        </div>

        {/* dateOfBirth */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">date of birth</label>
          <input
            type="date"
            value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
            onChange={(e) => setDateOfBirth(new Date(e.target.value))}
            className="border border-gray-300 p-2 w-full text-black"
            required
          />
        </div>

        {/* age */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border border-gray-300 p-2 w-full text-black"
            required
          />
        </div>

        {/*gender */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
            className="border border-gray-300 p-2 w-full text-black"
            required
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>

        {/* cpf */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">cpf</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="border border-gray-300 p-2 w-full text-black"
            required
          />
        </div>

        {/* phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 p-2 w-full text-black"
            required
          />
        </div>


        {/* email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 w-full text-black"
            required
          />
        </div>

        {/*nationality */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">nationality</label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="border border-gray-300 p-2 w-full text-black"
            required
          />
        </div>

        {/* maritalStatus */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">maritalStatus</label>
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value as 'single' | 'married' | 'divorced' | 'widowed')}
            className="border border-gray-300 p-2 w-full text-black"
            required
          >
            <option value="single">single</option>
            <option value="married">married</option>
            <option value="divorced">divorced</option>
            <option value="widowed">widowed</option>
          </select>
        </div>



        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Criar Usuário
        </button>
      </form>
    </div>
  );
}
