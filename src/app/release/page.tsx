import Link from "next/link";
import RelaseList from "./release_list";
import { Suspense } from "react";

function ReleasePage() {
  return ( <div>
    <h1 className="text-center">Release</h1>
    <div className="flex gap-1 justify-start">
    <Link href="/" className="btn">Home</Link>
    {/* form btn */}
    <Link href="/release/form" className="btn">Add Release</Link>
    {/* list */}
    </div>
    <br />
    <Suspense fallback={<div>Loading...</div>}>
    <RelaseList/>
    </Suspense>
  </div> );
}

export default ReleasePage;