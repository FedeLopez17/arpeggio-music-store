import { useEffect, useRef, useState } from "react";
import Router from "./Router";
import {
  ShoppingCart,
  AddProduct,
  RemoveProduct,
  OrderByOption,
  UpdateProductQuantity,
  AddFavorite,
  RemoveFavorite,
} from "./types";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [searchBarValue, setSearchBarValue] = useState("");
  const setSearch = (search: string) => setSearchBarValue(search);

  const [sideBarActive, setSideBarActive] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = sideBarActive ? "hidden" : "initial";
  }, [sideBarActive]);

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

  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite: AddFavorite = (favorite: string) => {
    setFavorites((prevState) => [...prevState, favorite]);
    toast.success("Added to Favorites");
  };

  const removeFavorite: RemoveFavorite = (favorite: string) => {
    setFavorites((prevState) =>
      prevState.filter((favoriteItem) => favoriteItem !== favorite)
    );
    toast.success("Removed from Favorites");
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (!Storage) return;

    if (firstRender.current) {
      const shoppingCart = localStorage.getItem("shoppingCart");
      if (shoppingCart) {
        setShoppingCart(JSON.parse(shoppingCart) as ShoppingCart);
      }

      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        setFavorites(JSON.parse(favorites));
      }

      return () => {
        firstRender.current = false;
      };
    }

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [shoppingCart.length, favorites.length]);

  return (
    <>
      <Router
        addProduct={addProduct}
        removeProduct={removeProduct}
        updateProductQuantity={updateProductQuantity}
        shoppingCart={shoppingCart}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        favorites={favorites}
        currentOrderByOption={currentOrderByOption}
        setCurrentOrderByOption={setCurrentOrderByOption}
        openSideBar={() => setSideBarActive(true)}
        closeSideBar={() => setSideBarActive(false)}
        sideBarActive={sideBarActive}
        searchBarValue={searchBarValue}
        setSearch={setSearch}
      />
      <Toaster position="bottom-center" />
    </>
  );
}
