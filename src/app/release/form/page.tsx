import prisma from "@/lib/prisma";
import Link from "next/link";
import ReleaseForm from "./form";

async function ReleaseFormPage() {

  return ( <div>
    <Link href={`/release`} className="btn">Go Back</Link>
    {/* form */}
    <ReleaseForm/>
  </div> );
}

export default ReleaseFormPage;