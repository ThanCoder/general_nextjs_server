'use server'

import prisma from "@/lib/prisma";
import { ProxyType } from "@/models/proxy_model";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

type returnType = {
  success: boolean;
  updateRandom: string;
  someError: string;
  titleError: string;
  typeError: string;
  urlError: string;
}

export async function proxyCreateAction(prevState: any, formData: FormData) {
  var sendData: returnType = {
    success: false,
    updateRandom: randomUUID(),
    someError: '',
    titleError: '',
    typeError: "",
    urlError: ""
  }
  try {

    const title = formData.get('title') as string;
    const url = formData.get('url') as string;
    const proxyType = formData.get('type') as string;

    if (title === '') return { ...sendData, titleError: 'title is empty', success: false }
    if (url === '') return { ...sendData, urlError: 'url is empty' }
    if (proxyType === '') return { ...sendData, typeError: 'type is empty', success: false }
    if (proxyType !== ProxyType.browser && proxyType !== ProxyType.forward) {
      return { ...sendData, typeError: 'invalid type', success: false }
    }
    //pass
    await prisma.proxy.create({ data: { title, url, type: proxyType } })

    revalidatePath('/proxy')
    return { ...sendData, success: true }
  } catch (error) {
    return { ...sendData, success: false, someError: `${error}` }

  }
}

export async function proxyDeleteAction(id:string):Promise<string>{
  try {
    console.log('call');
    
    // await new Promise((res)=> setTimeout(res,2000))
    await prisma.proxy.delete({where:{id}})
    return ''
  } catch (error) {
    return `${error}`
  }
}