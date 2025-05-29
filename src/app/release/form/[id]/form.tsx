"use client";

import { releaseAppAddAction } from "@/actions/release_app_actions";
import FormButton from "@/components/form_button";
import { getPlatformTypeList } from "@/types/types";
import { Release } from "@prisma/client";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

function ReleaseAppForm({ release }: { release: Release }) {
  const [state, action] = useActionState(releaseAppAddAction, null);
  const [formData, setFormData] = useState({
    version: "1.0.0",
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
      {/* <h1 className="text-center mb-2">App Form</h1> */}
      {state?.someError ? (
        <div className="error-text">{state?.someError}</div>
      ) : null}

      <form action={action}>
        <input type="hidden" name="releaseId" value={release.id} />

        <div className="form-container">
          {state?.vesionError ? (
            <div className="error-text">{state?.vesionError}</div>
          ) : null}
          <label htmlFor="version">version</label>
          <input
            type="text"
            name="version"
            id="version"
            placeholder="1.0.0"
            value={formData.version}
            onChange={onChanged}
          />
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
          {state?.platformError ? (
            <div className="error-text">{state?.platformError}</div>
          ) : null}
          <label htmlFor="platform">platform</label>
          {/* plaform list */}
          <select
            value={formData.platform}
            onChange={(e) => {
              // console.log(e.target.value);
              setFormData({ ...formData, platform: e.target.value });
            }}
            name="platform"
            id="platform"
          >
            {getPlatformTypeList().map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-container">
          {state?.urlError ? (
            <div className="error-text">{state?.urlError}</div>
          ) : null}
          <label htmlFor="url">url</label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Url..."
            value={formData.url}
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

export default ReleaseAppForm;
