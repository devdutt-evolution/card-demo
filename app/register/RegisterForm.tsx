"use client";

import Button from "@/components/Button";
import ErrorText from "@/components/ErrorText";
import { Input } from "@/components/Input";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormBody = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<FormBody>();
  const [error, setError] = useState("");

  async function registerUser(data: FormBody) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
      }),
    });
    if (res.status == 201) router.push("/login");
    else {
      let data = await res.json();
      setError(data?.message || "Registration Failed");
    }
  }

  return (
    <form
      className="w-full bg-card rounded-lg flex flex-col gap-4 justify-center items-start p-5"
      noValidate
      onSubmit={handleSubmit(registerUser)}
    >
      <Input
        className="outline-none focus:outline-green bg-divider px-3 p-2 font-[#FFF] rounded-lg w-full"
        type="text"
        autoComplete="off"
        placeholder="username"
        {...register("username", { required: "Username is required" })}
      />
      {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
      <Input
        className="outline-none focus:outline-green bg-divider px-3 p-2 font-[#FFF] rounded-lg w-full"
        type="text"
        autoComplete="off"
        placeholder="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <Input
        className="outline-none focus:outline-green bg-divider px-3 p-2 font-[#FFF] rounded-lg w-full"
        type="password"
        autoComplete="off"
        placeholder="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      <Input
        className="outline-none focus:outline-green bg-divider px-3 p-2 font-[#FFF] rounded-lg w-full"
        type="text"
        placeholder="confirm password"
        autoComplete="off"
        {...register("confirmPassword", {
          required: "Confirm the password",
          validate: {
            checkPassword: (value, values) => {
              if (value == values.password) return true;
              else return "Passwords does not match";
            },
          },
        })}
      />
      {errors.confirmPassword && (
        <ErrorText>{errors.confirmPassword.message}</ErrorText>
      )}
      {error && <ErrorText>{error}</ErrorText>}
      {isLoading ? (
        <Loader />
      ) : (
        <Button type="submit" className="w-full">
          Register
        </Button>
      )}
    </form>
  );
}
