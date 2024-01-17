"use client";

import Button from "@/components/Button";
import ErrorText from "@/components/ErrorText";
import { Input } from "@/components/Input";
import Loader from "@/components/Loader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
    setFocus,
  } = useForm<FormData>();

  const [error, setError] = useState("");

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  async function login(data: FormData) {
      console.log(data);
      let result = await signIn("credentials", {
        callbackUrl: "/posts",
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!result?.error) router.push("/posts");
      else setError(result.error);
  }
  const what = register("email", { required: "Email is required" });

  return (
    <form
      className="bg-card flex flex-col items-start justify-around w-full gap-4 px-4 py-8 rounded-lg"
      noValidate
      onSubmit={handleSubmit(login)}
    >
      <Input
        className={errors.email ? "outline-red" : ""}
        type="text"
        autoComplete="off"
        placeholder="email"
        {...what}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <Input
        // className="bg-divider p-2 font-[#FFF] rounded-lg w-4/5 outline-none focus:outline-green"
        type="password"
        placeholder="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      {error && <ErrorText>{error}</ErrorText>}
      {isLoading ? <Loader /> : <Button type="submit">Login</Button>}
    </form>
  );
}
