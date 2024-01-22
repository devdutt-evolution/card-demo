import FallbackLayout from "@/components/FallbackLayout";
import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <FallbackLayout>
      <Loader />
    </FallbackLayout>
  );
}
