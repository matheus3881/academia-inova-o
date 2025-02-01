import { emergency } from "@prisma/client";
import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  //  esta variavel newDadosPessoais é um objeto que vai receber os dados do body da requisição
  const newEmergency: emergency = await req.json();
  const createEmergency = await client.emergency.create({
    data: newEmergency,

  });



  return new NextResponse(JSON.stringify(createEmergency), {
    status: 201,
    statusText: "Created",
  });
}




export async function GET(req: Request) {
  const emergencyData: emergency[] = await client.emergency.findMany();
  return new NextResponse(JSON.stringify(emergencyData), {
    status: 200,
    statusText: "OK",
  });
}
