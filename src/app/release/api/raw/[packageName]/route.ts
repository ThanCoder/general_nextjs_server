import prisma from "@/lib/prisma";
import { getRepositoryRawUrl } from "@/utils/app_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ packageName: string }> }) {
  try {
    const packageName = (await params).packageName;
    const rawPath = req.nextUrl.searchParams.get('rawPath')?? ''
    if(rawPath === ''){
      return new NextResponse(Buffer.from(`?rawPath=[README.md] required!!!`,'utf8') , {
        headers: { 'Content-Type': 'text/plain' },
        
      })
    }

    const release = await prisma.release.findFirst({ where: { packageName } })
    if (release == null) {
      return new NextResponse(`'release' not found`, { status: 404 })
    }

    const readmeUrl = getRepositoryRawUrl(release.repository, rawPath)
    // console.log(readmeUrl);

    //read url
    const text = await (await fetch(readmeUrl)).text()

    return new NextResponse(text, {
      headers: { 'Content-Type': 'text/plain' }
    })

  } catch (error) {
    return new NextResponse(`${error}` , {
      headers: { 'Content-Type': 'text/plain' }
    })
  }

}