"use client";

import { releaseDeleteAction } from "@/actions/release_actions";
import { Release } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

function ReleaseDeleteButton({ release }: { release: Release }) {
  const [isPending, startTranstition] = useTransition();
  const router = useRouter();

  function delConfirm() {
    const res = window.confirm(`'${release.title}' ကိုဖျက်ချင်တာ သေချာပြီလား?`);
    if (!res) return;
    startTranstition(() => {
      releaseDeleteAction(release.id)
        .then((_) => {
          toast.success("Deleted");
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
          toast.error("delete error");
        });
    });
  }

  return (
    <button disabled={isPending} onClick={() => delConfirm()} className="red">
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}

export default ReleaseDeleteButton;
