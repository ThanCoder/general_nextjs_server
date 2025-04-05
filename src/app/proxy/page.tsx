import Link from "next/link";
import ProxyForm from "./form/form";
import ProxyList from "./proxy_list";

export default async function ProxyHome(){
  return <div>
    {/* list */}
    <div className="flex gap-2">
      <Link href='/' className="btn">Home</Link>
      <Link href='/proxy/form' className="btn">Add Proxy</Link>
    </div>
    <ProxyList/>
  </div>
}