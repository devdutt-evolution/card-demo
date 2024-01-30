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

  const FormAttributes = {
    userDetails: [
      {
        fieldId: "username",
        labelText: "Username",
        registerName: "username",
        disable: true,
        error: errors.username?.message,
      },
      {
        fieldId: "name",
        labelText: "Display name",
        registerName: "name",
        disable: false,
        error: errors.name?.message,
      },
    ],
    userDetails2: [
      {
        fieldId: "email",
        labelText: "Email",
        registerName: "email",
        disable: true,
        error: errors.email?.message,
      },
      {
        fieldId: "phone",
        labelText: "Phone Number",
        registerName: "phone",
        disable: false,
        error: errors.phone?.message,
      },
      {
        fieldId: "website",
        labelText: "Website",
        registerName: "website",
        disable: false,
        error: errors.website?.message,
      },
    ],
    address: [
      {
        fieldId: "city",
        labelText: "City",
        registerName: "address.city",
        disable: false,
        error: errors.address?.city?.message,
      },
      {
        fieldId: "street",
        labelText: "Street",
        registerName: "address.street",
        disable: false,
        error: errors.address?.street?.message,
      },
      {
        fieldId: "suite",
        labelText: "Suite",
        registerName: "address.suite",
        disable: false,
        error: errors.address?.suite?.message,
      },
      {
        fieldId: "zipcode",
        labelText: "Zipcode",
        registerName: "address.zipcode",
        disable: false,
        error: errors.address?.zipcode?.message,
      },
    ],
    company: [
      {
        fieldId: "companyName",
        labelText: "Name of Company",
        registerName: "company.name",
        disable: false,
        error: errors.company?.name?.message,
      },
      {
        fieldId: "bs",
        labelText: "BS",
        registerName: "company.bs",
        disable: false,
        error: errors.company?.bs?.message,
      },
      {
        fieldId: "catchPhrase",
        labelText: "Catchphrase",
        registerName: "company.catchPhrase",
        disable: false,
        error: errors.company?.catchPhrase?.message,
      },
    ],
  };

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
      className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 px-2 pb-2 text-white"
    >
      <div className="min-h-[200px] rounded-lg lg:col-span-2 md:row-span-2 lg:row-span-1 p-4">
        <div
          className={`max-w-60 mx-auto h-full rounded-lg border-2 ${
            preview ? "border-solid" : "border-dashed"
          } border-divider flex justify-center items-center text-zinc-400 relative`}
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
      </div>
      <section className="flex flex-col gap-2 px-2 md:mb-2">
        <h3 className="text-xl font-bold text-green border-b-2 border-green rounded-sm">
          User Details
        </h3>
        {FormAttributes.userDetails.map((obj) => (
          <div className="w-full flex flex-col gap-1" key={obj.labelText}>
            <label htmlFor={obj.fieldId} className="text-xs text-white">
              {obj.labelText}
            </label>
            <input
              type="text"
              disabled={obj.disable || !editOn}
              id={obj.fieldId}
              {...register(obj.registerName as "username" | "name")}
              className={`${
                obj.disable
                  ? "cursor-not-allowed text-gray-400"
                  : !editOn
                  ? "cursor-not-allowed text-gray-400"
                  : ""
              } outline-none focus:outline-green p-2 px-3 bg-divider rounded-lg`}
            />
            {obj.error && <p className="text-red text-sm">{obj.error}</p>}
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-2 px-2 md:translate-y-[-6px] lg:translate-y-0">
        {FormAttributes.userDetails2.map((obj) => (
          <div className="w-full flex flex-col gap-1" key={obj.labelText}>
            <label htmlFor={obj.fieldId} className="text-xs text-white">
              {obj.labelText}
            </label>
            <input
              type="text"
              disabled={obj.disable || !editOn}
              id={obj.fieldId}
              {...register(obj.registerName as "email" | "phone" | "website")}
              className={`${
                obj.disable
                  ? "cursor-not-allowed text-gray-400"
                  : !editOn
                  ? "cursor-not-allowed text-gray-400"
                  : ""
              } outline-none focus:outline-green p-2 px-3 bg-divider rounded-lg`}
            />
            {obj.error && <p className="text-red text-sm">{obj.error}</p>}
          </div>
        ))}
      </section>
      <section className="md:row-span-2 lg:row-span-1 flex flex-col gap-2 px-2 md:mb-2">
        <h3 className="text-xl font-bold text-green border-b-2 border-green rounded-sm">
          Address
        </h3>
        {FormAttributes.address.map((obj) => (
          <div className="w-full flex flex-col gap-1" key={obj.labelText}>
            <label htmlFor={obj.fieldId} className="text-xs text-white">
              {obj.labelText}
            </label>
            <input
              type="text"
              disabled={obj.disable || !editOn}
              id={obj.fieldId}
              {...register(
                obj.registerName as
                  | "address.city"
                  | "address.suite"
                  | "address.street"
                  | "address.zipcode"
              )}
              className={`${
                obj.disable
                  ? "cursor-not-allowed text-gray-400"
                  : !editOn
                  ? "cursor-not-allowed text-gray-400"
                  : ""
              } outline-none focus:outline-green p-2 px-3 bg-divider rounded-lg`}
            />
            {obj.error && <p className="text-red text-sm">{obj.error}</p>}
          </div>
        ))}
      </section>
      <section className="md:row-span-2 lg:row-span-1 flex flex-col gap-2 px-2 mb-2 md:m-0">
        <h3 className="text-xl font-bold text-green border-b-2 border-green rounded-sm">
          Company
        </h3>
        {FormAttributes.company.map((obj) => (
          <div className="w-full flex flex-col gap-1" key={obj.labelText}>
            <label htmlFor={obj.fieldId} className="text-xs text-white">
              {obj.labelText}
            </label>
            <input
              type="text"
              disabled={obj.disable || !editOn}
              id={obj.fieldId}
              {...register(
                obj.registerName as
                  | "company.name"
                  | "company.bs"
                  | "company.catchPhrase"
              )}
              className={`${
                obj.disable
                  ? ""
                  : !editOn
                  ? "cursor-not-allowed text-gray-400"
                  : ""
              } outline-none focus:outline-green p-2 px-3 bg-divider rounded-lg`}
            />
            {obj.error && <p className="text-red text-sm">{obj.error}</p>}
          </div>
        ))}
      </section>
      <div className="md:row-span-1 flex gap-4 px-2">
        {error && <div className="text-red text-sm">{error}</div>}
        {editOn ? (
          <>
            <button
              className="px-3 p-2 bg-green hover:opacity-40 rounded-lg"
              type="submit"
            >
              Save
            </button>
            <div
              className="px-3 p-2 bg-green hover:opacity-40 rounded-lg"
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
            </div>
          </>
        ) : (
          <>
            <div className="bg-green hover:opacity-40 rounded-lg flex justify-center items-center">
              <Link href="/posts" className="px-3 p-2 text-md">
                Back
              </Link>
            </div>
            <div
              className="px-3 p-2 bg-green hover:opacity-40 rounded-lg text-md"
              onClick={(e) => setEditMode(true)}
            >
              Edit Profile
            </div>
          </>
        )}
      </div>
    </form>
  );
}
