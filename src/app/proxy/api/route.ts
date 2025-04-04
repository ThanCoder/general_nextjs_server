import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
  const list = await prisma.proxy.findMany({orderBy:{date:'desc'}})
  
  return NextResponse.json(list)
}