import ParseDate from "@/components/parse_date";
import prisma from "../../lib/prisma"
import UserForm from "./user_form";
import Link from "next/link";
import UserList from "./user_list";
import { Suspense } from "react";

export default async function UserPage(){
  
  
  return <div className="p-3">

    {/* form */}
    <UserForm/>
    <br />

    {/* list */}
    <h1 className="text-lg mb-2 text-center">User List</h1>
   <Suspense fallback="Loading...">
   <UserList/>
   </Suspense>
    
  </div>
}