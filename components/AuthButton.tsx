"use client";

import { usePathname, useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

export default function AuthButton() {
  const path = usePathname();
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    let token = window.localStorage.getItem("token") as string;
    setToken(token);
  }, []);

  const handleClick: MouseEventHandler = (e) => {
    if (path == "/register" && !token) {
      router.push("/login");
    } else if (path == "/login" && !token) {
      router.push("/register");
    } else {
      window.localStorage.removeItem("token");
      router.replace("/login");
    }
  };

  return (
    <div
      className="flex justify-center items-center w-min px-3 py-2 cursor-pointer text-[#fff] bg-green rounded-lg absolute top-50% translate-x-[-50%] right-0 hover:bg-hgreen"
      onClick={handleClick}
    >
      {path == "/register" && !token ? (
        <p>Login</p>
      ) : path == "/login" && !token ? (
        <p>Register</p>
      ) : (
        <p>Logout</p>
      )}
    </div>
  );
}
