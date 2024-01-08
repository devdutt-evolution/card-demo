"use client";
import CheckAuth from "@/components/CheckAuth";
import { User } from "@/types/type.d";
import Link from "next/link";
import { useEffect, useState } from "react";

const fetchUserDetails = async (userId: string, token: string) => {
  if (token) {
    let data = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/user/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    let user: { user: User } = await data.json();
    return user.user;
  }
};

export default function UserDetails({
  params,
}: {
  params: { userId: string };
}) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    let token = window.localStorage.getItem("token") as string;
    fetchUserDetails(params.userId, token).then((data) => {
      setUser(data);
    });
  }, [params.userId]);

  if (!user) {
    return (
      <div className="flex justify-center items-center w-3/5 text-white mx-auto h-max">
        <CheckAuth>
          <div className="bg-card rounded-lg py-6 px-8 m-2 w-full text-2xl h-[calc(100vh-130px)] flex gap-2 justify-center items-center">
            <Link href="/posts">
              <p className="py-1 px-3 rounded-lg bg-green">&larr;</p>
            </Link>
            <p>No Such User</p>
          </div>
        </CheckAuth>
      </div>
    );
  }

  return (
    <CheckAuth>
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
    </CheckAuth>
  );
}
