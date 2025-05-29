import ParseDate from "@/components/parse_date";
import prisma from "@/lib/prisma";
import AppListDeleteButton from "./app_list_delete_button";

async function ReleaseAppList({releaseId}:{releaseId:string}) {
  const list = await prisma.releaseApp.findMany({where:{releaseId},orderBy:{version:'desc'}})
 
  return ( <div>
      {list.map((app)=>(
        <div 
        key={app.id}
        className="card mb-2">
          <div>Version: {app.version}</div>
          <div>Platform: {app.platform}</div>
          <div>Url: {app.url}</div>
          <div>Description: {app.description}</div>
          <div>Date: <ParseDate date={app.date} /></div>
          <div className="flex mt-2">
            <AppListDeleteButton app={app} />
          </div>
        </div>
      ))}
  </div> );
}

export default ReleaseAppList;