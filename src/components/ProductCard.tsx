import { Link } from "react-router-dom";
import { ProductType } from "../types";
import RatingStars from "./RatingStars";
import { useEffect, useState } from "react";
import { getProductImage } from "../utils";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";

export default function Product({ product }: { product: ProductType }) {
  const [productImage, setProductImage] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = async () => {
      try {
        const imageUrl = await getProductImage(product.imagesPath);
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setProductImage(imageUrl);
          setImageLoaded(true);
        };
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    preloadImage();
  }, [product.imagesPath]);

  return (
    <Link
      to={`/product/${product.categoryId}/${product.subCategoryId}/${product.slug}`}
    >
      <section className="flex flex-col bg-red-500 p-2 box-border w-[290px] aspect-[9/12]">
        {imageLoaded ? <img src={productImage} /> : <ImageLoadingSkeleton />}
        <p>{product.name}</p>
        <p>${product.price}</p>
        <RatingStars rating={product.rating} />
      </section>
    </Link>
  );
}
