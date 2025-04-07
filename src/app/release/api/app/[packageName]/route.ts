import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }: { params: Promise<{ packageName: string }> }) {
  try {
    const packageName = (await params).packageName;

    const release = await prisma.release.findFirst({ where: { packageName } })

    const res = await prisma.releaseApp.findFirst({
      where: { releaseId: release?.id },
      orderBy: { version: 'desc' }
    })
    return NextResponse.json(res, { status: 404 })
  } catch (error) {
    return NextResponse.json({ res: `${error}` }, { status: 500 })
  }

}