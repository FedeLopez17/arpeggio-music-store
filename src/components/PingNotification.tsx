export default function PingNotification({
  customClasses,
}: {
  customClasses?: string;
}) {
  return (
    <>
      <span
        className={`absolute bg-red-600 w-2 aspect-square rounded-full top-[-3px] right-[-2px] animate-ping ${customClasses}`}
      ></span>
      <span
        className={`absolute bg-red-600 w-2 aspect-square rounded-full top-[-3px] right-[-2px] ${customClasses}`}
      ></span>
    </>
  );
}
