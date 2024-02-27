import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import CatalogLayout from "./layouts/CatalogLayout";
import { AddProduct, RemoveProduct, ShoppingCart } from "./types";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

const Router = ({
  addProduct,
  removeProduct,
  shoppingCart,
}: {
  addProduct: AddProduct;
  removeProduct: RemoveProduct;
  shoppingCart: ShoppingCart;
}) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
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
          element: <CatalogLayout />,
          children: [
            { index: true, element: <CatalogPage /> },
            { path: ":category", element: <CatalogPage /> },
            {
              path: ":category/:subcategory",
              element: <CatalogPage />,
            },
            {
              path: ":category/:subcategory/:product",
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
