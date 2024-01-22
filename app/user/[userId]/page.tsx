import { notFound } from "next/navigation";
import UserDetails from "./_component/UserDetails";

export default function Page({ params }: { params: { userId: string } }) {
  if (!params.userId) notFound();

  return <UserDetails userId={params.userId} />;
}
