import Loader from "@/components/Loader";

export default async function Loading() {
  return (
    <div className="flex justify-center min-h-60 flex-col gap-2 items-center">
      <Loader />
    </div>
  );
}
