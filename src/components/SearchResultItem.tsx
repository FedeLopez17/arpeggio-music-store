import { useEffect, useState } from "react";
import { ProductType } from "../types";
import { formatPrice, getProductImage } from "../utils";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";
import { Link } from "react-router-dom";

export default function SearchResultItem({
  product,
}: {
  product: ProductType;
}) {
  const [productImagePath, setProductImage] = useState("");
  useEffect(() => {
    const preloadImage = async () => {
      try {
        const imageUrl = await getProductImage(product.imagesPath);
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setProductImage(imageUrl);
        };
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    preloadImage();
  }, []);

  return (
    <Link
      className="result-item"
      to={`product/${product.categoryId}/${product.subCategoryId}/${product.slug}`}
    >
      <section className="flex gap-2 bg-white hover:bg-gray-200">
        <section className="w-14 h-14 overflow-hidden">
          {productImagePath ? (
            <img
              src={productImagePath}
              alt="Product Result Image"
              className="w-full"
            />
          ) : (
            <ImageLoadingSkeleton />
          )}
        </section>
        <section className="flex flex-col text-sm">
          <p className="font-bold">{product.name}</p>
          <p>{formatPrice(product.price)}</p>
        </section>
      </section>
    </Link>
  );
}
