import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CollapsiblePurchaseDetail({
  icon: Icon,
  summaryText,
  children,
}: {
  icon: IconType;
  summaryText: string;
  children?: ReactNode;
}) {
  const [isExtended, setIsExtended] = useState(false);

  return (
    <section className="flex flex-col gap-2 w-full lg:w-[300px] py-4 bg-white">
      <section className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <Icon />
          <h4>{summaryText}</h4>
        </span>
        {isExtended ? (
          <FaMinus
            onClick={() => setIsExtended(false)}
            className="cursor-pointer"
          />
        ) : (
          <FaPlus
            onClick={() => setIsExtended(true)}
            className="cursor-pointer"
          />
        )}
      </section>
      {isExtended && (
        <article className="text-sm opacity-80">{children}</article>
      )}
    </section>
  );
}
