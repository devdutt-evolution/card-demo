"use client";

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
      className="w-full bg-card rounded-lg flex flex-col gap-4 justify-center items-center p-5"
      noValidate
      onSubmit={handleSubmit(registerUser)}
    >
      <input
        className="outline-none focus:outline-green bg-divider px-3 p-2 font-[#FFF] rounded-lg w-full"
        type="text"
        placeholder="username"
        {...register("username", { required: "Username is required" })}
      />
      {errors.username && (
        <p className="text-red p-2">{errors.username.message}</p>
      )}
      <input
        className="outline-none focus:outline-green bg-divider px-3 p-2 font-[#FFF] rounded-lg w-full"
        type="text"
        placeholder="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p className="text-red p-2">{errors.email.message}</p>}
      <input
        className="outline-none focus:outline-green bg-divider px-3 p-2 font-[#FFF] rounded-lg w-full"
        type="password"
        placeholder="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <p className="text-red p-2">{errors.password.message}</p>
      )}
      <input
        className="outline-none focus:outline-green bg-divider px-3 p-2 font-[#FFF] rounded-lg w-full"
        type="text"
        placeholder="confirm password"
        {...register("confirmPassword", {
          required: "Confirm the password",
          validate: {
            checkPassword: (value, values) => {
              if (value == values.password) return value;
              else throw new Error("Passwords does not match");
            },
          },
        })}
      />
      {errors.confirmPassword && (
        <p className="text-red p-2">{errors.confirmPassword.message}</p>
      )}
      {error && <p className="text-red p-2">{error}</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <button
          className="bg-green hover:bg-opacity-20 px-4 py-2 rounded-lg w-full"
          type="submit"
        >
          Register
        </button>
      )}
    </form>
  );
}
