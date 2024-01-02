import { User } from "@/types/type.d";
import Link from "next/link";

const fetchUserDetails = async (userId: string) => {
  let data = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  let user: User = await data.json();
  return user;
};

export default async function UserDetails({
  params,
}: {
  params: { userId: string };
}) {
  const user = await fetchUserDetails(params.userId);

  if (!user) {
    return (
      <div className="flex justify-center items-center w-3/5 text-white mx-auto h-max">
        <p className="text-2xl">No Such User</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-3/5 text-white mx-auto h-max">
      <div className="flex flex-col gap-y-2 bg-card rounded-lg py-6 px-8 m-2">
        <h2 className="text-2xl pb-5 w-max font-bold">{user.name}</h2>
        <p>username: {user.username}</p>
        <p>
          email:&nbsp;
          <a href={`to:${user.email}`} className="hover:text-hgreen">
            {user.email}
          </a>
        </p>
        <p>
          phone:&nbsp;
          <a href={`tel:${user.phone}`} className="hover:text-hgreen">
            {user.phone}
          </a>
        </p>
        <p>
          website:&nbsp;
          <a href={user.website} className="hover:text-hgreen">
            {user.website}
          </a>
        </p>
        <div className="border-2 border-divider mt-8 mb-6"></div>
        <div className="flex gap-x-4 items-center mb-8">
          <div className="flex flex-col w-2/4 gap-y-1 border-r-2 border-divider">
            <h3 className="text-2xl mb-2 text-hgreen">Company</h3>
            <p>name:&nbsp;{user.company.name}</p>
            <p>catchPhrase:&nbsp;{user.company.catchPhrase}</p>
            <p>bs:&nbsp;{user.company.bs}</p>
          </div>
          <div className="flex flex-col  w-2/4 gap-y-1 ">
            <h3 className="text-2xl mb-2 text-hgreen">Address</h3>
            <p>street:&nbsp;{user.address.street}</p>
            <p>suite:&nbsp;{user.address.suite}</p>
            <p>city:&nbsp;{user.address.city}</p>
            <p>zipcode:&nbsp;{user.address.zipcode}</p>
          </div>
        </div>
        <Link href="/posts">
          <button className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg">
            &nbsp;Back&nbsp;
          </button>
        </Link>
      </div>
    </div>
  );
}