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
    let result = await signIn("credentials", {
      callbackUrl: "/posts",
      redirect: false,
      email: data.email,
      password: data.password,
      fcmToken: localStorage.getItem("fcm_token"),
    });
    if (!result?.error) router.push("/posts");
    else setError(result.error);
  }
  const emailHandler = register("email", { required: "Email is required" });

  return (
    <form
      className="bg-card flex flex-col items-start justify-around w-full gap-4 p-5 rounded-lg"
      noValidate
      onSubmit={handleSubmit(login)}
    >
      <Input
        className={errors.email ? "outline-red" : ""}
        type="text"
        autoComplete="off"
        placeholder="email"
        {...emailHandler}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <Input
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
