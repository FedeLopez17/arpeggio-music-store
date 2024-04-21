import { FaFilter } from "react-icons/fa";
import { OrderByOption } from "../types";

export default function OrderBySelector({
  currentSelection,
  setOrderOption,
  classes,
}: {
  currentSelection: OrderByOption;
  setOrderOption: (orderBy: OrderByOption) => void;
  classes?: string;
}) {
  const ORDER_OPTIONS: OrderByOption[] = [
    "Price: low to high",
    "Price: high to low",
    "Best rated first",
    "Brand",
    "Alphabet (A-Z)",
    "Alphabet (Z-A)",
  ];
  return (
    <section
      className={`bg-slate-200 flex gap-2 justify-start items-center p-2 border-2 border-transparent focus-within:border-slate-600 px-3 rounded-lg ${classes}`}
    >
      <FaFilter />
      <select
        className="bg-inherit focus-visible:outline-0 text-sm"
        value={currentSelection}
        onChange={(event) =>
          setOrderOption(event.currentTarget.value as OrderByOption)
        }
      >
        {ORDER_OPTIONS.map((orderOption) => (
          <option key={orderOption} value={orderOption}>
            {orderOption}
          </option>
        ))}
      </select>
    </section>
  );
}
