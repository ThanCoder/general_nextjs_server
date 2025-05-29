import ParseDate from "@/components/parse_date";
import prisma from "../../../lib/prisma";

export default async function UserPage({params}:{params:Promise<{id:string}>}){
  // await new Promise((res)=> setTimeout(res,2000))

  const id = (await params).id;
  const user = await prisma.user.findFirst({where:{id:id}})

  if(user == null) {
    return <div className="text-xl mt-50 block text-center text-red-600 capitalize">user id not found!</div>
  }
  

  return <div>
    <div 
      className="bg-gray-100 mb-2 block rounded-sm p-2 hover:cursor-pointer hover:bg-gray-200">
        <div>ID: {user.id}</div>
        <div>Name: {user.name}</div>
        <div>Password: {user.password}</div>
        <div>Date: <ParseDate date={user.date}/></div>
      </div>
  </div>
}