"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

export async function createUserAction(
  prevState: any,
  formData: FormData
) {
  await new Promise((res) => setTimeout(res, 200));

  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (name === "") {
    return { nameError: "name is empty" };
  }
  if (password === "") {
    return { passwordError: "password is empty" };
  }

  try {
    await prisma.user.create({ data: { name, password } });
    revalidatePath('/user')
    return { success: true }
  } catch (error: any) {
    return { someError: `db add error: ${error}` }
  }
}


export async function deleteUserAction(id:string){
  // await new Promise((res)=> setTimeout(res,2000))
  await prisma.user.delete({where:{id}})
  revalidatePath('/user')
  
} 