"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { onMessageListener, requestForToken } from "@/utils/firebase";

function PushNotificationLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  if (mounted) {
    onMessageListener();
  }
  
  useEffect(() => {
    setToken();
    async function setToken() {
      try {
        requestForToken();
        setMounted(true);
        // toast(
        //   <div onClick={() => router.push(message?.data?.url)}>
        //     <h5>{JSON.stringify(message)}</h5>
        //     <h6>{JSON.stringify(message)}</h6>
        //   </div>,
        //   {
        //     closeOnClick: false,
        //   }
        // );
      } catch (error) {
        console.log(error);
      }
    }
  }, [router]);

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;
