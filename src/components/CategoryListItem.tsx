import { Link, useLocation } from "react-router-dom";
import { CategoryType } from "../types";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import SubCategoryListItem from "./SubCategoryListItem";

export default function CategoryListItem({
  category,
}: {
  category: CategoryType;
}) {
  const [visibleSubCategories, setVisibleSubCategories] = useState(true);
  const { pathname } = useLocation();

  const categoryLinkTo = `/catalog/${category.id}/1`;
  const categoryLinkActive = pathname.includes(`/catalog/${category.id}/`);

  return (
    <li
      className={`w-full box-border px-2 ${visibleSubCategories ? "mb-4" : ""}`}
    >
      <section className="flex items-center justify-between bg-white">
        <Link
          to={categoryLinkTo}
          className={`${categoryLinkActive ? "font-bold" : ""}`}
        >
          {category.name}
        </Link>
        {visibleSubCategories ? (
          <FaMinus
            onClick={() => setVisibleSubCategories(false)}
            className="cursor-pointer w-3 h-3"
          />
        ) : (
          <FaPlus
            onClick={() => setVisibleSubCategories(true)}
            className="cursor-pointer w-3 h-3"
          />
        )}
      </section>
      {visibleSubCategories && (
        <ul className="flex flex-col gap-[1px]">
          {category.subCategories.map((subCategory) => (
            <SubCategoryListItem
              key={subCategory.id}
              subCategory={subCategory}
              categoryId={category.id}
              pathname={pathname}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
