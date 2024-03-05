import { FaRegTrashAlt } from "react-icons/fa";
import { ShoppingCartItem, RemoveProduct } from "../types";
import { useEffect, useState } from "react";
import { getProductImage } from "../utils";

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
    <section>
      <section>
        <img src={productImage} alt="Product Image" />
      </section>
      <section>
        <p>{product.name}</p>
        {quantity > 1 && <p>{`$${product.price} per unit`}</p>}
        <p>{`$${totalPrice}`}</p>
        <FaRegTrashAlt onClick={() => removeProduct(product)} />
      </section>
    </section>
  );
}
