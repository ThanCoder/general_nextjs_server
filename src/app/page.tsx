import Link from "next/link";

export default function Home() {
  return (
    <div className="text-blue-500 flex gap-1">
     <Link className="btn" href="/proxy">Proxy Page</Link>
     <Link className="btn" href="/user">User Page</Link>
     <Link className="btn" href="/release">Release Page</Link>
    </div>
  );
}
