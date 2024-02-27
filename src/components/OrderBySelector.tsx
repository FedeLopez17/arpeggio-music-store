import { OrderByOption } from "../types";

export default function OrderBySelector({
  currentSelection,
  setOrderOption,
}: {
  currentSelection: OrderByOption;
  setOrderOption: (orderBy: OrderByOption) => void;
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
    <select
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
  );
}
