import prisma from "@/lib/prisma";
import { Release } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  var list: Release[] = []
  try {
    const packageName = req.nextUrl.searchParams.get('packageName') ?? '';
    if (packageName) {
      //send release app list
      const release = await prisma.release.findFirst({ where: { packageName } });

      const appList = await prisma.releaseApp.findMany({ orderBy: { version: 'desc' }, where: { releaseId: release?.id } })
      return NextResponse.json(appList);
    }
    list = await prisma.release.findMany({ orderBy: { date: "desc" } });
  } catch (error) {
    console.log(`${error}`);

  }
  return NextResponse.json(list);
}