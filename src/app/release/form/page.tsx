import prisma from "@/lib/prisma";
import Link from "next/link";
import ReleaseForm from "./form";
import { getCurrentUser, isAdminUser } from "@/user_auth/clerk_user_auth";
import { UserTypes } from "@/types/types";

async function ReleaseFormPage() {
const isAdmin = await isAdminUser();
  return ( <div>
    <Link href={`/release`} className="btn">Go Back</Link>
    {/* form */}
     {isAdmin ? <ReleaseForm/>:<h1 className="text-center">Not Allowed</h1>}
    
  </div> );
}

export default ReleaseFormPage;