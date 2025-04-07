import prisma from "@/lib/prisma";
import { Release } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  var list: Release[] = []
  try {
    list = await prisma.release.findMany({ orderBy: { date: "desc" } });
  } catch (error) {
    console.log(`${error}`);

  }
  return NextResponse.json(list);
}