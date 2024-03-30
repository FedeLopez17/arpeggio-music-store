import HeroSlideshow from "../components/HeroSlideshow";
import MainCategoryCard from "../components/MainCategoryCard";
import keys from "../assets/images/categories/keys.png";
import piano from "../assets/images/categories/piano.png";
import electricGuitar from "../assets/images/categories/electric-guitar.png";
import acousticGuitar from "../assets/images/categories/acoustic-guitar.png";
import classicalGuitar from "../assets/images/categories/classical-guitar.png";
import bass from "../assets/images/categories/bass.png";
import guitarPedal from "../assets/images/categories/guitar-pedal.png";
import sax from "../assets/images/categories/sax.png";
import percussion from "../assets/images/categories/percussion.png";
import amp from "../assets/images/categories/amp.png";
import drums from "../assets/images/categories/drums.png";
import { CategoryCard } from "../types";
import ProductHighlights from "../components/ProductHighlights";
import Testimonials from "../components/Testimonials";

const CATEGORIES: CategoryCard[] = [
  { image: drums, linkTo: "/catalog/drums/1", text: "DRUMS" },
  { image: percussion, linkTo: "/catalog/percussion/1", text: "PERCUSSION" },
  { image: sax, linkTo: "/catalog/saxes/1", text: "SAXES" },
  {
    image: electricGuitar,
    linkTo: "/catalog/guitars_basses/electric/1",
    text: "ELECTRIC GUITARS",
  },
  {
    image: acousticGuitar,
    linkTo: "/catalog/guitars_basses/acoustic/1",
    text: "ACOUSTIC GUITARS",
  },
  {
    image: classicalGuitar,
    linkTo: "/catalog/guitars_basses/classical/1",
    text: "CLASSICAL GUITARS",
  },
  {
    image: bass,
    linkTo: "/catalog/guitars_basses/electric_basses/1",
    text: "BASSES",
  },
  { image: piano, linkTo: "/catalog/keys/pianos/1", text: "PIANOS" },
  { image: keys, linkTo: "/catalog/keys/keyboards/1", text: "KEYBOARDS" },
  { image: amp, linkTo: "/catalog/amplification/1", text: "AMPS" },
  { image: guitarPedal, linkTo: "/catalog/accessories/1", text: "ACCESSORIES" },
];

export default function HomePage() {
  return (
    <section className="flex flex-col items-center">
      <HeroSlideshow />
      <section className="w-full xl:w-[1280px] flex flex-col gap-4">
        <section className="w-full">
          <h1>Main Categories</h1>
          <section className="w-full bg-red-500 grid grid-cols-home-categories gap-1 justify-center justify-items-center py-4">
            {CATEGORIES.map((category) => (
              <MainCategoryCard
                key={category.image}
                image={category.image}
                linkTo={category.linkTo}
                text={category.text}
              />
            ))}
          </section>
        </section>
        <section className="w-full">
          <h1>Product Highlights</h1>
          <ProductHighlights />
        </section>
        <section className="w-full">
          <h1>In Your Own Words</h1>
          <Testimonials />
        </section>
      </section>
    </section>
  );
}
