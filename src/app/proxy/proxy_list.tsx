import ParseDate from "@/components/parse_date"
import prisma from "@/lib/prisma"
import ProxyDeleteButton from "./proxy_delete_button"

export default async function ProxyList() {
  const list = await prisma.proxy.findMany({orderBy:{date:'desc'}})

  return <div>
    {list.map((proxy)=>(
      <div key={proxy.id} className="mt-3 card">
        <div>Title: {proxy.title}</div>
        <div>Url: {proxy.url}</div>
        <div>Type: {proxy.type}</div>
        <div>Date: <ParseDate date={proxy.date}/></div>
       <div className="mt-3 flex gap-2">
       <button className="">Edit</button>
       <ProxyDeleteButton proxy={proxy}/>
       </div>
      </div>
    ))}
  </div>
}

