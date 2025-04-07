import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params }: { params: Promise<{ id: string }> }){
  try {
    const id = (await params).id;
    if(id){
      const res = await prisma.release.findUnique({where:{id}})
      return NextResponse.json(res);
    }
    return NextResponse.json({res:'not found'},{status:404});

  } catch (error) {
    return NextResponse.json({res:`${error}`},{status:500})
  }
  
}