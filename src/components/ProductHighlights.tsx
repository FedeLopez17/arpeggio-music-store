import { useRef } from "react";
import { getHighlitedProducts } from "../catalogManager";
import Product from "./ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function ProductHighlights() {
  const productHighlights = getHighlitedProducts(15);
  const scrollSectionRef = useRef<HTMLElement>(null);

  const scrollProducts = (scrollRight: boolean) => {
    if (!scrollSectionRef.current) return;

    scrollSectionRef.current.scrollBy({
      top: 0,
      left: scrollRight ? 306 : -306,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex gap-4">
      <section className="bg-red-600 flex justify-center items-center">
        <FaAngleLeft
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => scrollProducts(false)}
        />
      </section>
      <section
        className="flex overflow-auto gap-2 box-border px-2 bg-green-400"
        ref={scrollSectionRef}
      >
        {productHighlights.map((product) => (
          <Product product={product} key={product.slug} />
        ))}
      </section>
      <section className="bg-red-600 flex justify-center items-center">
        <FaAngleRight
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => scrollProducts(true)}
        />
      </section>
    </section>
  );
}
