"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { requestForToken, onMessageListener, init } from "@/utils/firebase";
import { Banner } from "@/components/Modal";

type NotificationBody = {
  title: string;
  body: string;
  url: string;
};

export default function NextProvider({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState<NotificationBody>({
    title: "",
    body: "",
    url: "",
  });
  useEffect(() => {
    init().then(async () => {
      let [success, failed] = await requestForToken();
      if (success) {
        onMessageListener()
          .then((payload: any) => {
            setOpen(true);
            setObj({
              title: payload?.notification?.title,
              body: payload?.notification?.body,
              url: payload?.data?.url,
            });
          })
          .catch((err) => console.log("failed: ", err));
      }
    });
  });

  return (
    <SessionProvider>
      <Banner
        title={obj?.title}
        body={obj?.body}
        url={obj?.url}
        open={open}
        toggle={() => setOpen(!open)}
      />
      {children}
    </SessionProvider>
  );
}
