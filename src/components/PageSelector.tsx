import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PageSelector({
  numberOfPages,
  currentPage,
  category,
  subCategory,
}: {
  numberOfPages: number;
  currentPage: number;
  category?: string;
  subCategory?: string;
}) {
  const getPageLink = (page: "previous" | "next", pageNumber?: number) => {
    const rootPath = `/catalog/${
      category ? category + "/" + (subCategory ? subCategory + "/" : "") : ""
    }`;

    if (pageNumber) return rootPath + pageNumber;

    const newPage = page === "previous" ? currentPage - 1 : currentPage + 1;
    return rootPath + newPage;
  };

  const PreviousPageLink = () => (
    <Link to={getPageLink("previous")}>
      <section className="flex cursor-pointer  justify-center items-center">
        <FaAngleLeft />
        <h6>Previous</h6>
      </section>
    </Link>
  );

  const NextPageLink = () => (
    <Link to={getPageLink("next")}>
      <section className="flex cursor-pointer justify-center items-center">
        <h6>Next</h6>
        <FaAngleRight />
      </section>
    </Link>
  );

  return (
    <section className="flex mb-40 gap-3">
      {currentPage > 1 && <PreviousPageLink />}
      {/*TODO: Specific page selectors should be here */}
      {currentPage < numberOfPages && <NextPageLink />}
    </section>
  );
}
