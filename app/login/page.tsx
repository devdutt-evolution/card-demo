"use client";
import Loader from "@/components/Loader";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (token) redirect("/posts");
  }, [router]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
      redirect("/posts");
    }
  }, [token]);

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  const login: MouseEventHandler = (e) => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/signin`, {
        email,
        password,
      })
      .then((data) => {
        setToken(data.data.token);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "AxiosError") setError(err.response.data.message);
        setLoading(false);
      });
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
