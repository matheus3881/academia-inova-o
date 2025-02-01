
import { residentialData } from "@prisma/client";
import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const newResidentialData: residentialData = await req.json();
  const createResidentialData = await client.residentialData.create({
    data: newResidentialData,

  });



  return new NextResponse(JSON.stringify(createResidentialData), {
    status: 201,
    statusText: "Created",
  });
}






export async function GET(req: Request) {
  const residentialData: residentialData[] = await client.residentialData.findMany();
  return new NextResponse(JSON.stringify(residentialData), {
    status: 200,
    statusText: "OK",
  });
}
