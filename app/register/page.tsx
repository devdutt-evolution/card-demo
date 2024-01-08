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

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  const onPasswordConfirmChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPasswordConfirm(e.target.value);
    setError("");
  };
  const onUserNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserName(e.target.value);
    setError("");
  };
  const register: MouseEventHandler = (e) => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/register`, {
        email,
        username: userName,
        password,
      })
      .then((data) => {
        setLoading(false);
        router.push("/login");
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
          className="bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
          type="text"
          placeholder="username"
          value={userName}
          onChange={onUserNameChange}
        />
        <input
          className="bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
          type="text"
          placeholder="email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          className="bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
          type="password"
          placeholder="password"
          value={password}
          onChange={onPasswordChange}
        />
        <input
          className="bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
          type="text"
          placeholder="confirm password"
          value={passwordConfirm}
          onChange={onPasswordConfirmChange}
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
            onClick={register}
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
}
