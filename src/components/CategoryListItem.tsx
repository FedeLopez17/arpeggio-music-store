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
  const [outerNavLinkActive, setOuterNavLinkActive] = useState(false);

  // This method returns a string so that it can be called when setting the className
  const updateActiveStateReturnString = (isActive: boolean) => {
    setOuterNavLinkActive(isActive);
    return "";
  };

  return (
    <li className="w-full">
      <section
        className={`flex items-center justify-between ${
          outerNavLinkActive ? "bg-red-500" : ""
        }`}
      >
        <NavLink
          to={`/catalog/${category.id}`}
          className={({ isActive }) => updateActiveStateReturnString(isActive)}
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
                to={`/catalog/${category.id}/${subCategory.id}`}
                className={({ isActive }) => (isActive ? "bg-red-500" : "")}
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
