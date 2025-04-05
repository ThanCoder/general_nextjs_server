"use client";

import { releaseAddAction } from "@/actions/release_actions";
import { releaseAppAddAction } from "@/actions/release_app_actions";
import FormButton from "@/components/form_button";
import { getPlatformTypeList, PlatformTypes } from "@/types/types";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

function ReleaseForm() {
  const [state, action] = useActionState(releaseAddAction, null);
  const [formData, setFormData] = useState({
    title: "",
    repository: "",
    coverUrl: "",
    packageName: "",
    description: "",
  });

  function onChanged(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  }

  useEffect(() => {
    if (state?.success) {
      setFormData({coverUrl: "", description: "",packageName:'',repository:'',title:'' });
      toast.success("Added");
    } else {
      if (state?.someError) {
        toast.error(state?.someError);
      }
    }
  }, [state?.randomId]);

  return (
    <div className="p-10">
      <h1 className="text-center mb-2">Release Form</h1>
      <div className="error-text">{state?.someError}</div>
      <form action={action}>
        

        <div className="form-container">
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Untitled"
            value={formData.title}
            onChange={onChanged}
          />
          <div className="error-text">{state?.titleError}</div>
        </div>

        <div className="form-container">
          <label htmlFor="packageName">packageName</label>
          <input
            type="text"
            value={formData.packageName}
            onChange={onChanged}
            name="packageName"
            id="packageName"
            placeholder="com.than.*"
          />
          <div className="error-text">{state?.packageNameError}</div>
        </div>

        <div className="form-container">
          <label htmlFor="repository">repository</label>
          <input
            type="text"
            name="repository"
            id="repository"
            placeholder="repository..."
            value={formData.repository}
            onChange={onChanged}
          />
          <div className="error-text">{state?.repositoryError}</div>
        </div>
        <div className="form-container">
          <label htmlFor="coverUrl">coverUrl</label>
          <input
            type="text"
            name="coverUrl"
            id="coverUrl"
            placeholder="coverUrl..."
            value={formData.coverUrl}
            onChange={onChanged}
          />
        </div>

        <div className="form-container">
          <label htmlFor="description">description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={onChanged}
          />
        </div>
        {/* button */}
        <div className="flex justify-end">
          <FormButton text="Add" pendingText="Adding..." />
        </div>
      </form>
    </div>
  );
}

export default ReleaseForm;
