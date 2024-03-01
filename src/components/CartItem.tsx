import { FaRegTrashAlt } from "react-icons/fa";
import { ShoppingCartItem, RemoveProduct } from "../types";
import { getImageUrl } from "../utils";

export default function CartItem({
  removeProduct,
  cartItem: { product, quantity },
}: {
  removeProduct: RemoveProduct;
  cartItem: ShoppingCartItem;
}) {
  const productImage = getImageUrl(`${product.imagesPath}/1.jpg`);
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
