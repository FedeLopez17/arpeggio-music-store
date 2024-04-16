import { FaShoppingBag } from "react-icons/fa";

export default function CartButton({
  innerText,
  callBack,
  classes,
}: {
  innerText: string;
  callBack: () => void;
  classes?: string;
}) {
  return (
    <button
      type="button"
      className={`bg-slate-200 hover:bg-purple-200 h-10 w-48 text-sm ${classes}`}
      onClick={callBack}
    >
      <h4 className="flex items-center justify-center gap-2">
        <FaShoppingBag />
        {innerText}
      </h4>
    </button>
  );
}
