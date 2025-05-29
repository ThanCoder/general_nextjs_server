import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }: { params: Promise<{ packageName: string }> }) {
  try {
    const packageName = (await params).packageName;

    const release = await prisma.release.findFirst({ where: { packageName } })
    if(release == null){
      return new NextResponse(`'release' not found`,{status:404})
    }

    const releaseApp = await prisma.releaseApp.findFirst({
      where: { releaseId: release?.id },
      orderBy: { version: 'desc' }
    })
    if(releaseApp == null){
      return new NextResponse(`'releaseApp' not found`,{status:404})
    }

    return NextResponse.json(releaseApp, { status: 200 })
  } catch (error) {
    return NextResponse.json({ res: `${error}` }, { status: 500 })
  }

}
