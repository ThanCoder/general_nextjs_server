import prisma from "@/lib/prisma";
import { Release } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  var list: Release[] = []
  try {
    console.log(req.query);
    
  } catch (error) {
    console.log(`${error}`);

  }
  return NextResponse.json(list);
}