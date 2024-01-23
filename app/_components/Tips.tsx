"use client";

import NotificationIcon from "@/components/icons/NotificationIcon";
import Tippy from "@tippyjs/react";
import { ReactNode } from "react";
import type { Notification } from "./Notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function createJsx(notifications: Notification[]): ReactNode {
  return notifications.map((notificationObj) => (
    <li key={notificationObj._id} className="cursor-default w-full">
      <Link href={notificationObj.url}>
        <h4 className="text-sm font-bold text-green">
          {notificationObj.title}
        </h4>
      <p className="text-sm">{notificationObj.description}</p>
      </Link>
    </li>
  ));
}

export default function ContentElement({
  notifications,
}: {
  notifications: Notification[];
}) {
  const { data: authData } = useSession({ required: true });
  const router = useRouter();
  const tokener: any = authData?.user;
  const notificationsCount = notifications.length;

  async function markSeen() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/notifications`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${tokener.token}`,
        },
      }
    );

    if (res.status != 200) throw new Error("failed to mark as read");
    router.refresh();
  }

  return (
    <Tippy
      placement="bottom-end"
      content={
        <div className="bg-card rounded-lg p-2 w-80 max-h-80 shadow-[0_0_30px_2px_#00875F] overflow-y-auto">
          <div className="flex justify-between items-center text-sm text-place border-b-2 border-b-divider">
            <p className="w-max">LATEST</p>
            <p className="cursor-pointer w-max" onClick={(e) => markSeen()}>
              Mark all Seen
            </p>
          </div>
          {notificationsCount > 0 ? (
            <ul className="flex flex-col gap-2 w-full py-2">
              {createJsx(notifications)}
            </ul>
          ) : (
            <p className="text-sm pt-2">No Recent Activity</p>
          )}
        </div>
      }
      interactive={true}
    >
      <div className="relative w-max flex justify-center items-center cursor-pointer">
        <NotificationIcon />
        {notificationsCount > 0 && (
          <p className="absolute top-[4px] right-0 bg-red rounded-full text-xs w-4 h-4 text-center">
            {notificationsCount > 9 ? "9+" : notificationsCount}
          </p>
        )}
      </div>
    </Tippy>
  );
}
