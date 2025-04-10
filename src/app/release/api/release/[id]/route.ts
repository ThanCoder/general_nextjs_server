import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params }: { params: Promise<{ id: string }> }){
  try {
    const id = (await params).id;
    const release = await prisma.release.findUnique({where:{id}})
    if(release == null){
      return new NextResponse(`'release' not found`,{status:404})
    }

    return NextResponse.json(release);

  } catch (error) {
    return new NextResponse(`${error}`,{status:500})
  }
  
}