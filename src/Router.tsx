import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import CatalogLayout from "./layouts/CatalogLayout";
import {
  AddProduct,
  OrderByOption,
  RemoveProduct,
  SetOrderByOption,
  ShoppingCart,
} from "./types";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

const Router = ({
  addProduct,
  removeProduct,
  shoppingCart,
  currentOrderByOption,
  setCurrentOrderByOption,
  openSideBar,
  closeSideBar,
  sideBarActive,
}: {
  addProduct: AddProduct;
  removeProduct: RemoveProduct;
  shoppingCart: ShoppingCart;
  currentOrderByOption: OrderByOption;
  setCurrentOrderByOption: SetOrderByOption;
  openSideBar: () => void;
  closeSideBar: () => void;
  sideBarActive: boolean;
}) => {
  // This method is created to avoid redundancy
  const renderCatalogPage = () => (
    <CatalogPage
      currentOrderByOption={currentOrderByOption}
      setCurrentOrderByOption={setCurrentOrderByOption}
    />
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
          openSideBar={openSideBar}
          closeSideBar={closeSideBar}
          sideBarActive={sideBarActive}
          shoppingCart={shoppingCart}
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
              element: renderCatalogPage(),
            },
            {
              path: ":category/:page",
              element: renderCatalogPage(),
            },
            {
              path: ":category/:subcategory/:page",
              element: renderCatalogPage(),
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
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
