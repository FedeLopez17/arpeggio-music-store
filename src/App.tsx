import { useEffect, useRef, useState } from "react";
import Router from "./Router";
import {
  ShoppingCart,
  AddProduct,
  RemoveProduct,
  OrderByOption,
  UpdateProductQuantity,
} from "./types";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [sideBarActive, setSideBarActive] = useState(false);

  const [currentOrderByOption, setCurrentOrderByOption] =
    useState<OrderByOption>("Price: high to low");

  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>([]);

  const addProduct: AddProduct = ({ product, quantity }) => {
    setShoppingCart((prevState) => [...prevState, { product, quantity }]);
    toast.success("Added to Cart");
  };

  const updateProductQuantity: UpdateProductQuantity = (
    productSlug: string,
    quantity: number
  ) => {
    setShoppingCart((prevState) =>
      prevState.map((item) =>
        item.product.slug === productSlug ? { ...item, quantity } : item
      )
    );
  };

  const removeProduct: RemoveProduct = (product) => {
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
        updateProductQuantity={updateProductQuantity}
        shoppingCart={shoppingCart}
        currentOrderByOption={currentOrderByOption}
        setCurrentOrderByOption={setCurrentOrderByOption}
        openSideBar={() => setSideBarActive(true)}
        closeSideBar={() => setSideBarActive(false)}
        sideBarActive={sideBarActive}
      />
      <Toaster position="bottom-center" />
    </>
  );
}
