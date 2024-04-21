import produtNotFound from "../assets/images/not-found-404.png";
import emptyCart from "../assets/images/empty-cart.png";
import emptyFavorites from "../assets/images/no-favorites.png";

export default function NotFoundOrEmpty({
  notFoundType,
}: {
  notFoundType: "no-favorites" | "empty-cart" | "no-matching" | "no-product";
}) {
  const image =
    notFoundType === "empty-cart"
      ? emptyCart
      : notFoundType === "no-favorites"
      ? emptyFavorites
      : produtNotFound;

  return (
    <section className="flex flex-col items-center flex-grow">
      <img
        src={image}
        alt={
          ["empty-cart", "no-favorites"].includes(notFoundType)
            ? "Empty Section"
            : "404 Error; not found"
        }
        className="w-[min(300px,60%)] aspect-square mt-20"
      />
      <h4 className="font-bold text-3xl mt-8 mb-2 px-2">
        {notFoundType === "no-matching" ? (
          <>
            Sorry, there are
            <span className="text-purple-500"> no matching products</span>!
          </>
        ) : notFoundType === "no-product" ? (
          <>
            Sorry, this product
            <span className="text-purple-500"> couldn't be found</span>!
          </>
        ) : notFoundType === "no-favorites" ? (
          <>
            Your favorites section is{" "}
            <span className="text-purple-500"> Empty</span>!
          </>
        ) : (
          <>
            Your Cart is <span className="text-purple-500">Empty</span>!
          </>
        )}
      </h4>

      {notFoundType === "empty-cart" && (
        <p className="px-2">
          Must add items to the cart before proceeding to check out
        </p>
      )}

      {notFoundType === "no-favorites" && (
        <p className="px-2">
          Add a favorite by clicking the heart icon on a product
        </p>
      )}
    </section>
  );
}
