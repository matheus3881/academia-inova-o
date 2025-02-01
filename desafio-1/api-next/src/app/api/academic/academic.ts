
import { academicData } from "@prisma/client";
import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  //  esta variavel newDadosPessoais é um objeto que vai receber os dados do body da requisição
  const newAcademicData: academicData = await req.json();
  const createdAcademicData= await client.academicData.create({
    data: newAcademicData,

  });



  return new NextResponse(JSON.stringify(createdAcademicData), {
    status: 201,
    statusText: "Created",
  });
}






export async function GET(req: Request) {
  const academicData: academicData[] = await client.academicData.findMany();
  return new NextResponse(JSON.stringify(academicData), {
    status: 200,
    statusText: "OK",
  });
}
