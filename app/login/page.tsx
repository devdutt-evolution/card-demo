"use client";
import Loader from "@/components/Loader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  const login: MouseEventHandler = async (e) => {
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
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] justify-center items-center w-2/5 text-white mx-auto">
      <form className="w-full bg-card rounded-lg flex flex-col gap-4 justify-around items-center py-8 ">
        <input
          className="bg-divider p-2 font-[#FFF] rounded-lg w-4/5 outline-none focus:outline-green"
          type="text"
          placeholder="email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          className="bg-divider p-2 font-[#FFF] rounded-lg w-4/5 outline-none focus:outline-green"
          type="password"
          placeholder="password"
          value={password}
          onChange={onPasswordChange}
        />
        {error && <p className="text-red p-2">{error}</p>}
        {loading ? (
          <Loader />
        ) : (
          <button
            className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg outline-none focus:outline-green"
            onClick={login}
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
}
