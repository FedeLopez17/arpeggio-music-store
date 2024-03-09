import CartItem from "../components/CartItem";
import { ShoppingCart, RemoveProduct } from "../types";

export default function CartPage({
  removeProduct,
  shoppingCart,
}: {
  removeProduct: RemoveProduct;
  shoppingCart: ShoppingCart;
}) {
  return !shoppingCart.length ? (
    <h4>Your cart is empty!</h4>
  ) : (
    <section className="flex justify-center flex-grow">
      <section className="flex flex-col lg:flex-row bg-slate-500 w-full xl:w-[1280px] justify-center gap-6 ">
        <section className="flex flex-col gap-4">
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
    </section>
  );
}
