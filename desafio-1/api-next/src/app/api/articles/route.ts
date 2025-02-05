// import { } from './../../../../node_modules/.prisma/client/index.d';
import { personalData } from "@prisma/client";
import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
 
  //  esta variavel newDadosPessoais é um objeto que vai receber os dados do body da requisição
  const newDadosPessoais: personalData = await req.json();
  console.log("Dados recebidos:", req.body);
  const createdArticle = await client.personalData.create({
    data: newDadosPessoais,
    

  }
);

console.log("Usuário criado:", createdArticle); // Log do usuário criado

  return new NextResponse(JSON.stringify(createdArticle), {
    status: 201,
    statusText: "Created",
  });
}






export async function GET(req: Request) {
  const dadosPessoais: personalData[] = await client.personalData.findMany();
  return new NextResponse(JSON.stringify(dadosPessoais), {
    status: 200,
    statusText: "OK",
  });
}
