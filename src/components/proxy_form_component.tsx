"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface FormParams {
  title:string;
  placeholder:string;
  sendUrl:string;
  onDone:Function;
}

export default function ProxyForm(pros:FormParams) {
  const [formData, setFormData] = useState({ url: "" });

  async function onForwardSubmit(e: FormEvent) {
    e.preventDefault();
    
    if(formData.url === '') return;
    fetch(pros.sendUrl,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formData),
    }).then(res =>{
      setFormData({url:''})
      pros.onDone()
    }).then(err =>{
      console.log(err);
      
    })
    
  }
  function onChanged(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <h1 className="text-xl italic font-bold">{pros.title}</h1>
      <form onSubmit={onForwardSubmit} className="flex gap-2 font-lg">
        <input
        className="border-b-4 w-4/5"
          type="text"
          value={formData.url}
          onChange={onChanged}
          name="url"
          placeholder={pros.placeholder}
        />
        <input className="w-1/5 bg-teal-500 text-white px-3 rounded-sm hover:bg-teal-700 cursor-pointer" type="submit" value="Add" />
      </form>
    </div>
  );
}
