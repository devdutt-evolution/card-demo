import type { PropsWithChildren } from "react";

export default function ErrorText({ children }: PropsWithChildren) {
  return <p className=" text-red text-sm">{children}</p>;
}
