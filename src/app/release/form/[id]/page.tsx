import prisma from "@/lib/prisma";
import ReleaseAppForm from "./form";
import Link from "next/link";

async function ReleaseAppFormPage({params}:{params:Promise<{id:string}>}) {
  const id = (await params).id;
    const release = await prisma.release.findUnique({where:{id}})

  return ( <div>
    <Link href={`/release/${id}`} className="btn">Go Back</Link>
    <h1 className="text-center mb-3">{`Release '${release?.title}'`}</h1>
    {/* form */}
    {release && <ReleaseAppForm release={release} />}
  </div> );
}

export default ReleaseAppFormPage;