'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
	name: z.string().min(1, "O campo nome é obrigatório"),
	email: z.string().email("Formato de email inválido"),
});

type FormData = z.infer<typeof schema>;

export default function MyForm() {
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormData) => {
		// console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}
        className="text-black"
        >
			<input {...register("name")}
            className="border rounded p-2 w-full"
            placeholder="nome"
            />
			{errors.name && <span className="text-red-500">{errors.name.message}</span>}
		
			<input {...register("email")}
            className="border rounded p-2 w-full"
            placeholder="email"
            />
			{errors.email && <span className="text-red-500">{errors.email.message}</span>}
			
			<button type="submit"
            className="text-yellow-50"
            >Enviar</button>
		</form>
	);
}