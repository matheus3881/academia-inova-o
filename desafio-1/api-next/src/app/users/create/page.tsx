'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  dateOfBirth: z.coerce.date(),
  age: z.coerce.number().min(18, "Mínimo 18 anos").max(120, "Idade inválida"),
  gender: z.enum(["male", "female", "other"], { message: "Selecione um gênero" }),
  cpf: z.string().length(14, "CPF inválido"), // Formato com pontos e traço
  phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato inválido (xx) xxxxx-xxxx"),
  email: z.string().email("E-mail inválido"),
  nationality: z.string().min(3, "Mínimo 3 caracteres"),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], { message: "Selecione um estado civil" }),
});

type PersonalData = z.infer<typeof schema>;

export default function CreateUser() {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: PersonalData) => {
    // Formatar a data para o formato aceito pelo Prisma (YYYY-MM-DDT00:00:00.000Z)
  // const formattedData = {
  //   ...data,
  //   dateOfBirth: data.dateOfBirth
  //     ? new Date(data.dateOfBirth).toISOString().split("T")[0] + "T00:00:00.000Z"
  //     : null // Se não houver data, mantém null
  // }

    const result = schema.safeParse(data);
    console.log(result.success);
    // console.log(result);
  console.log("teste", data);

    if (!result.success) {
      console.log(result.error);
      return;
    }

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Usuário criado com sucesso!');
        router.push("/formResidential");
      } else {
        alert('Erro ao criar usuário.');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Cadastro Pessoal</h1>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nome</label>
            <input
              type="text"
              {...register("name")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          {/* Data de Nascimento */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Data de Nascimento</label>
            <input
             type="date"
              {...register("dateOfBirth")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
          </div>

          {/* Idade */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Idade</label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
          </div>

          {/* Gênero */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gênero</label>
            <select {...register("gender")} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Selecione</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
            {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
          </div>

          {/* CPF */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">CPF</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              {...register("cpf")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.cpf && <span className="text-red-500 text-sm">{errors.cpf.message}</span>}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Telefone</label>
            <input
              type="text"
              placeholder="(xx) xxxxx-xxxx"
              {...register("phone")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">E-mail</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          {/* Nacionalidade */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nacionalidade</label>
            <input
              type="text"
              {...register("nationality")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            {errors.nationality && <span className="text-red-500 text-sm">{errors.nationality.message}</span>}
          </div>

          {/* Estado Civil */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Estado Civil</label>
            <select {...register("maritalStatus")} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Selecione</option>
              <option value="single">Solteiro(a)</option>
              <option value="married">Casado(a)</option>
              <option value="divorced">Divorciado(a)</option>
              <option value="widowed">Viúvo(a)</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          Enviar
        </button>
      </form>
    </div>
  );
}
