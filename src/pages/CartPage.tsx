import { FaArrowRight } from "react-icons/fa";
import CartItem from "../components/CartItem";
import { ShoppingCart, RemoveProduct, UpdateProductQuantity } from "../types";
import { formatPrice } from "../utils";
import NotFoundOrEmpty from "../components/NotFoundOrEmpty";

export default function CartPage({
  removeProduct,
  updateProductQuantity,
  shoppingCart,
}: {
  removeProduct: RemoveProduct;
  updateProductQuantity: UpdateProductQuantity;
  shoppingCart: ShoppingCart;
}) {
  const totalPrice = shoppingCart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return !shoppingCart.length ? (
    <NotFoundOrEmpty notFoundType="empty-cart" />
  ) : (
    <section className="flex justify-center flex-grow">
      <section className="flex flex-col lg:flex-row w-full xl:w-[1280px] items-center justify-start lg:items-start lg:justify-center gap-6 sm:gap-24 mb-14 ">
        <section className="flex flex-col gap-[1px] bg-purple-500 my-10">
          {shoppingCart.map((item) => (
            <CartItem
              removeProduct={removeProduct}
              updateProductQuantity={updateProductQuantity}
              cartItem={item}
              key={item.product.name}
            />
          ))}
        </section>
        <section className="w-[min(300px,100%)] mt-10 top-10 sticky">
          <section className="w-full min-h-[150px] flex flex-col justify-start items-center sm:items-start gap-4">
            <h2 className="flex flex-col">
              <span className="text-lg text-purple-900 block">Total:</span>
              <span className="text-3xl block">{formatPrice(totalPrice)}</span>
            </h2>
            <button
              type="button"
              className=" bg-slate-200 hover:bg-purple-200 flex items-center justify-center px-8 py-4 rounded-2xl"
            >
              <span className="mr-2 font-bold text-sm">TO CHECKOUT</span>{" "}
              <FaArrowRight />
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}
