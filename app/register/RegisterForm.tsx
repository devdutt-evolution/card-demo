"use client";

import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  async function register() {
    try {
      setLoading(true);
      let res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/register`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username: userName, password }),
      });
      setLoading(false);
      if (res.status == 201) router.push("/login");
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  }

  return (
    <form className="w-full bg-card rounded-lg flex flex-col gap-4 justify-around items-center py-8 ">
      <input
        className="outline-none focus:outline-green bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
        type="text"
        placeholder="username"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
          setError("");
        }}
      />
      <input
        className="outline-none focus:outline-green bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
      />
      <input
        className="outline-none focus:outline-green bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
      />
      <input
        className="outline-none focus:outline-green bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
        type="text"
        placeholder="confirm password"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
          setError("");
        }}
      />
      {passwordConfirm != "" && passwordConfirm != password && (
        <p className="text-red p-2">Passwords does not match.</p>
      )}
      {error && <p className="text-red p-2">{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        <button
          className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg"
          onClick={(e) => register()}
        >
          Register
        </button>
      )}
    </form>
  );
}
