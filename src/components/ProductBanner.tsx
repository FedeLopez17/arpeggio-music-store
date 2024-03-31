import { Link } from "react-router-dom";

export default function ProductBanner({
  image,
  title,
  description,
  linkTo,
  imageOnTheLeft,
  imageClasses,
  containerClasses,
}: {
  image: string;
  title: string;
  description: string;
  linkTo: string;
  imageOnTheLeft: boolean;
  imageClasses?: string;
  containerClasses?: string;
}) {
  return (
    <section
      className={`md:h-[400px] overflow-hidden flex flex-col justify-evenly items-center bg-no-repeat bg-contain gap-8 md:gap-0 box-border py-14 md:box-content md:py-0 ${
        imageOnTheLeft
          ? "md:flex-row bg-shape-2 bg-left-bottom"
          : "md:flex-row-reverse bg-shape-1 bg-right-bottom"
      } ${containerClasses || ""}`}
    >
      <img
        src={image}
        alt={title}
        className={`w-[60%] md:w-[300px] lg:w-[470px] ${imageClasses || ""}`}
      />
      <section className="flex flex-col gap-4 items-center md:items-start">
        <h2 className="font-bold text-lg md:text-2xl">{title}</h2>
        <p className="w-[80%] md:w-[400px] lg:w-[500px] text-balance">
          {description}
        </p>
        <Link to={linkTo}>
          <button type="button" className="bg-yellow-500 py-2 px-8 w-fit">
            See Product
          </button>
        </Link>
      </section>
    </section>
  );
}
