import client from "@/lib/prisma/client";
import { residentialData } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse, NextRequest } from "next/server";

type FindById = {
	id: string;
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
  
	try {
	  const user = await client.residentialData.findUnique({
		where: { id: parseInt(id) },
	  });
  
	  if (!user) {
		return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
	  }
  
	  return NextResponse.json(user);
	} catch (error) {
	  return NextResponse.json({ message: 'Erro ao buscar usuário.' }, { status: 500 });
	}
  }



export async function PATCH(request: NextRequest, context: { params: FindById }) {
	// const newArticleData: Article = await request.json();
	const newResidentialData: residentialData = await request.json();

	try {
		const updatedResidentialData: residentialData = await client.residentialData.update({
			where: {
				id: Number(context.params.id),
			},
			data: newResidentialData,
		});

		return new NextResponse(JSON.stringify(updatedResidentialData), {
			status: 200,
			statusText: 'OK',
		});
	} catch (error) {
		const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

		return new NextResponse(JSON.stringify({ message: msgError }), {
			status: 404,
			statusText: 'Not Found',
		});
	}
}


export async function DELETE(
	request: NextRequest,
	context: { params: FindById }
) {
	try {
		await client.residentialData.delete({
			where: {
				id: Number(context.params.id),
			},
		});

		return new NextResponse(JSON.stringify({ message: 'Usuário deletado com sucesso!' }), {
			status: 200,
			statusText: 'OK',
		});
	} catch (error) {
		const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

		return new NextResponse(JSON.stringify({ message: msgError }), {
			status: 404,
			statusText: 'Not Found',
		});
	}
}


