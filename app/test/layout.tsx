"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
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
        await requestForToken();
        setMounted(true);
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
