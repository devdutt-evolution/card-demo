import Image from "next/image";
import Link from "next/link";
import Notifications from "./Notifications";
import AuthButton from "@/components/AuthButton";
import { getServerSession } from "next-auth";
import { options } from "@/utils/options";
import Avatar from "./Avatar";

export default async function Header() {
  const authData = await getServerSession(options);

  return (
    <header className='grid grid-cols-3 w-full h-[100px] bg-card sticky top-0'>
      <Link
        className='flex gap-2 col-start-2 justify-center items-center'
        href='/'
      >
        <Image src='/logo.svg' alt='logo' width='65' height='61' />
        <div className='text-4xl flex justify-center items-center'>
          <p>કથાnak</p>
        </div>
      </Link>
      <div className='flex justify-end gap-4 items-center pr-4'>
        {authData?.user?.admin && (
          <Link
            href='/reported'
            className='px-4 py-2 text-white tracking-wide rounded-lg bg-red'
          >
            Reports
          </Link>
        )}
        {authData?.user && <Notifications />}
        <AuthButton />
        {authData?.user && (
          <Avatar
            username={authData.user?.name}
            profile={authData.user?.picture}
          />
        )}
      </div>
    </header>
  );
}
