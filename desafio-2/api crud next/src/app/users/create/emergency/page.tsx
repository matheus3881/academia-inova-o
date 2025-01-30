'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EmergencyData() {
    const [formData, setFormData] = useState({
        name: "",
        relationship: "",
        phone: "",
        email: "",
    });
    
    const router = useRouter();

    useEffect(() => {
        
        const personalId = localStorage.getItem("personalId");
        if(!personalId) {
            alert("Por favor, complete os dados pessoais primeiro.");
        }

    });

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const personalId = parseInt(localStorage.getItem("personalId") || "");

        const response = await fetch("http://localhost:4000/emergency", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({...formData,personalId}), 
        });

        if(response.ok) {
            router.push('../../')
        } else {
            console.error("Erro ao salvar os dados Emergenciais");
        }
    };

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md"
          >
            <h1 className="text-2xl font-bold mb-6 text-gray-700">Dados Emergenciais</h1>
            
            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
              </div>
    
              {/* Parentesco */}
              <div>
                <label htmlFor="relationship" className="block text-gray-700 mb-2">
                  Parentesco
                </label>
                <input
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
              </div>
    
              {/* Telefone */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
              </div>
    
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
              </div>
            </div>
    
            <button
              type="submit"
              className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Enviar
            </button>
          </form>
        </div>
      );



}