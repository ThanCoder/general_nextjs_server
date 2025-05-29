"use client";

import {
  releaseAddAction,
  releaseUpdateAction,
} from "@/actions/release_actions";
import { releaseAppAddAction } from "@/actions/release_app_actions";
import FormButton from "@/components/form_button";
import { getPlatformTypeList, PlatformTypes } from "@/types/types";
import { Release } from "@prisma/client";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

function ReleaseForm({ release }: { release: Release }) {
  const { id, coverUrl, description, packageName, repository, title } = release;
  const [state, action, pending] = useActionState(releaseUpdateAction, {
    id,
    coverUrl,
    description,
    packageName,
    repository,
    title,
    // someError:'i am error'
    // successText:'i am success'
  });

  return (
    <div className="p-10">
      <h1 className="text-center mb-2">Release Form</h1>
     {state.someError ?  <div className="error-text">{state?.someError}</div>:null}
     {state.successText ?  <div className="success-text">{state?.successText}</div>:null}
      
      <form action={action}>
        <div className="form-container">
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Untitled"
            defaultValue={state.title}
          />
        </div>

        <div className="form-container">
          <label htmlFor="packageName">packageName</label>
          <input
            type="text"
            defaultValue={state.packageName}
            name="packageName"
            id="packageName"
            placeholder="com.than.*"
          />
        </div>

        <div className="form-container">
          <label htmlFor="repository">repository</label>
          <input
            type="text"
            name="repository"
            id="repository"
            placeholder="repository..."
            defaultValue={state.repository}
          />
        </div>
        <div className="form-container">
          <label htmlFor="coverUrl">coverUrl</label>
          <input
            type="text"
            name="coverUrl"
            id="coverUrl"
            placeholder="coverUrl..."
            defaultValue={state.coverUrl}
          />
        </div>

        <div className="form-container">
          <label htmlFor="description">description</label>
          <textarea
            defaultValue={state.description}
            name="description"
            id="description"
          />
        </div>
        {/* button */}
        <div className="flex justify-end">
          <button type="submit">{pending ? "Updating..." : "Update"}</button>
        </div>
      </form>
    </div>
  );
}

export default ReleaseForm;
