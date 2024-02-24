import { useState } from "react";
import Router from "./Router";
import { ShoppingCart, addProduct, removeProduct } from "./types";

export default function App() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>([]);

  const addProduct: addProduct = ({ product, quantity }) => {
    setShoppingCart((prevState) => [...prevState, { product, quantity }]);
  };

  const removeProduct: removeProduct = (product) => {
    setShoppingCart((prevState) =>
      prevState.filter(
        (cartItem) =>
          product.categoryId !== cartItem.product.categoryId &&
          product.subCategoryId !== cartItem.product.subCategoryId &&
          product.name !== cartItem.product.name
      )
    );
  };

  return (
    <Router
      addProduct={addProduct}
      removeProduct={removeProduct}
      shoppingCart={shoppingCart}
    />
  );
}
