import { UserTypes } from "@/types/types";
import { getCurrentUser } from "@/user_auth/clerk_user_auth";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser({platform:''});
  

  return (
    <>
      {user?.type === UserTypes.admin ? (
        <div className="text-blue-500 flex gap-1 mt-2">
          <Link className="btn" href="/proxy">
            Proxy
          </Link>
          <Link className="btn" href="/user">
            User
          </Link>
          <Link className="btn" href="/release">
            Release
          </Link>
        </div>
      ) : null}

      {/* <div>{user?.id}</div>
      <div>Banned: {`${user?.banned}`}</div>
      <div>Locked: {`${user?.locked}`}</div>
      <div>{user?.firstName}</div>
      <div>{user?.lastName}</div>
      <div>{user?.imageUrl.trim()}</div>
      <div>{user?.emailAddresses[0].emailAddress}</div> */}
    </>
  );
}
