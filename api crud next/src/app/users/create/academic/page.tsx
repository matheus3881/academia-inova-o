'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AcademicData() {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    course: "",
    yearOfEntry: 0,
    currentSemester: 0,
    academicStatus: "",
    gpa: 0.0,
    educationMode: "",
  });

  const router = useRouter();

  useEffect(() => {
    // Verificar se o personalId está disponível no localStorage
    const personalId = localStorage.getItem("personalId");
    if (!personalId) {
      alert("Por favor, complete os dados pessoais primeiro.");
      router.push("create/emergency");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Obter o personalId do localStorage
    const personalId = parseInt(localStorage.getItem("personalId") || '');

    // Enviar dados para o backend junto com o personalId
    const response = await fetch("http://localhost:4000/academic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, personalId }),
    });

    if (response.ok) {
      // Redirecionar para a próxima página (por exemplo, emergência)
      router.push('create/nextStep'); // Substitua para o próximo passo do fluxo
    } else {
      console.error("Erro ao salvar os dados acadêmicos");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    // Contêiner principal para centralizar o formulário na tela
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Formulário principal com estilo para fundo branco, bordas arredondadas e sombra */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md"
      >
        {/* Título do formulário */}
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Dados Acadêmicos</h1>

        {/* Seção de inputs com espaçamento entre os grupos */}
        <div className="space-y-4">
          {/* Grupo: Registration Number */}
          <div>
            <label htmlFor="registrationNumber" className="block text-gray-700 font-semibold mb-2">
              Número de Matrícula
            </label>
            <input
              id="registrationNumber"
              name="registrationNumber"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>

          {/* Grupo: Course */}
          <div>
            <label htmlFor="course" className="block text-gray-700 font-semibold mb-2">
              Curso
            </label>
            <input
              id="course"
              name="course"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>

          {/* Grupo: Year of Entry */}
          <div>
            <label htmlFor="yearOfEntry" className="block text-gray-700 font-semibold mb-2">
              Ano de Ingresso
            </label>
            <input
              type="number"
              id="yearOfEntry"
              name="yearOfEntry"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>

          {/* Grupo: Current Semester */}
          <div>
            <label htmlFor="currentSemester" className="block text-gray-700 font-semibold mb-2">
              Semestre Atual
            </label>
            <input
              type="number"
              id="currentSemester"
              name="currentSemester"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>

          {/* Grupo: Academic Status */}
          <div>
            <label htmlFor="academicStatus" className="block text-gray-700 font-semibold mb-2">
              Status Acadêmico
            </label>
            <input
              id="academicStatus"
              name="academicStatus"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>

          {/* Grupo: GPA */}
          <div>
            <label htmlFor="gpa" className="block text-gray-700 font-semibold mb-2">
              Média (GPA)
            </label>
            <input
              type="number"
              id="gpa"
              name="gpa"
              step="0.1"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>

          {/* Grupo: Education Mode */}
          <div>
            <label htmlFor="educationMode" className="block text-gray-700 font-semibold mb-2">
              Modalidade de Ensino
            </label>
            <input
              id="educationMode"
              name="educationMode"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
        </div>

        {/* Botão para envio do formulário */}
        <button
          type="submit"
          className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Próximo
        </button>
      </form>
    </div>
  );
}
