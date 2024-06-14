import piano from "../assets/images/hero-slideshow/piano.png";
import acousticGuitar from "../assets/images/hero-slideshow/acoustic-guitar.png";
import strat from "../assets/images/hero-slideshow/strat.png";
import bass from "../assets/images/hero-slideshow/bass.png";
import drums from "../assets/images/hero-slideshow/drums.png";
import sax from "../assets/images/hero-slideshow/sax.png";
import hollowBody from "../assets/images/hero-slideshow/hollow-body.png";
import { useEffect, useRef, useState } from "react";
import { HeroImage } from "../types";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { randomArrIndex } from "../utils";

const HERO_IMAGES: HeroImage[] = [
  {
    src: strat,
    alt: "Stratocaster guitar",
    linkTo: "/catalog/guitars_basses/electric/1",
  },
  {
    src: acousticGuitar,
    alt: "Acoustic guitar",
    linkTo: "/catalog/guitars_basses/acoustic/1",
  },
  { src: piano, alt: "Piano", linkTo: "/catalog/keys/1" },
  {
    src: bass,
    alt: "Bass guitar",
    linkTo: "/catalog/guitars_basses/electric_basses/1",
  },
  {
    src: drums,
    alt: "Drums",
    linkTo: "/catalog/drums/1",
  },
  {
    src: sax,
    alt: "Sax",
    linkTo: "/catalog/saxes/1",
  },
  {
    src: hollowBody,
    alt: "Hollow-body guitar",
    linkTo: "/catalog/guitars_basses/electric/1",
  },
];

export default function HeroSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    randomArrIndex(HERO_IMAGES)
  );
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(showNextImage, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const isLastImage = prevIndex === HERO_IMAGES.length - 1;
      return isLastImage ? 0 : prevIndex + 1;
    });
    setAnimate(true);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? HERO_IMAGES.length - 1 : prevIndex - 1
    );
    setAnimate(true);
  };

  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const onTouchStart = (event: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = event.targetTouches[0].clientX;
  };

  const onTouchMove = (event: React.TouchEvent) => {
    touchEnd.current = event.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const MIN_SWIPE_DISTANCE = 50;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (isLeftSwipe) {
      showNextImage();
    } else if (isRightSwipe) {
      showPreviousImage();
    }
  };

  const currentImage = HERO_IMAGES[currentImageIndex];
  return (
    <section
      className="xl:h-[500px] flex items-end overflow-hidden relative bg-black after:block after:w-full after:h-full after:absolute after:bg-radial-gradient-hero-slideshow after:pointer-events-none select-none"
      data-testid="hero-slideshow"
    >
      <Link to={currentImage.linkTo} className=" cursor-default">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className={animate ? "animate-fade-in" : ""}
          data-testid={`image-${currentImageIndex}`}
          onAnimationEnd={() => setAnimate(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </Link>
      <FaAngleLeft
        className="text-white absolute z-20 left-2 top-[calc(50%-18px)] w-9 h-9 cursor-pointer"
        onClick={showPreviousImage}
        title="Previous"
      />
      <FaAngleRight
        className="text-white absolute z-20 right-2 top-[calc(50%-18px)] w-9 h-9 cursor-pointer"
        onClick={showNextImage}
        title="Next"
      />
    </section>
  );
}
