import { Route } from "next";
import { NextResponse } from "next/server";

export async function GET(){

    return NextResponse.json({name:'than server'})
    
}