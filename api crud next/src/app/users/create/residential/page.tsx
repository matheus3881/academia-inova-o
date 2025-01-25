'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResidentialData() {
  const [formData, setFormData] = useState({
    address: "",
    street: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const router = useRouter();

  useEffect(() => {
    // Verificar se o personalId está disponível no localStorage
    const personalId = localStorage.getItem("personalId");
    if (!personalId) {
      alert("Por favor, complete os dados pessoais primeiro.");
      router.push("create");
    }
  },);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Obter o personalId do localStorage
    const personalId = parseInt(localStorage.getItem("personalId")|| '');

    // Enviar dados para o backend junto com o personalId
    const response = await fetch("http://localhost:4000/residential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, personalId }),
    });

    if (response.ok) {
      // Redirecionar para a próxima página (por exemplo, emergência)
      router.push('academic');
    } else {
      console.error("Erro ao salvar os dados residenciais");
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
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Dados Residenciais</h1>
  
        {/* Seção de inputs com espaçamento entre os grupos */}
        <div className="space-y-4">
          {/* Grupo: Endereço */}
          <div>
            <label htmlFor="address" className="block text-gray-700  font-semibold mb-2">
              Endereço
            </label>
            <input
              id="address"
              name="address"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
  
          {/* Grupo: Rua */}
          <div>
            <label htmlFor="street" className="block text-gray-700  font-semibold mb-2">
              Rua
            </label>
            <input
              id="street"
              name="street"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
  
          {/* Grupo: Complemento */}
          <div>
            <label htmlFor="complement" className="block text-gray-700 font-semibold mb-2">
              Complemento
            </label>
            <input
              id="complement"
              name="complement"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
  
          {/* Grupo: Bairro */}
          <div>
            <label htmlFor="neighborhood" className="block text-gray-700 font-semibold mb-2">
              Bairro
            </label>
            <input
              id="neighborhood"
              name="neighborhood"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
  
          {/* Grupo: Cidade */}
          <div>
            <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
              Cidade
            </label>
            <input
              id="city"
              name="city"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
  
          {/* Grupo: Estado */}
          <div>
            <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">
              Estado
            </label>
            <input
              id="state"
              name="state"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
  
          {/* Grupo: CEP */}
          <div>
            <label htmlFor="postalCode" className="block text-gray-700 font-semibold mb-2">
              CEP
            </label>
            <input
              id="postalCode"
              name="postalCode"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
  
          {/* Grupo: País */}
          <div>
            <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">
              País
            </label>
            <input
              id="country"
              name="country"
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