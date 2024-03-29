import { Link } from "react-router-dom";
import { CategoryCard } from "../types";
import { FaAngleRight } from "react-icons/fa";

export default function MainCategoryCard({
  image,
  text,
  linkTo,
}: CategoryCard) {
  return (
    <section className="relative w-[260px] box-border mt-[100px] bg-gray-400 flex flex-col justify-center items-center">
      <img
        src={image}
        alt="Main category"
        className="h-[220px] absolute top-[-110px] left-[20px] drop-shadow-category-instruments"
      />
      <h2 className="mt-[90px] font-bold">{text}</h2>
      <Link to={linkTo}>
        <section className="flex gap-1 justify-center items-center text-sm mb-5">
          <p className="text-gray-800">SHOP</p> <FaAngleRight />
        </section>
      </Link>
    </section>
  );
}
