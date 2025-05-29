import Link from "next/link";
import RelaseList from "./release_list";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { getCurrentUser } from "@/user_auth/clerk_user_auth";

async function ReleasePage() {
  // const currentUser = await getCurrentUser();
  
  return ( <div>
    <div className="flex gap-1 p-5">
    <Link href="/release/form" className="btn">Add</Link>
    </div>
    <h1 className="text-center text-white">Release</h1>
    <div className="flex gap-1 justify-start">
    {/* list */}
    </div>
    <br />
    <Suspense fallback={<Loader/>}>
    <RelaseList/>
    </Suspense>
  </div> );
}

export default ReleasePage;