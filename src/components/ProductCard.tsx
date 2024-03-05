import { Link } from "react-router-dom";
import { ProductType } from "../types";
import RatingStars from "./RatingStars";
import { useEffect, useState } from "react";
import { getProductImage } from "../utils";

export default function Product({ product }: { product: ProductType }) {
  const [productImage, setProductImage] = useState<string>();
  useEffect(() => {
    getProductImage(product.imagesPath).then((imageResponse) =>
      setProductImage(imageResponse)
    );
  }, []);

  return (
    <Link
      to={`/product/${product.categoryId}/${product.subCategoryId}/${product.slug}`}
    >
      <section className="flex flex-col bg-red-500 p-2 aspect-[9/12]">
        <img src={productImage} />
        <p>{product.name}</p>
        <p>${product.price}</p>
        <RatingStars rating={product.rating} />
      </section>
    </Link>
  );
}
