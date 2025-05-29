import prisma from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUser, isAdminUser } from "@/user_auth/clerk_user_auth";
import { UserTypes } from "@/types/types";
import ReleaseForm from "./form";

async function ReleaseEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const isAdmin = await isAdminUser();
  const currentUser = await getCurrentUser();
  const release = await prisma.release.findUnique({where:{id}})
  return (
    <div>
      <Link href={`/release`} className="btn">
        Go Back
      </Link>
      {/* form */}
      {isAdmin || currentUser?.id === id ? (
        <ReleaseForm release={release!} />
      ) : (
        <h1 className="text-center">Not Allowed</h1>
      )}
    </div>
  );
}

export default ReleaseEditPage;
