"use client";
import { proxyDeleteAction } from "@/actions/proxy_actions";
import { Proxy } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

function ProxyDeleteButton({ proxy }: { proxy: Proxy }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function deleteConfirm() {
    let res = window.confirm(`'${proxy.title}' ကိုဖျက်ချင်တာ သေချာပြီလား?`);
    if (res) {
      
      startTransition(() => {
        proxyDeleteAction(proxy.id).then(err =>{
          if (err) {
            console.log(err);
            toast.error('delete error')
          } else {
            //success
            router.refresh()
            console.log('deleted');
            toast.success('deleted')
            
          }
        });
         
      });
    }
  }

  return (
    <button onClick={() => deleteConfirm()} className="red">
      {isPending ? 'Deleting...':'Delete'}
    </button>
  );
}

export default ProxyDeleteButton;
