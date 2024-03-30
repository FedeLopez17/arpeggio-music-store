import federico from "../assets/images/testimonials/federico-lopez.png";
import kyra from "../assets/images/testimonials/kyra-best.png";
import aadya from "../assets/images/testimonials/aadya-dewan.png";
import clark from "../assets/images/testimonials/clark-sawyer.png";

import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const TESTIMONIALS = [
  {
    name: "Federico López",
    role: "Guitarist",
    text: "Fabulous service. On time and everything in perfect condition. Very impressed - once again!",
    picture: federico,
  },
  {
    name: "Kyra Best",
    role: "Pianist",
    text: "The service from Arpeggio is always outstanding and I highly recommend you to all my musician friends!",
    picture: kyra,
  },
  {
    name: "Aadya Dewan",
    role: "Bassist",
    text: "Thanks for the speedy delivery of my order, couldn't be happier. Excellent service, will be buying from you again. Thanks again!",
    picture: aadya,
  },
  {
    name: "Clark Sawyer",
    role: "Drummer",
    text: "A big thank you for the brilliant service you give. My new cymbals arrived to me in the UK in less than a week, packaged perfectly.",
    picture: clark,
  },
];

function Testimonial({
  clientImage,
  testimonial,
  clientName,
  clientRole,
}: {
  clientImage: string;
  testimonial: string;
  clientName: string;
  clientRole: string;
}) {
  return (
    <section className="relative w-[calc(100%-16px)] sm:w-[360px] bg-blue-300 mt-[50px] flex flex-col justify-between mx-2 sm:mx-4 flex-grow-0 flex-shrink-0">
      <section className="bg-red-400 rounded-full w-[100px] h-[100px] absolute top-[-50px] flex items-center overflow-hidden left-[calc(50%-50px)]">
        <img
          src={clientImage}
          alt={`${clientName}'s picture`}
          className="w-full h-fit"
        />
      </section>
      <section className="box-border px-8 mt-[60px] flex justify-center">
        <p className="text-justify">
          <BiSolidQuoteAltLeft className="inline-block mr-1 relative bottom-2 w-4" />
          {testimonial}
          <BiSolidQuoteAltRight className=" inline-block ml-1 relative bottom-2 w-4" />
        </p>
      </section>
      <p className="mr-8 my-4 text-right">
        <span className="font-bold">{clientName}</span> -{" "}
        <span>{clientRole}</span>
      </p>
    </section>
  );
}

export default function Testimonials() {
  const [scrollIncrement, setScrollIncrement] = useState<number>(0);
  const scrollSectionRef = useRef<HTMLElement>(null);

  const scrollTestimonials = (scrollRight: boolean) => {
    if (!scrollSectionRef.current) return;

    scrollSectionRef.current.scrollBy({
      top: 0,
      left: scrollRight ? scrollIncrement : -scrollIncrement,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!scrollSectionRef.current) return;

    const handleResize = () => {
      const firstTestimonialStyle = window.getComputedStyle(
        (scrollSectionRef.current as Element).firstElementChild as Element
      );
      const { width, marginLeft, marginRight } = firstTestimonialStyle;
      setScrollIncrement(
        parseInt(width) + parseInt(marginLeft) + parseInt(marginRight)
      );
    };

    let firstRender = true;
    if (firstRender) handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      firstRender = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollSectionRef.current]);

  return (
    <section className="flex justify-between">
      <section className="bg-red-600 flex justify-center items-center">
        <FaAngleLeft
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => scrollTestimonials(false)}
        />
      </section>
      <section
        className="flex sm:w-[392px] lg:w-[784px] xl:w-[1176px] overflow-auto"
        ref={scrollSectionRef}
      >
        {TESTIMONIALS.map((testimonial) => (
          <Testimonial
            key={testimonial.name}
            clientImage={testimonial.picture}
            clientName={testimonial.name}
            clientRole={testimonial.role}
            testimonial={testimonial.text}
          />
        ))}
      </section>
      <section className="bg-red-600 flex justify-center items-center">
        <FaAngleRight
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => scrollTestimonials(true)}
        />
      </section>
    </section>
  );
}
