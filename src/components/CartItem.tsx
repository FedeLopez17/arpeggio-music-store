import { FaRegTrashAlt } from "react-icons/fa";
import { ShoppingCartItem, RemoveProduct } from "../types";
import { useEffect, useState } from "react";
import { formatPrice, getProductImage } from "../utils";
import { Link } from "react-router-dom";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";

export default function CartItem({
  removeProduct,
  cartItem: { product, quantity },
}: {
  removeProduct: RemoveProduct;
  cartItem: ShoppingCartItem;
}) {
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

  const totalPrice = product.price * quantity;

  return (
    <section className="flex gap-4 bg-red-400 w-full md:w-[500px] p-2 pr-4 items-center justify-center">
      <Link
        className="flex-1 flex gap-2"
        to={`/product/${product.categoryId}/${product.subCategoryId}/${product.slug}`}
      >
        <section className="flex w-24 h-24">
          {imageLoaded ? (
            <img src={productImage} alt="Product Image" />
          ) : (
            <ImageLoadingSkeleton />
          )}
        </section>
        <section className="bg-lime-300 flex-1">
          <p>{product.name}</p>
          <p>
            <span className="font-bold">Quantity:</span> {quantity}
          </p>
          {quantity > 1 && <p>{`${formatPrice(product.price)} per unit`}</p>}
          <p className="font-bold">{formatPrice(totalPrice)}</p>
        </section>
      </Link>
      <FaRegTrashAlt
        className="cursor-pointer"
        onClick={() => removeProduct(product)}
      />
    </section>
  );
}
