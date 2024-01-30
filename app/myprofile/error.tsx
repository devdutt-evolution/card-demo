"use client";

export default function Error() {
  return (
    <div className="flex justify-center min-h-60 flex-col gap-2 items-center">
      <h3 className="text-2xl text-red font-roboto font-bold">
        Failed to load profile
      </h3>
    </div>
  );
}
