import client from "@/lib/prisma/client";
import { personalData } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse, NextRequest } from "next/server";

type FindById = {
	id: string;
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
  
	try {
	  const user = await client.personalData.findUnique({
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
	const newDadosPessoais: personalData = await request.json();

	try {
		const updatedDadosPessoas: personalData = await client.personalData.update({
			where: {
				id: Number(context.params.id),
			},
			data: newDadosPessoais,
		});

		return new NextResponse(JSON.stringify(updatedDadosPessoas), {
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
		await client.personalData.delete({
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


