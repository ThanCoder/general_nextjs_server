'use server'

import prisma from "@/lib/prisma";
import { isAdminUser } from "@/user_auth/clerk_user_auth";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";


export type ReleaseAddState = {
  randomId: string;
  success: boolean;
  someError: string;
  titleError: string;
  repositoryError: string;
  packageNameError: string;
}
export type ReleaseUpdateState = {
  id: string,
  title: string,
  packageName: string,
  repository: string,
  coverUrl: string,
  description: string,
  someError?: string,
  successText?: string,
}

export async function releaseAddAction(prevState: ReleaseAddState | null, formData: FormData) {
  let state: ReleaseAddState = {
    randomId: randomUUID().toString(),
    someError: '',
    success: false,
    titleError: '',
    repositoryError: '',
    packageNameError: ''
  }
  try {
    const isAdmin = await isAdminUser();
    if (!isAdmin) return { ...state, someError: 'not allowed' }
    const title = formData.get('title') as string;
    const repository = formData.get('repository') as string;
    const coverUrl = formData.get('coverUrl') as string;
    const packageName = formData.get('packageName') as string;
    const description = formData.get('description') as string;

    if (!title) return { ...state, titleError: 'title is required!' }
    if (!repository) return { ...state, repositoryError: 'repository is required!' }
    if (!packageName) return { ...state, packageNameError: 'packageName is required!' }


    // await new Promise((res)=> setTimeout(res,2000))
    await prisma.release.create({ data: { title, coverUrl, description, packageName, repository } })


    return { ...state, success: true }
  } catch (error) {
    return { ...state, someError: `${error}` }
  }
}

export async function releaseUpdateAction(prevState: ReleaseUpdateState, formData: FormData) {
  const state: ReleaseUpdateState = {
    ...prevState,
    someError: undefined,
    successText: undefined,
  };
  try {
    const isAdmin = await isAdminUser();
    if (!isAdmin) return { ...state, someError: 'not allowed' }

    const title = formData.get('title') as string;
    const repository = formData.get('repository') as string;
    const coverUrl = formData.get('coverUrl') as string;
    const packageName = formData.get('packageName') as string;
    const description = formData.get('description') as string;

    state.title = title;
    state.coverUrl = coverUrl;
    state.description = description;
    state.packageName = packageName;
    state.repository = repository;

    if (!title) return { ...state, titleError: 'title is required!' }
    if (!repository) return { ...state, repositoryError: 'repository is required!' }
    if (!packageName) return { ...state, packageNameError: 'packageName is required!' }


    // await new Promise((res)=> setTimeout(res,2000))
    await prisma.release.update({ where: { id: state.id }, data: { title, coverUrl, description, packageName, repository } })

    state.successText = 'Updated';
    return state;
  } catch (error) {
    state.someError= `${error}`
    return state;
  }
}

export async function releaseDeleteAction(id: string) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return;
  // await new Promise((res)=> setTimeout(res,2000))
  await prisma.release.delete({ where: { id } })
}