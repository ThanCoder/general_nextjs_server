import Link from "next/link";
import prisma from "../../lib/prisma";
import ParseDate from "@/components/parse_date";
import DeleteBtn from "./delete_btn";

export default async function UserList() {
  // await new Promise((resolve)=> setTimeout(resolve,2000));
  const users = await prisma.user.findMany({ orderBy: { date: "desc" } });



  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-gray-100 mb-2 block rounded-sm p-2 hover:cursor-pointer hover:bg-gray-200"
        >
          <Link href={`/user/${user.id}`}>
            <div>ID: {user.id}</div>
            <div>Name: {user.name}</div>
            <div>Password: {user.password}</div>
            <div>
              Date: <ParseDate date={user.date} />
            </div>
          </Link>
          <div className="flex">
           <DeleteBtn user={user}/>
          </div>
        </div>
      ))}
    </div>
  );
}
