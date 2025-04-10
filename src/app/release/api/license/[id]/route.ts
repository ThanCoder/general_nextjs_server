import prisma from "@/lib/prisma";
import { getRepositoryRawUrl } from "@/utils/app_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if (!id) {
      return new NextResponse('not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    const res = await prisma.release.findUnique({ where: { id } })
    if (res == null) {
      return new NextResponse('not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      })
    }


    const readmeUrl = getRepositoryRawUrl(res.repository, 'LICENSE')

    //read url
    const text = await (await fetch(readmeUrl)).text()

    // return NextResponse.json({ result: readmeUrl });
    return new NextResponse(text, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })

  } catch (error) {
    return new NextResponse(`${error}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    })

  }

}