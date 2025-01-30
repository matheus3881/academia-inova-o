'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { date, string, z, ZodDate } from 'zod';

const validSchema = z.object({
  name:
    z.string().min(2, "minimo 2 caracteres"),
  dateOfBirth: z.date(),
  age: z.number().min(18, "Minimo 18 anos").max(120, "ta morto ja"),
  gender: z.enum(["male", "female", "other"]),
  cpf: z.string().refine((cpf) => cpf.replace(/\D/g, '').length === 11, { message: "CPF deve ter 11 digitos", }),
  phone: z.string().min(15, "xx (xx)-xxxxx-xxxx"),
  email: z.string().email("deve conter @ e .com"),
  nationality: z.string().min(3, "minimo 3 caracteres"),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"])

});

type PersonalData = z.infer<typeof validSchema>;

export default function CreateUser() {
  // dadosPessoais
  const [personalData, setPersonalData] = useState<PersonalData>({
    name: "",
    dateOfBirth: new Date(),
    age: 0,
    gender: "other",
    cpf: "",
    phone: "",
    email: "",
    nationality: "",
    maritalStatus: "single"

  })

  const route = useRouter();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = validSchema.safeParse(personalData);

    if (!result.success) {
      const errorMessages: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
      setErrors(errorMessages);
      return;
    }

    setErrors({}); //se passou na validação, limpar os erros
    console.log("Dados validados com sucesso!", personalData);


    try {
      const response = await fetch('http://localhost:4000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalData),
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: name === "dateOfBirth" ? new Date(value) :
        name === "age" ? Number(value) : value, // Converte para número
    }))
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Criar Novo Usuário</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Campo Nome */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nome</label>
            <input
              type="text"
              name="name"
              value={personalData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Data de Nascimento */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Data de Nascimento</label>
            <input
              type="date"
              name="dateOfBirth"
              value={personalData.dateOfBirth.toISOString().split('T')[0]}
              onChange={handleChange}

              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>

          {/* Idade */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Idade</label>
            <input
              type="number"
              name="age"
              value={personalData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Gênero */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Gênero</label>
            <select
              name="gender"
              value={personalData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* CPF */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">CPF</label>
            <input
              type="text"
              name="cpf"
              value={personalData.cpf}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
            <input
              type="text"
              name="phone"
              value={personalData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              value={personalData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Nacionalidade */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nacionalidade</label>
            <input
              type="text"
              name="nationality"
              value={personalData.nationality}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
          </div>

          {/* Estado Civil */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Estado Civil</label>
            <select
              name="maritalStatus"
              value={personalData.maritalStatus}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            >
              <option value="single">Solteiro(a)</option>
              <option value="married">Casado(a)</option>
              <option value="divorced">Divorciado(a)</option>
              <option value="widowed">Viúvo(a)</option>
            </select>
            {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}
          </div>

          {/* Botão de Envio */}
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
function calculateAge(dateOfBirth: Date): number {
  throw new Error('Function not implemented.');
}

