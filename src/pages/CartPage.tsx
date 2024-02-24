import CartItem from "../components/CartItem";
import { ShoppingCart, removeProduct } from "../types";

export default function CartPage({
  removeProduct,
  shoppingCart,
}: {
  removeProduct: removeProduct;
  shoppingCart: ShoppingCart;
}) {
  return !shoppingCart.length ? (
    <h4>Your cart is empty!</h4>
  ) : (
    <section className="flex">
      <section className="flex flex-col">
        {shoppingCart.map((item) => (
          <CartItem
            removeProduct={removeProduct}
            cartItem={item}
            key={item.product.name}
          />
        ))}
      </section>
      <section>{/* TODO: 'TOTAL' AND 'TO CHECKOUT' BUTTON HERE */}</section>
    </section>
  );
}
