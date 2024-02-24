import { useEffect, useRef, useState } from "react";
import Router from "./Router";
import { ShoppingCart, addProduct, removeProduct } from "./types";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>([]);

  const addProduct: addProduct = ({ product, quantity }) => {
    setShoppingCart((prevState) => [...prevState, { product, quantity }]);
    toast.success("Added to Cart");
  };

  const removeProduct: removeProduct = (product) => {
    setShoppingCart((prevState) =>
      prevState.filter(
        // We use the imagePath property because it's unique for each product
        (cartItem) => product.imagesPath !== cartItem.product.imagesPath
      )
    );
    toast.success("Removed from Cart");
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (!Storage) return;

    if (firstRender.current) {
      const shoppingCart = localStorage.getItem("shoppingCart");

      if (shoppingCart) {
        setShoppingCart(JSON.parse(shoppingCart) as ShoppingCart);
      }

      return () => {
        firstRender.current = false;
      };
    }

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart.length]);

  return (
    <>
      <Router
        addProduct={addProduct}
        removeProduct={removeProduct}
        shoppingCart={shoppingCart}
      />
      <Toaster />
    </>
  );
}
