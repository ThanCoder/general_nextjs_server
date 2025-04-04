'use client'
import { deleteUserAction } from "@/actions/user_action";
import { User } from "@prisma/client";
import { useTransition } from "react";

export default function DeleteBtn({ user }: { user: User }) {

  const [isPending,startTransition] = useTransition()
  
  function deleteConfirm(){
    const res = window.confirm(`${user.name} ကိုဖျက်ချင်တာ သေချာပြီလား?`)
    console.log('call');
    
    if(res){
      startTransition(async()=>{
        await deleteUserAction(user.id)
      })
    }
  }
  
  return (
    <button disabled={isPending} onClick={()=> deleteConfirm()} className="bg-red-600 text-white p-1 rounded-sm hover:cursor-pointer hover:bg-red-800">
      {isPending ? 'Deleting':'Delete'}
    </button>
  );
}
