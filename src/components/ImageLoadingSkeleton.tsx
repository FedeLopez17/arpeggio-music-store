export default function ImageLoadingSkeleton({
  classes,
}: {
  classes?: string;
}) {
  return (
    <section
      className={`bg-gray-300 flex-grow animate-pulse ${classes || ""}`}
    ></section>
  );
}
