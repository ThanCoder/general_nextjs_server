'use client'

import {createUserAction} from "@/actions/user_action"
import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom"


export default function UserForm(){
  const [state,action] = useActionState(createUserAction,null);
  const [formData,setFormData] = useState({name:'',password:''})

  useEffect(() => {
    if (state?.success) {
      setFormData({name:'',password:''})
    }
  }, [state?.success]);

  function onChanged(e:ChangeEvent<HTMLInputElement>){
    setFormData({...formData,[e.target.name]:[e.target.value]})
  }

  return <div>
    
    <form action={action}>
      <div className="form-container">
        <label htmlFor="name">Name</label> 
        <input type="text" name="name" id="name" placeholder="Name"
        value={formData.name} onChange={onChanged} className="form-input:text"/>
        <div className="text-red-600">{state?.nameError}</div>
      </div>

      <div className="form-container">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Password..."  value={formData.password} onChange={onChanged} className="form-input:text"/>
        <div className="text-red-600">{state?.passwordError}</div>
      </div>
      {/* some error */}
      <div className="text-red-600">{state?.someError}</div>
      <br />
      <div className="grid">
      <Submit/>
      </div>

    </form>
  </div>
}

function Submit(){
  const status = useFormStatus()
  

 return  <button type="submit" disabled={status.pending} className="bg-indigo-600 text-white p-2 rounded-md hover:cursor-pointer justify-self-end">{status.pending ? 'Adding...':'Add'}</button>
}