import { Link } from "react-router-dom";
import { CategoryCard } from "../types";
import { FaAngleRight } from "react-icons/fa";

export default function MainCategoryCard({
  image,
  text,
  linkTo,
}: CategoryCard) {
  return (
    <section className="relative w-[300px] box-border mt-[100px] bg-slate-100 flex flex-col justify-center items-center rounded-lg shadow-sm">
      <img
        src={image}
        alt="Main category"
        className="h-[220px] absolute top-[-110px] left-[40px] drop-shadow-category-instruments"
      />
      <h2 className="mt-[90px] font-bold">{text}</h2>
      <Link to={linkTo}>
        <section className="flex gap-1 justify-center items-center text-sm mb-5 text-gray-800 hover:text-purple-800 hover:font-bold">
          <p>SHOP</p> <FaAngleRight />
        </section>
      </Link>
    </section>
  );
}
