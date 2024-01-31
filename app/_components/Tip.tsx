"use client";

import NotificationIcon from "@/components/icons/NotificationIcon";
import Tippy from "@tippyjs/react";
import { type ReactNode, useState } from "react";
import type { Notification } from "./Notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";

const LIMIT = 10;

function createJsx(notifications: Notification[]): ReactNode {
  return notifications.map((notificationObj) => (
    <li
      key={notificationObj?._id}
      className={`cursor-default w-full ${
        !notificationObj.seen && "font-bold"
      }`}
    >
      <Link href={notificationObj?.url || ""}>
        <h4 className="text-sm text-green">{notificationObj?.title}</h4>
        <p className="text-sm">{notificationObj?.description}</p>
      </Link>
    </li>
  ));
}

export default function ContentElement({
  notifications: initialNotification,
}: {
  notifications: Notification[];
}) {
  const [notifications, setNotifications] = useState(initialNotification);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const { data: authData } = useSession();
  const router = useRouter();
  const notificationsCount =
    (notifications?.length > 0 &&
      notifications.filter((n) => n.seen == false).length) ||
    0;

  async function markSeen() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/notifications`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${authData?.user?.token}`,
        },
      }
    );

    if (res.status != 200) throw new Error("failed to mark as read");
    router.refresh();
  }

  async function getMoreNotifications() {
    if (!hasMore) {
      setLoading(false);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/notifications?_page=${page}&_limit=${LIMIT}`,
      {
        headers: { authorization: `Bearer ${authData?.user?.token}` },
      }
    );

    if (res.status != 200) {
      console.error("Failed to fetch more notifications");
      setLoading(false);
    }
    // if (res.status != 200) throw new Error("Failed to get more notifications");
    const data: { notifications: Notification[] } = await res.json();

    setPage((p) => p + 1);
    if (
      data.notifications &&
      data.notifications.length >= 0 &&
      data.notifications.length < 9
    )
      setHasMore(false);
    if (Array.isArray(data.notifications))
      setNotifications((noti) => [...noti, ...data.notifications]);
    setLoading(false);
  }

  return (
    <Tippy
      placement="bottom-end"
      hideOnClick={true}
      content={
        <div
          className="bg-card rounded-lg p-2 w-80 max-h-80 shadow-[0_0_30px_2px_#00875F] overflow-y-auto"
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            const scrollHeight = target.scrollHeight;
            const currentHeight =
              target.scrollTop + target.getBoundingClientRect().height;

            if (currentHeight + 1 > scrollHeight) {
              setLoading(true);
              getMoreNotifications();
            }
          }}
        >
          <div className="flex justify-between items-center text-sm text-place border-b-2 border-b-divider">
            <p className="w-max">LATEST</p>
            <p className="cursor-pointer w-max" onClick={(e) => markSeen()}>
              Mark all Seen
            </p>
          </div>
          {notifications?.length > 0 ? (
            <ul className="flex flex-col gap-2 w-full py-2">
              {createJsx(notifications)}
              {loading && (
                <li className="w-full flex justify-center items-center py-4">
                  <Loader />
                </li>
              )}
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
          <p className="absolute top-[4px] right-0 bg-red rounded-full text-xs min-w-4 h-4 text-center px-1">
            {notificationsCount > 9 ? "9+" : notificationsCount}
          </p>
        )}
      </div>
    </Tippy>
  );
}
