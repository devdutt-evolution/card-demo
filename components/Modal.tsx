"use client";

import { createPortal } from "react-dom";
import {
  useEffect,
  useState,
  type MouseEventHandler,
  type PropsWithChildren,
} from "react";
import Image from "next/image";
import Link from "next/link";

function Portal({ children }: PropsWithChildren) {
  const modalRoot: HTMLElement | null = document.getElementById("modal-root");
  const [element] = useState(document.createElement("div"));
  useEffect(() => {
    modalRoot?.appendChild(element);

    return function cleanup() {
      modalRoot?.removeChild(element);
    };
  }, [modalRoot, element]);

  return createPortal(children, element);
}

export default function Modal({
  children,
  toggle,
  open,
}: PropsWithChildren & {
  toggle: MouseEventHandler;
  open: boolean;
}) {
  return (
    <Portal>
      {open && (
        <div
          className="absolute flex flex-col justify-center items-center top-0 left-0 w-[calc(100vw-0.7em)] bg-black bg-opacity-80"
          onClick={toggle}
        >
          <div className="h-[30vh]"></div>
          <div
            className="flex flex-col p-0 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-2xl absolute top-0 right-0 rounded-bl-[50%] rounded-tr-lg w-[40px] h-[40px] hover:bg-red"
              onClick={toggle}
              type="button"
            >
              &times;
            </button>
            {children}
          </div>
          <div className="h-[30vh]"></div>
        </div>
      )}
    </Portal>
  );
}

export function Banner({
  title,
  body,
  url,
  toggle,
}: {
  title?: string;
  body?: string;
  url: string;
  open?: boolean;
  toggle: Function;
}) {
  return (
    <Portal>
      <div
        className="absolute mt-4 w-full h-full top-0 left-0"
        onClick={(e) => toggle()}
      >
        <div className="min-w-60 flex p-5 gap-2 items-center rounded-lg bg-divider bg-opacity-90 mx-auto w-max">
          <Link href={url}>
            <Image
              width={100}
              height={100}
              src="/logo.svg"
              alt="logo"
              className="rounded-lg"
            />
          </Link>
          <Link href={url} className="min-w-36">
            <div className="w-max">
              <h3 className="mb-2 text-lg">{title}</h3>
              <p className="text-sm">{body}</p>
            </div>
          </Link>
        </div>
      </div>
    </Portal>
  );
}
