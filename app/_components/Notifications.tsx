import { options } from "@/utils/options";
import { getServerSession } from "next-auth";
import Tip from "./Tip";

export type Notification = {
  _id: string;
  title: string;
  description: string;
  url: string;
  seen: boolean;
};

async function getNotificationsCount(token?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/notifications?_page=1&_limit=10`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  // if (res.status != 200) throw new Error("failed to fetch notifications");

  const data: { notifications: Notification[] } = await res.json();

  return data.notifications;
}

export default async function Notifications() {
  const authData = await getServerSession(options);
  const notifications = await getNotificationsCount(authData?.user?.token);

  return <Tip notifications={notifications} />;
}
