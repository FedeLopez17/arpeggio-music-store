import { Link } from "react-router-dom";
import { ProductType } from "../types";
import RatingStars from "./RatingStars";
import { useEffect, useState } from "react";
import { getProductImage } from "../utils";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";
import FavoriteToggle from "./FavoriteToggle";

export default function Product({
  product,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  classes,
}: {
  product: ProductType;
  addToFavorites?: () => void;
  removeFromFavorites?: () => void;
  isFavorite?: boolean;
  classes?: string;
}) {
  const [firstProductImage, setFirstProductImage] = useState<string>();
  const [secondProductImage, setSecondProductImage] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const imageUrl = getProductImage(product.imagesPath);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setFirstProductImage(imageUrl);
      setImageLoaded(true);
    };

    setSecondProductImage(getProductImage(product.imagesPath, 2));
  }, [product.imagesPath]);

  return (
    <Link
      to={`/product/${product.categoryId}/${product.subCategoryId}/${product.slug}`}
    >
      <section
        className={`flex flex-col bg-slate-200 p-2 box-border w-[290px] h-[380px] overflow-auto relative rounded-sm ${classes}`}
        data-testid={`product-card-${product.slug}`}
      >
        {addToFavorites && removeFromFavorites && isFavorite !== undefined && (
          <FavoriteToggle
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={isFavorite}
            classes="absolute top-3 right-3 z-20"
          />
        )}

        <section
          className={`w-[274px] h-[274px] flex overflow-hidden ${
            secondProductImage ? "relative" : ""
          }`}
        >
          {imageLoaded ? (
            !secondProductImage ? (
              <img src={firstProductImage} />
            ) : (
              <>
                <img
                  src={firstProductImage}
                  className="absolute z-10 hover:opacity-0"
                />
                <img src={secondProductImage} className="absolute" />
              </>
            )
          ) : (
            <ImageLoadingSkeleton />
          )}
        </section>
        <p className="product-name">{product.name}</p>
        <section className="flex justify-between mt-auto">
          <section className="flex items-center gap-2 text-xs">
            <RatingStars rating={product.rating} />
            <p className="product-rating">({product.rating})</p>
          </section>
          <p className="text-xl font-bold product-price">${product.price}</p>
        </section>
      </section>
    </Link>
  );
}
