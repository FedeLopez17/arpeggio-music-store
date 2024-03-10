import { FaArrowRight } from "react-icons/fa";
import CartItem from "../components/CartItem";
import { ShoppingCart, RemoveProduct } from "../types";
import { formatPrice } from "../utils";

export default function CartPage({
  removeProduct,
  shoppingCart,
}: {
  removeProduct: RemoveProduct;
  shoppingCart: ShoppingCart;
}) {
  const totalPrice = shoppingCart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return !shoppingCart.length ? (
    <h4>Your cart is empty!</h4>
  ) : (
    <section className="flex justify-center flex-grow">
      <section className="flex flex-col lg:flex-row bg-slate-500 w-full xl:w-[1280px] items-center justify-start lg:items-start lg:justify-center gap-6 ">
        <section className="flex flex-col gap-4">
          {shoppingCart.map((item) => (
            <CartItem
              removeProduct={removeProduct}
              cartItem={item}
              key={item.product.name}
            />
          ))}
        </section>
        <section className="w-[min(300px,100%)] mt-10 top-10 sticky">
          <section className="bg-sky-400 w-full min-h-[150px] flex flex-col justify-center items-center gap-4">
            <h2 className="">
              <span className="font-bold">Total: </span>
              {formatPrice(totalPrice)}
            </h2>
            <button
              type="button"
              className=" bg-slate-600 flex items-center justify-center px-8 py-4 rounded-2xl"
            >
              To Checkout <FaArrowRight />
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}
