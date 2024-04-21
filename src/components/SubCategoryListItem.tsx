import { NameAndId } from "../types";
import { Link } from "react-router-dom";

export default function SubCategoryListItem({
  subCategory,
  categoryId,
  pathname,
}: {
  subCategory: NameAndId;
  categoryId: string;
  pathname: string;
}) {
  const subCategoryLinkTo = `/catalog/${categoryId}/${subCategory.id}/1`;
  const linkActive = pathname.includes(`/${categoryId}/${subCategory.id}/`);

  return (
    <li
      key={subCategory.id}
      className="bg-white border-t-[1px] border-t-slate-200 w-full text-sm text-[rgba(0,0,0,0.85)] py-1"
    >
      <Link to={subCategoryLinkTo} className={linkActive ? "font-bold" : ""}>
        {subCategory.name}
      </Link>
    </li>
  );
}
