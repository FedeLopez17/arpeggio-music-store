import { FaRegTrashAlt } from "react-icons/fa";
import {
  ShoppingCartItem,
  RemoveProduct,
  UpdateProductQuantity,
} from "../types";
import { useEffect, useState } from "react";
import { formatPrice, getProductImage } from "../utils";
import { Link } from "react-router-dom";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";
import NumericSelectOptions from "./NumericSelectOptions";

export default function CartItem({
  removeProduct,
  updateProductQuantity,
  cartItem: { product, quantity },
}: {
  removeProduct: RemoveProduct;
  updateProductQuantity: UpdateProductQuantity;
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
    <section className="flex bg-white gap-4 w-full md:w-[550px] pl-2 py-6 pr-4 items-center justify-center">
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
        <section className="flex-1 flex flex-col">
          <p>{product.name}</p>
          <p>
            <span className="font-bold mr-2">Quantity</span>
            <select
              className="bg-slate-100"
              value={quantity}
              onChange={(e) =>
                updateProductQuantity(product.slug, Number(e.target.value))
              }
            >
              <NumericSelectOptions />
            </select>
          </p>

          <p className="font-bold mt-auto">
            {formatPrice(totalPrice)}
            {quantity > 1 && (
              <span className="text-xs font-light text-purple-900">{` - ${formatPrice(
                product.price
              )} p.u`}</span>
            )}
          </p>
        </section>
      </Link>
      <FaRegTrashAlt
        className="cursor-pointer hover:text-purple-900"
        onClick={() => removeProduct(product)}
      />
    </section>
  );
}
