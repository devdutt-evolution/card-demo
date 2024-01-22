import { options } from "@/utils/options";
import { getServerSession } from "next-auth";
import { getUserDetails } from "../getUserDetails";
import { notFound } from "next/navigation";

export default async function UserDetails({ userId }: { userId: string }) {
  const session = await getServerSession(options);
  const token: any = session?.user;
  const user = await getUserDetails(userId, token?.token);

  if (!user) return notFound();

  return (
    <>
      <h2 className="text-2xl pb-5 font-bold">{user?.name}</h2>
      <p>username: {user?.username}</p>
      <p>
        email:&nbsp;
        <a href={`to:${user?.email}`} className="hover:text-hgreen">
          {user?.email}
        </a>
      </p>
      <p>
        phone:&nbsp;
        <a href={`tel:${user?.phone}`} className="hover:text-hgreen">
          {user?.phone}
        </a>
      </p>
      <p>
        website:&nbsp;
        <a href={user?.website} className="hover:text-hgreen">
          {user?.website}
        </a>
      </p>
      <div className="border-2 border-divider mt-8 "></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:mt-2">
        {user?.company && (
          <div className="flex flex-col gap-1 mb-6 mt-2 sm:m-0">
            <h3 className="text-2xl mb-2 text-hgreen">Company</h3>
            <p>name:&nbsp;{user.company?.name}</p>
            <p>catchPhrase:&nbsp;{user.company?.catchPhrase}</p>
            <p>bs:&nbsp;{user.company?.bs}</p>
          </div>
        )}
        {user?.address && (
          <div className="flex flex-col gap-1 sm:border-l-2 sm:border-divider sm:pl-2 mb-6">
            <h3 className="text-2xl mb-2 text-hgreen">Address</h3>
            <p>street:&nbsp;{user.address?.street}</p>
            <p>suite:&nbsp;{user.address?.suite}</p>
            <p>city:&nbsp;{user.address?.city}</p>
            <p>zipcode:&nbsp;{user.address?.zipcode}</p>
          </div>
        )}
      </div>
    </>
  );
}
