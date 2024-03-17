import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import CatalogLayout from "./layouts/CatalogLayout";
import {
  AddFavorite,
  AddProduct,
  OrderByOption,
  RemoveFavorite,
  RemoveProduct,
  SetOrderByOption,
  ShoppingCart,
  UpdateProductQuantity,
} from "./types";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

const Router = ({
  addProduct,
  removeProduct,
  updateProductQuantity,
  shoppingCart,
  addFavorite,
  removeFavorite,
  favorites,
  currentOrderByOption,
  setCurrentOrderByOption,
  openSideBar,
  closeSideBar,
  sideBarActive,
  searchBarValue,
  setSearch,
}: {
  addProduct: AddProduct;
  removeProduct: RemoveProduct;
  updateProductQuantity: UpdateProductQuantity;
  shoppingCart: ShoppingCart;
  addFavorite: AddFavorite;
  removeFavorite: RemoveFavorite;
  favorites: string[];
  currentOrderByOption: OrderByOption;
  setCurrentOrderByOption: SetOrderByOption;
  openSideBar: () => void;
  closeSideBar: () => void;
  sideBarActive: boolean;
  searchBarValue: string;
  setSearch: (search: string) => void;
}) => {
  const catalogProps = {
    currentOrderByOption,
    setCurrentOrderByOption,
    clearSearch: () => setSearch(""),
    addFavorite,
    removeFavorite,
    favorites,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
          openSideBar={openSideBar}
          closeSideBar={closeSideBar}
          sideBarActive={sideBarActive}
          shoppingCart={shoppingCart}
          searchBarValue={searchBarValue}
          setSearch={setSearch}
        />
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        {
          path: "cart",
          element: (
            <CartPage
              removeProduct={removeProduct}
              updateProductQuantity={updateProductQuantity}
              shoppingCart={shoppingCart}
            />
          ),
        },

        {
          path: "catalog",
          element: (
            <CatalogLayout
              closeSideBar={closeSideBar}
              sideBarActive={sideBarActive}
            />
          ),
          children: [
            {
              path: ":page",
              element: <CatalogPage {...catalogProps} />,
            },
            {
              path: ":category/:page",
              element: <CatalogPage {...catalogProps} />,
            },
            {
              path: ":category/:subcategory/:page",
              element: <CatalogPage {...catalogProps} />,
            },
            {
              path: ":page/?search=:search",
              element: <CatalogPage {...catalogProps} />,
            },
            {
              path: "favorites/:page",
              element: (
                <CatalogPage {...{ ...catalogProps, isFavoritesPage: true }} />
              ),
            },
          ],
        },
        {
          path: "product/:category/:subcategory/:product",
          element: (
            <ProductPage
              addProduct={addProduct}
              removeProduct={removeProduct}
              shoppingCart={shoppingCart}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              favorites={favorites}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
