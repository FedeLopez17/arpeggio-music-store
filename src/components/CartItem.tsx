import { FaRegTrashAlt } from "react-icons/fa";
import { ShoppingCartItem, RemoveProduct } from "../types";
import { useEffect, useState } from "react";
import { formatPrice, getProductImage } from "../utils";

export default function CartItem({
  removeProduct,
  cartItem: { product, quantity },
}: {
  removeProduct: RemoveProduct;
  cartItem: ShoppingCartItem;
}) {
  const [productImage, setProductImage] = useState<string>();

  useEffect(() => {
    getProductImage(product.imagesPath).then((imageResponse) =>
      setProductImage(imageResponse)
    );
  }, []);

  const totalPrice = product.price * quantity;

  return (
    <section className="flex gap-4 bg-red-400 w-full lg:w-[500px] p-2 pr-4 items-center justify-center">
      <section className="flex w-24 h-24">
        <img src={productImage} alt="Product Image" />
      </section>
      <section className="bg-lime-300 flex-1">
        <p>{product.name}</p>
        {quantity > 1 && <p>{`${formatPrice(product.price)} per unit`}</p>}
        <p className="font-bold">{formatPrice(totalPrice)}</p>
      </section>
      <FaRegTrashAlt
        className="cursor-pointer"
        onClick={() => removeProduct(product)}
      />
    </section>
  );
}
