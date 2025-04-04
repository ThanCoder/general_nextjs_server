"use client";
import { releaseAppDeleteAction } from "@/actions/release_app_actions";
import { ReleaseApp } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

function AppListDeleteButton({ app }: { app: ReleaseApp }) {
  const [isPending,startTransition] = useTransition()
  const rotuer = useRouter()

  function onClicked(){
    const res = window.confirm(`${app.version} ကိုဖျက်ချင်တာ သေချာပြီလား?`)
    if(res){
      startTransition(()=>{
        releaseAppDeleteAction(app.id).then(err =>{
          if(err){
            toast.error(err)
          }else{
            toast.success('deleted')
            rotuer.refresh()
          }
        })
      })
    }
  }
  return <button disabled={isPending} onClick={()=> onClicked()} className="!bg-red-600">{isPending ? 'Deleting...':'Delete'}</button>;
}

export default AppListDeleteButton;
