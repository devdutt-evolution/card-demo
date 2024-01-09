"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, ReactNode, MouseEventHandler } from "react";

function Portal({ children }: { children: ReactNode }) {
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
}: {
  children: ReactNode;
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
