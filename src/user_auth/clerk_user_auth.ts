import prisma from "@/lib/prisma";
import { UserTypes } from "@/types/types";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

type propsType = {platform?:string}

export async function getCurrentUser ({platform}:propsType={}):Promise<null | User>{
  try {
    const user = await currentUser()
  if(!user) return null;

  const loginedUser = await prisma.user.findUnique({where:{id:user.id}})
  // database မှာရှိရင် ပေးလိုက်မယ်
  if(loginedUser){
    return loginedUser;
  }
  //check user list
  const userCount = (await prisma.user.findMany()).length;
  //user database မှာ မရှိဘူး
  return await prisma.user.create({data:{
    id:user.id,
    clientId:'',
    platform:platform??'',
    email:user.emailAddresses[0].emailAddress,
    imageUrl:user.imageUrl?? '',
    name:`${user.firstName} ${user.lastName}`,
    password:'',
    type:userCount === 0 ? UserTypes.admin:UserTypes.normal,

  }})

  } catch (error) {
    console.log(`getCurrentUser: ${error}`);
    return null;
  }
}

