import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import ProductsLayout from "./layouts/ProductsLayout";
import { addProduct, removeProduct, ShoppingCart } from "./types";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

const Router = ({
  addProduct,
  removeProduct,
  shoppingCart,
}: {
  addProduct: addProduct;
  removeProduct: removeProduct;
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
          path: "products",
          element: <ProductsLayout />,
          children: [
            { index: true, element: <ProductsPage /> },
            { path: ":category", element: <ProductsPage /> },
            {
              path: ":category/:subcategory",
              element: <ProductsPage />,
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
