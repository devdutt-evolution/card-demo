import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to demo project",
};

export default function Login() {
  return (
    <div className="flex h-[calc(100vh-120px)] justify-center items-center w-full sm:w-3/5 md:w-2/5 mx-auto">
      <LoginForm />
    </div>
  );
}
