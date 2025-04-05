import Link from "next/link";
import prisma from "@/lib/prisma";
import ReleaseAppList from "./release_app_list";

async function RelaseAppPage({params}:{params:Promise<{id:string}>}) {
  const id = (await params).id;
  const release = await prisma.release.findUnique({where:{id}})
  return ( <div>
    <div className="flex gap-2 justify-start">
      <Link href="/release" className="btn">Release</Link>
      <Link href={`/release/form/${id}`} className="btn">Add App</Link>
    </div>
    <div className="mt-2">
    <h1 className="text-center my-3">{`App ${release?.title}`}</h1>
    </div>
    {/* list */}
    <ReleaseAppList releaseId={id}/>

  </div> );
}

export default RelaseAppPage;