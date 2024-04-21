import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PageSelector({
  numberOfPages,
  currentPage,
  category,
  subCategory,
  search,
  isFavoritesPage,
}: {
  numberOfPages: number;
  currentPage: number;
  category?: string;
  subCategory?: string;
  search?: string;
  isFavoritesPage?: boolean;
}) {
  const getPageLink = ({
    page,
    pageNumber,
  }: {
    page?: "previous" | "next";
    pageNumber?: number;
  }) => {
    const PAGE_PLACEHOLDER = "[PAGE_PLACEHOLDER]";

    const rootPath = `/catalog/${
      search
        ? `${PAGE_PLACEHOLDER}/?search=${search}`
        : isFavoritesPage
        ? `favorites/${PAGE_PLACEHOLDER}`
        : category
        ? category +
          "/" +
          (subCategory
            ? subCategory + "/" + PAGE_PLACEHOLDER
            : PAGE_PLACEHOLDER)
        : PAGE_PLACEHOLDER
    }`;

    if (pageNumber)
      return rootPath.replace(PAGE_PLACEHOLDER, pageNumber.toString());

    const newPage = page === "previous" ? currentPage - 1 : currentPage + 1;
    return rootPath.replace(PAGE_PLACEHOLDER, newPage.toString());
  };

  const specificPageSelectors: JSX.Element[] = [];
  const startingIndex = currentPage - 5 > 0 ? currentPage - 5 : 1;

  for (let i = startingIndex; i < currentPage + 5 && i <= numberOfPages; i++) {
    const pageLink = getPageLink({ pageNumber: i });
    const isActive = currentPage === i;

    specificPageSelectors.push(
      <Link key={i} to={pageLink}>
        <section className={`${isActive ? "text-purple-800 font-bold" : ""}`}>
          {i}
        </section>
      </Link>
    );
  }

  const PreviousPageLink = () => (
    <Link to={getPageLink({ page: "previous" })}>
      <section className="flex cursor-pointer  justify-center items-center">
        <FaAngleLeft />
        <h6>Previous</h6>
      </section>
    </Link>
  );

  const NextPageLink = () => (
    <Link to={getPageLink({ page: "next" })}>
      <section className="flex cursor-pointer justify-center items-center">
        <h6>Next</h6>
        <FaAngleRight />
      </section>
    </Link>
  );

  return (
    <section className="flex mb-40 gap-3">
      {currentPage > 1 && <PreviousPageLink />}
      {specificPageSelectors}
      {currentPage < numberOfPages && <NextPageLink />}
    </section>
  );
}
