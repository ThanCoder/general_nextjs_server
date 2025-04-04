"use client";

import { releaseAppAddAction } from "@/actions/release_app_actions";
import FormButton from "@/components/form_button";
import { getPlatformTypeList, PlatformTypes } from "@/types/types";
import { Release } from "@prisma/client";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

function ReleaseAppForm({ release }: { release: Release }) {
  const [state, action] = useActionState(releaseAppAddAction, null);
  const [formData, setFormData] = useState({
    version: "",
    platform: "",
    url: "",
    description: "",
  });

  function onChanged(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  }

  useEffect(() => {
    if (state?.success) {
      setFormData({ ...formData, url: "", description: "" });
      toast.success("Added");
    } else {
      if (state?.someError) {
        toast.error(state?.someError);
      }
    }
  }, [state?.randomId]);

  return (
    <div className="p-10">
      <h1 className="text-center mb-2">Form</h1>
      <div className="error-text">{state?.someError}</div>
      <form action={action}>
        <input type="hidden" name="releaseId" value={release.id} />

        <div className="form-container">
          <label htmlFor="version">version</label>
          <input
            type="text"
            name="version"
            id="version"
            placeholder="1.0.0"
            value={formData.version}
            onChange={onChanged}
          />
          <div className="error-text">{state?.vesionError}</div>
        </div>

        <div className="form-container">
          <label htmlFor="packageName">packageName</label>
          <input
            type="text"
            value={release.packageName}
            disabled
            name="packageName"
            id="packageName"
            placeholder="than."
          />
        </div>

        <div className="form-container">
          <label htmlFor="platform">platform</label>
          <input
            type="text"
            name="platform"
            id="platform"
            placeholder="platform..."
            list="platform-list"
            value={formData.platform}
            onChange={onChanged}
          />
          <div className="error-text">{state?.platformError}</div>
        </div>
        {/* plaform list */}
        <datalist id="platform-list">
          {getPlatformTypeList().map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </datalist>
        <div className="form-container">
          <label htmlFor="url">url</label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Url..."
            value={formData.url}
            onChange={onChanged}
          />
          <div className="error-text">{state?.urlError}</div>
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

export default ReleaseAppForm;
