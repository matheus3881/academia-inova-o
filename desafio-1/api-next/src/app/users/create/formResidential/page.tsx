'use client';
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";


const schema = z.object({
    address: z.string().min(1, "Digite um endereço válido"),
    street: z.string().min(1, "Digite uma rua válida"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Digite um bairro válido"),
    city: z.string().min(1, "Digite uma cidade válida"),
    state: z.string().min(1, "Digite um estado válido"),
    postalCode: z.string().max(9)
    .regex(/^\d{5}-\d{3}$/, "Digite um CEP válido no formato XXXXX-XXX"), //ver mais sobre o transform para usa-lo aqui. Quero inserir o traço automaticamente enquanto se está digitando
    country: z.string().min(1, "Digite um país válido"),

});

type FormData = z.infer<typeof schema>;


export default function MyForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        
    });

    const router = useRouter();

    
    // melhorar isso dps
    const onSubmit = async (data: FormData) => {
      const result = schema.safeParse(data);
      console.log(result.success);
  
      if (!result.success) {
        console.log(result.error);
        return;
      }
  
      try {
        const response = await fetch('/api/residential', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({data}),
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
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md"
          >
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Dados Residenciais</h1>
      
            <div className="space-y-4">
              {/* address */}
              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
                  Endereço
                </label>
                <input 
                  {...register("address")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
              </div>
      
              {/* street */}
              <div>
                <label htmlFor="street" className="block text-gray-700 font-medium mb-1">
                  Rua
                </label>
                <input 
                  {...register("street")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
                {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
              </div>
      
              {/* complement */}
              <div>
                <label htmlFor="complement" className="block text-gray-700 font-medium mb-1">
                  Complemento
                </label>
                <input 
                  {...register("complement")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
                {errors.complement && <span className="text-red-500 text-sm">{errors.complement.message}</span>}
              </div>
      
              {/* neighborhood */}
              <div>
                <label htmlFor="neighborhood" className="block text-gray-700 font-medium mb-1">
                  Bairro
                </label>
                <input 
                  {...register("neighborhood")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
                {errors.neighborhood && <span className="text-red-500 text-sm">{errors.neighborhood.message}</span>}
              </div>
      
              {/* city */}
              <div>
                <label htmlFor="city" className="block text-gray-700 font-medium mb-1">
                  Cidade
                </label>
                <input 
                  {...register("city")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
              </div>
      
              {/* state */}
              <div>
                <label htmlFor="state" className="block text-gray-700 font-medium mb-1">
                  Estado
                </label>
                <input 
                  {...register("state")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
                {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
              </div>
      
              {/* postalCode */}
              <div>
                <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-1">
                  CEP
                </label>
                <input 
                type="text"
                  {...register("postalCode")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
                {errors.postalCode && <span className="text-red-500 text-sm">{errors.postalCode.message}</span>}
              </div>
      
              {/* country */}
              <div>
                <label htmlFor="country" className="block text-gray-700 font-medium mb-1">
                  País
                </label>
                <input 
                  {...register("country")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
                {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
              </div>
            </div>
      
            {/* Submit button */}
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