import type { Metadata } from "next";
import type { User } from "@/types/type.d";
import { options } from "@/utils/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserDetails } from "../user/[userId]/getUserDetails";
import EditableForm from "./_components/EditableForm";

export const metadata: Metadata = {
  title: "Profile",
  description: "User's profile",
};

export default async function Page() {
  const session = await getServerSession(options);
  if (!session) redirect("/login");

  const userId = session.user.id;

  const userDetails: User = await getUserDetails(userId, session?.user?.token);

  return <EditableForm userDetails={userDetails} />;
}
