"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { getCurrentUser } from "@/user_auth/clerk_user_auth";
import { UserTypes } from "@/types/types";


export async function deleteUserAction(id:string){
  // await new Promise((res)=> setTimeout(res,2000))
  const user = await getCurrentUser()
  if(user){
    if(user.type === UserTypes.admin){
      await prisma.user.delete({where:{id}})
      revalidatePath('/user')
    }
  }
  
} 