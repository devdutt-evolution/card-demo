import { options } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/types/type.d";
import { getServerSession } from "next-auth";

async function getData(id: string, token: string) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  let user: { user: User } = await data.json();

  return user?.user;
}

export default async function UserData({ userId }: { userId: string }) {
  const session = await getServerSession(options);
  const token: any = session?.user;
  const user = await getData(userId, token?.token);

  return (
    <>
      <h2 className="text-2xl pb-5 w-max font-bold">{user?.name}</h2>
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
      <div className="border-2 border-divider mt-8 mb-6"></div>
      <div className="flex gap-x-4 items-center mb-8">
        {user?.company && (
          <div className="flex flex-col w-2/4 gap-y-1 border-r-2 border-divider">
            <h3 className="text-2xl mb-2 text-hgreen">Company</h3>
            <p>name:&nbsp;{user.company?.name}</p>
            <p>catchPhrase:&nbsp;{user.company?.catchPhrase}</p>
            <p>bs:&nbsp;{user.company?.bs}</p>
          </div>
        )}
        {user?.address && (
          <div className="flex flex-col  w-2/4 gap-y-1 ">
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
