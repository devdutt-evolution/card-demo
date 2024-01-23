import { options } from "@/utils/options";
import { getServerSession } from "next-auth";
import NotificationIcon from "@/components/icons/NotificationIcon";

export default async function Notifications() {
  const authData = await getServerSession(options);
  const tokener: any = authData?.user;

  // const notificationsCount = await getNotificationsCount(tokener.token);
  const notificationsCount = 8;

  return (
    <div className="relative w-max flex justify-center items-center">
      <NotificationIcon />
      {notificationsCount > 0 && (
        <p className="absolute top-[4px] right-0 bg-red rounded-full text-xs w-4 h-4 text-center">
          {notificationsCount > 9 ? "9+" : notificationsCount}
        </p>
      )}
    </div>
  );
}
