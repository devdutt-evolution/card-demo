import Loader from "@/components/Loader";
import FallbackLayout from "@/components/FallbackLayout";

export default function Loading() {
  return (
    <FallbackLayout>
      <Loader />
    </FallbackLayout>
  );
}
