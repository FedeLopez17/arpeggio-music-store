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
      left: scrollRight ? 298 : -298,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex justify-between">
      <section className="flex justify-center items-center">
        <FaAngleLeft
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => scrollProducts(false)}
        />
      </section>
      <section
        className="flex overflow-auto box-border w-[298px] sm:w-[596px] lg:w-[894px] xl:w-[1192px] pb-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-thumb-rounded-lg"
        ref={scrollSectionRef}
      >
        {productHighlights.map((product) => (
          <Product product={product} key={product.slug} classes="mx-1" />
        ))}
      </section>
      <section className="flex justify-center items-center">
        <FaAngleRight
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => scrollProducts(true)}
        />
      </section>
    </section>
  );
}
