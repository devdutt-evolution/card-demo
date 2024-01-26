import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Register you account in demo project",
};

export default function Register() {
  return (
    <div className="flex h-[calc(100vh-120px)] justify-center items-center w-full mx-auto sm:w-3/5 md:w-2/5">
      <RegisterForm />
    </div>
  );
}
