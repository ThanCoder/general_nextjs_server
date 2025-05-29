import ParseDate from "@/components/parse_date";
import prisma from "../../lib/prisma"
import Link from "next/link";
import UserList from "./user_list";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { getCurrentUser } from "@/user_auth/clerk_user_auth";
import { UserTypes } from "@/types/types";

export default async function UserPage(){
  
  const currentUser = await getCurrentUser();
  if(currentUser?.type === UserTypes.admin){
    return <div className="p-3">

   {/* list */}
    <h1 className="text-lg mb-2 text-center">User List</h1>
   <Suspense fallback={<Loader/>}>
   <UserList/>
   </Suspense>
    
  </div>
  }
  return <h1 className="text-center">User Not Allowed</h1>
  
}