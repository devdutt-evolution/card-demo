"use client";

import Loader from "@/components/Loader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    try {
      setLoading(true);
      let result = await signIn("credentials", {
        callbackUrl: "/posts",
        redirect: false,
        email,
        password,
      });
      setLoading(false);
      if (!result?.error) router.push("/posts");
      else setError(result.error);
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  }

  return (
    <form className="w-full bg-card rounded-lg flex flex-col gap-4 justify-around items-center py-8 ">
      <input
        className="bg-divider p-2 font-[#FFF] rounded-lg w-4/5 outline-none focus:outline-green"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
      />
      <input
        className="bg-divider p-2 font-[#FFF] rounded-lg w-4/5 outline-none focus:outline-green"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
      />
      {error && <p className="text-red p-2">{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        <button
          className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg outline-none focus:outline-green"
          onClick={(e) => login()}
        >
          Login
        </button>
      )}
    </form>
  );
}
