import ParseDate from "@/components/parse_date";
import prisma from "@/lib/prisma";
import ProxyDeleteButton from "./proxy_delete_button";
import { isAdminUser } from "@/user_auth/clerk_user_auth";

export default async function ProxyList() {
  const isAdmin = await isAdminUser();
  const list = await prisma.proxy.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      {list.map((proxy) => (
        <div key={proxy.id} className="mt-3 card">
          <div>Title: {proxy.title}</div>
          <div>Url: {proxy.url}</div>
          <div>Type: {proxy.type}</div>
          <div>
            Date: <ParseDate date={proxy.date} />
          </div>
          <div className="mt-3 flex gap-2">
          {isAdmin ? (
             <button className="">Edit</button>
            ) : null}
            
            {isAdmin ? (
              <ProxyDeleteButton proxy={proxy} />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
