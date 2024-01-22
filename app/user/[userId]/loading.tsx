import Loader from "@/components/Loader";
import FallbackLayout from "./_component/FallbackLayout";

export default function Loading() {
  return (
    <FallbackLayout>
      <Loader />
    </FallbackLayout>
  );
}
