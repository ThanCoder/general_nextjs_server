import Link from "next/link";
import RelaseList from "./release_list";
import { Suspense } from "react";
import Loader from "@/components/loader";

function ReleasePage() {
  return ( <div>
    <div className="flex gap-1">
    <Link href="/" className="btn">Home</Link>
    <Link href="/release/form" className="btn">Add</Link>
    </div>
    <h1 className="text-center">Release</h1>
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