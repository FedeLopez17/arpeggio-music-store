export default function ImageLoadingSkeleton({
  classes,
}: {
  classes?: string;
}) {
  return (
    <section
      data-testid="image-loading-skeleton"
      className={`bg-gray-300 flex-grow animate-pulse ${classes || ""}`}
    ></section>
  );
}
