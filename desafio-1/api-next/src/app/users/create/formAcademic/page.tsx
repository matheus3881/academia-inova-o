import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";


const schema = z.object({
  registrationNumber: z.string(),
  course: z.string().min(2, "digit um curso válido"),
  yearOfEntry: z.number().int().min(1990, "Ano de entrada inválido").max(new Date().getFullYear(), "Ano de entrada não pode ser no futuro"),
  currentSemester: z.number(),
  academicStatus: z.string(),
  gpa: z.number().optional(),
  educationMode: z.string(),
  });

  type FormAcademic = z.infer<typeof schema>;


  export default function FormAcademic() {

    const router = useRouter();

    const {
      register,
      handleSubmit,
      formState: {errors}
    } = useForm<FormAcademic>({
      resolver: zodResolver(schema),
    });


    const onSubmit = async (data: FormAcademic) => {
      const result = schema.safeParse(data)      
        console.log(result);
     
        if(!result.success) {
          console.log(result.error);
          return;
        }

          try{
            const response = await fetch('/api/academic', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });

            if(response.ok)  {
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
          <h1 className="text-2xl font-bold text-gray-700 mb-6">Dados Acadêmicos</h1>
  
          <div className="space-y-4">
            {/* Registration Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Número de Matrícula
              </label>
              <input
                {...register("registrationNumber")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
              {errors.registrationNumber && (
                <span className="text-red-500 text-sm">{errors.registrationNumber.message}</span>
              )}
            </div>
  
            {/* Course */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Curso
              </label>
              <input
                {...register("course")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
              {errors.course && <span className="text-red-500 text-sm">{errors.course.message}</span>}
            </div>
  
            {/* Year of Entry */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ano de Entrada
              </label>
              <input
                type="number"
                {...register("yearOfEntry", { valueAsNumber: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
              {errors.yearOfEntry && <span className="text-red-500 text-sm">{errors.yearOfEntry.message}</span>}
            </div>
  
            {/* Current Semester */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Semestre Atual
              </label>
              <input
                type="number"
                {...register("currentSemester", { valueAsNumber: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
              {errors.currentSemester && <span className="text-red-500 text-sm">{errors.currentSemester.message}</span>}
            </div>
  
            {/* Academic Status */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Status Acadêmico
              </label>
              <input
                {...register("academicStatus")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
              {errors.academicStatus && <span className="text-red-500 text-sm">{errors.academicStatus.message}</span>}
            </div>
  
            {/* GPA */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nota Média (GPA)
              </label>
              <input
                type="number"
                {...register("gpa", { valueAsNumber: true })}
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
              {errors.gpa && <span className="text-red-500 text-sm">{errors.gpa.message}</span>}
            </div>
  
            {/* Education Mode */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Modo de Ensino
              </label>
              <input
                {...register("educationMode")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
              {errors.educationMode && <span className="text-red-500 text-sm">{errors.educationMode.message}</span>}
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