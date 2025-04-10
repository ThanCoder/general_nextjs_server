import prisma from "@/lib/prisma";
import { getRepositoryRawUrl } from "@/utils/app_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if (!id) return NextResponse.json({ res: 'not found' }, { status: 404 });
    
    const res = await prisma.release.findUnique({ where: { id } })
    if (res == null) return NextResponse.json({ res: 'not found' }, { status: 404 });

    const readmeUrl = getRepositoryRawUrl(res.repository,'README.md')

    //read url
    const text = await (await fetch(readmeUrl)).text()

    // return NextResponse.json({ result: readmeUrl });
    return new NextResponse(text,{
      headers:{'Content-Type':'text/plain'}
    })

  } catch (error) {
    return NextResponse.json({ res: `${error}` }, { status: 500 })
  }

}