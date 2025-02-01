import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";


const schema = z.object({
    name: z.string().min(2, "Digite um nome válido"),
    relationShip: z.string().min(2, "relação"),
    phone: z.string().regex(/^\+\d{2} \(\d{2}\)\d{5}-\d{4}$/, "Formato: +xx (xx)xxxxx-xxxx"),
    email: z.string().email(),
});

export type formEmergency = z.infer<typeof schema>;

export default function FormEmergency() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<formEmergency>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: formEmergency) => {
        const result = schema.safeParse(schema)

        if (!result.success) {
            console.log(result.error);
            return;
        }
            try {
                const response = await fetch('/api/emergency', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Usuário criado com sucesso!');
                    router.push("formEmergency");
                } else {
                    alert('Erro ao criar usuário.');
                }

            } catch (error) {
                console.error('Erro ao criar usuário:', error);
            }
        
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md"
            >
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Dados Emergênciais</h1>

                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Nome
                        </label>
                        <input
                            {...register("name")}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Relation Ship */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Relação
                        </label>
                        <input
                            {...register("relationShip")}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                        />
                        {errors.relationShip && <span className="text-red-500 text-sm">{errors.relationShip.message}</span>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Celular
                        </label>
                        <input
                            type="string"
                            {...register("phone", { valueAsNumber: true })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                        />
                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { valueAsNumber: true })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>



                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );



}