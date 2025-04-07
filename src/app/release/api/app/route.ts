import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const res = await prisma.releaseApp.findMany({orderBy:{version:'desc'}})

    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json({res:`${error}`},{status:500})
  }
  
}