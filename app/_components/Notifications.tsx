import { options } from "@/utils/options";
import { getServerSession } from "next-auth";
import ContentElement from "./Tips";

export type Notification = {
  _id: string;
  title: string;
  description: string;
};

async function getNotificationsCount(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/notifications`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status != 200) throw new Error("failed to fetch notifications");

  const data: { notifications: Notification[] } = await res.json();

  return data.notifications;
}

export default async function Notifications() {
  const authData = await getServerSession(options);
  const tokener: any = authData?.user;

  const notifications = await getNotificationsCount(tokener.token);

  return <ContentElement notifications={notifications} />;
}
