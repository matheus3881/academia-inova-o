// import { } from './../../../../node_modules/.prisma/client/index.d';
import { Article, Prisma, dadosPessoais } from "@prisma/client";
import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  //  esta variavel newDadosPessoais é um objeto que vai receber os dados do body da requisição
  const newDadosPessoais: dadosPessoais = await req.json();
  const createdArticle = await client.dadosPessoais.create({
    data: newDadosPessoais,

  });



  return new NextResponse(JSON.stringify(createdArticle), {
    status: 201,
    statusText: "Created",
  });
}




export async function GET(req: Request) {
  const dadosPessoais: dadosPessoais[] = await client.dadosPessoais.findMany();
  return new NextResponse(JSON.stringify(dadosPessoais), {
    status: 200,
    statusText: "OK",
  });
}
