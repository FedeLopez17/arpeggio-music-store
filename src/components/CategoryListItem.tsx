import { NavLink } from "react-router-dom";
import { CategoryType } from "../types";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function CategoryListItem({
  category,
}: {
  category: CategoryType;
}) {
  const [visibleSubcategories, setvisibleSubcategories] = useState(false);

  return (
    <li className="w-full">
      <section className="flex items-center justify-between">
        <NavLink
          to={`/catalog/${category.id}/1`}
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          {category.name}
        </NavLink>
        {visibleSubcategories ? (
          <FaAngleUp onClick={() => setvisibleSubcategories(false)} />
        ) : (
          <FaAngleDown onClick={() => setvisibleSubcategories(true)} />
        )}
      </section>
      {visibleSubcategories && (
        <ul>
          {category.subCategories.map((subCategory) => (
            <li key={subCategory.id}>
              <NavLink
                to={`/catalog/${category.id}/${subCategory.id}/1`}
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                {subCategory.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
