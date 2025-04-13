'use server'

import prisma from "@/lib/prisma";
import { getPlatformTypeList } from "@/types/types";
import { isAdminUser } from "@/user_auth/clerk_user_auth";
import { validateVersion } from "@/utils/app_utils";
import { randomUUID } from "crypto";

type returnType = {
  randomId: string;
  success: boolean;
  someError: string;
  vesionError: string;
  platformError: string;
  urlError: string;

}

export async function releaseAppAddAction(prevState: any, formData: FormData) {
  let response: returnType = {
    randomId: randomUUID().toString(),
    someError: '',
    success: false,
    platformError: '',
    urlError: '',
    vesionError: ''
  }
  try {
    const isAdmin = await isAdminUser();
    if (!isAdmin) return { ...response, someError: 'not allowed' };


    const releaseId = formData.get('releaseId') as string;
    const version = formData.get('version') as string;
    const platform = formData.get('platform') as string;
    const url = formData.get('url') as string;
    const description = formData.get('description') as string;

    if (!version) return { ...response, vesionError: 'version is required!' }
    if (!platform) return { ...response, platformError: 'platform is required!' }
    if (!url) return { ...response, urlError: 'url is required!' }

    //version validate
    if (validateVersion(version) === false) {
      return { ...response, vesionError: `'[].[].[]' format ပဲလက်ခံပါတယ် ဥပမာ '0.0.1'` }
    }

    //check type
    const platformTypeFound = getPlatformTypeList().some((name) => name.includes(platform))
    if (platformTypeFound == false) {
      return { ...response, platformError: `needed type => '${getPlatformTypeList().join(',')}' ` }
    }

    if (!url.startsWith('http')) {
      return { ...response, urlError: 'url is startsWith http!' }
    }

    const app = await prisma.releaseApp.findFirst({ where: { AND: { version, platform,releaseId } } })

    if (app != null) {
      return { ...response, someError: 'version already exists' }
    }

    await prisma.releaseApp.create({ data: { version, platform, url, description, releaseId } })

    return { ...response, success: true }
  } catch (error) {
    console.log(`${error}`);

    return { ...response, someError: 'database error' }
  }
}

export async function releaseAppDeleteAction(id: string): Promise<string> {
  try {
    const isAdmin = await isAdminUser();
    if (!isAdmin) return 'not allowed'

    await prisma.releaseApp.delete({ where: { id } })

    return ''
  } catch (error) {
    console.log(`${error}`);

    return 'delete error';
  }
}