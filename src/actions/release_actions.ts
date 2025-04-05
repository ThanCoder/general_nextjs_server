'use server'

import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";


export async function releaseUpdateAction(prevState:any,formData:FormData){
  try {
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;
    const repository = formData.get('repository') as string;
    const coverUrl = formData.get('coverUrl') as string;
    const packageName = formData.get('packageName') as string;
    const description = formData.get('description') as string;

    if(!id) return {success:false,someError:'id not found!'}
    if(!title) return {success:false,titleError:'title is required!'}
    if(!repository) return {success:false,repositoryError:'repository is required!'}
    if(!packageName) return {success:false,packageNameError:'packageName is required!'}

  
    // await new Promise((res)=> setTimeout(res,2000))
    await prisma.release.update({data:{title,coverUrl,description,packageName,repository},where:{id}})

    return {success:true}
  } catch (error) {
    return {success:false,someError:`${error}`}
  }
}

type returnType = {
  randomId:string;
  success:boolean;
  someError:string;
  titleError:string;
  repositoryError:string;
  packageNameError:string;
}

export async function releaseAddAction(prevState:any,formData:FormData){
  let response:returnType ={
      randomId:randomUUID().toString(),
      someError:'',
      success:false,
      titleError:'',
      repositoryError:'',
      packageNameError:''
    }
  try {
    const title = formData.get('title') as string;
    const repository = formData.get('repository') as string;
    const coverUrl = formData.get('coverUrl') as string;
    const packageName = formData.get('packageName') as string;
    const description = formData.get('description') as string;

    if(!title) return {...response,titleError:'title is required!'}
    if(!repository) return {...response,repositoryError:'repository is required!'}
    if(!packageName) return {...response,packageNameError:'packageName is required!'}

  
    // await new Promise((res)=> setTimeout(res,2000))
    await prisma.release.create({data:{title,coverUrl,description,packageName,repository}})


    return {...response,success:true}
  } catch (error) {
    return {...response,someError:`${error}`}
  }
}


export async function releaseDeleteAction(id:string){
  // await new Promise((res)=> setTimeout(res,2000))
    await prisma.release.delete({where:{id}})
}