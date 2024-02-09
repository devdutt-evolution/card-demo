"use client";

import type { User } from "@/types/type.d";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormBody = User;

export default function EditableForm({ userDetails }: { userDetails: User }) {
  const { data: authData } = useSession({ required: true });
  const router = useRouter();
  const [editOn, setEditMode] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors, defaultValues, isDirty },
    handleSubmit,
    reset,
    control,
  } = useForm<FormBody>({
    defaultValues: userDetails,
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const FormAttributes = [
    {
      fieldId: "username",
      labelText: "Username",
      registerName: "username",
      disable: true,
      error: errors.username?.message,
    },
    {
      fieldId: "email",
      labelText: "Email",
      registerName: "email",
      disable: true,
      error: errors.email?.message,
    },
    {
      fieldId: "name",
      labelText: "Display name",
      registerName: "name",
      disable: false,
      error: errors.name?.message,
    },
    {
      fieldId: "phone",
      labelText: "Phone Number",
      registerName: "phone",
      disable: false,
      error: errors.phone?.message,
    },
  ];

  const submitForm = async (data: User) => {
    const formData = new FormData();

    formData.append("picture", data.picture);
    formData.append("data", JSON.stringify(data));

    return fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/user/${authData?.user?.id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          authorization: `Bearer ${authData?.user.token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setEditMode(false);
        router.refresh();
        // setPreview(defaultValues?.picture || "");
        setError("");
      } else {
        // console.log("failed api");
        setError("Failed to edit user profile");
      }
    });
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(submitForm)}
      className="text-white"
    >
      <div className="flex justify-between items-center">
        <Link
          href="/posts"
          className="w-max block bg-green hover:bg-opacity-20 px-6 py-2 rounded-lg mb-4"
        >
          &lt;-
        </Link>
        {!editOn && (
          <div
            className="px-3 p-2 bg-green hover:opacity-40 rounded-lg text-md cursor-pointer"
            onClick={(e) => setEditMode(true)}
          >
            Edit Profile
          </div>
        )}
      </div>
      <div
        className={`rounded-lg border-2 border-divider flex justify-center items-center text-zinc-400 relative w-60 h-60 mx-auto mb-4 ${
          preview ? "border-solid" : "border-dashed"
        }`}
      >
        <Controller
          control={control}
          name="picture"
          rules={{ required: "Profile picture is required!" }}
          render={({ field: { value, onChange, ...field } }: any) => {
            return (
              <>
                {defaultValues?.picture && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}/pictures/${defaultValues.picture}`}
                    alt="profile picture"
                    className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-100 rounded-lg object-cover"
                  />
                )}
                {preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-100 rounded-lg object-cover"
                    alt="profile picture"
                  />
                )}
                <input
                  {...field}
                  id="picture"
                  type="file"
                  disabled={!editOn}
                  value={value?.fileName}
                  onChange={(event) => {
                    const file = event.currentTarget?.files?.item(0) as
                      | Blob
                      | MediaSource;
                    const urlImage = URL.createObjectURL(file);
                    setPreview(urlImage);
                    return onChange(event.currentTarget?.files?.item(0));
                  }}
                  accept="image/*"
                  className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 ${
                    !editOn ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                />
              </>
            );
          }}
        />
        Drag to upload
      </div>
      <section className="flex flex-col gap-3">
        {FormAttributes.map((obj) => (
          <div className="w-full flex flex-col gap-1" key={obj.labelText}>
            <label htmlFor={obj.fieldId} className="text-xs text-white">
              {obj.labelText}
            </label>
            <input
              type="text"
              disabled={obj.disable || !editOn}
              id={obj.fieldId}
              {...register(
                obj.registerName as "username" | "name" | "email" | "phone"
              )}
              className={`${
                (obj.disable || !editOn) && "cursor-not-allowed text-gray-400"
              } outline-none focus:outline-green p-2 px-3 bg-divider rounded-lg`}
            />
            {obj.error && <p className="text-red text-sm">{obj.error}</p>}
          </div>
        ))}
      </section>
      {error && <div className="text-red text-sm">{error}</div>}
      <div className="flex gap-4 mt-3">
        {editOn && (
          <>
            <button
              className="px-3 p-2 bg-green hover:opacity-40 rounded-lg block"
              type="submit"
            >
              Save
            </button>
            <button
              type="button"
              className="px-3 p-2 bg-green hover:opacity-40 rounded-lg cursor-pointer w-max"
              onClick={(e) => {
                const fun = () => {
                  reset();
                  setPreview("");
                  setError("");
                  setEditMode(false);
                };
                e.preventDefault();
                if (isDirty) {
                  if (window.confirm("Edited data will be lost continue?"))
                    fun();
                } else fun();
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
}
