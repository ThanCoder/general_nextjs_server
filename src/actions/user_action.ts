"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { getCurrentUser, isAdminUser } from "@/user_auth/clerk_user_auth";
import { UserTypes } from "@/types/types";


export async function deleteUserAction(id: string) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return
  
  await prisma.user.delete({ where: { id } })

} 