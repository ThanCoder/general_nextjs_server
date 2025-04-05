import ParseDate from "@/components/parse_date";
import prisma from "../../lib/prisma"
import Link from "next/link";
import UserList from "./user_list";
import { Suspense } from "react";
import Loader from "@/components/loader";

export default async function UserPage(){
  
  
  return <div className="p-3">

   {/* list */}
    <h1 className="text-lg mb-2 text-center">User List</h1>
   <Suspense fallback={<Loader/>}>
   <UserList/>
   </Suspense>
    
  </div>
}