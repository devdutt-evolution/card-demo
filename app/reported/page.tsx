import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Reported() {
  const session = await getServerSession();

  if (!session?.user.admin) redirect("/posts");

  return <>HI</>;
}
