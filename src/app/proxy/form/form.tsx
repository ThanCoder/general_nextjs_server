"use client";

import { proxyCreateAction } from "@/actions/proxy_actions";
import FormButton from "@/components/form_button";
import { ProxyType } from "@/models/proxy_model";
import { Proxy } from "@prisma/client";
import Link from "next/link";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProxyForm({ proxy }: { proxy?: Proxy }) {
  const [formData, setFormData] = useState({ title: "", url: "", type: "" });
  const [state, action] = useActionState(proxyCreateAction, null);

  function onChanged(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  }

  useEffect(() => {
    if (state?.success) {
      setFormData({ title: "", url: "", type: "" });
      toast.success("Added");
    } else {
      if(state?.someError){
        console.log(state.someError)
        toast.error('error ရှိနေပါတယ်!')

      }
    }
  }, [state?.updateRandom]);

  return (
    <div className="card">
      <Link href="/proxy" className="btn red">
        Go Back
      </Link>
      <h1 className="text-center mb-2">Proxy Form</h1>
      <form action={action}>
        <div className="form-container">
          <label htmlFor="title">Title</label>
          <input
            value={formData.title}
            onChange={onChanged}
            type="text"
            name="title"
            id="title"
            placeholder="Title.."
          />
          <div className="text-red-700 capitalize">{state?.titleError}</div>
        </div>

        <div className="form-container">
          <label htmlFor="url">Url</label>
          <input
            value={formData.url}
            onChange={onChanged}
            type="text"
            name="url"
            id="url"
            placeholder="Url.."
          />
          <div className="text-red-700 capitalize">{state?.urlError}</div>
        </div>
        <div className="form-container">
          <label htmlFor="type">Type</label>
          <input
            value={formData.type}
            onChange={onChanged}
            type="text"
            name="type"
            id="type"
            placeholder="Proxy Type.."
            list="proxy-list"
          />
          <div className="text-red-700 capitalize">{state?.typeError}</div>
          {/* proxy list */}
          <datalist id="proxy-list">
            <option value={ProxyType.forward}>{ProxyType.forward}</option>
            <option value={ProxyType.browser}>{ProxyType.browser}</option>
          </datalist>
        </div>

        <div className="flex">
          <FormButton className="justify-self-end" text="Add" pendingText="Adding..." />
        </div>
      </form>
    </div>
  );
}
