import { useParams } from "react-router-dom";
import { getProductBySlug } from "../catalogManager";
import ProductNotFound from "../components/ProductNotFound";
import RatingStars from "../components/RatingStars";
import Slideshow from "../components/Slideshow";
import { getProductImageURLs } from "../utils";
import AttributesTable from "../components/AttributesTable";
import { ShoppingCart, AddProduct, RemoveProduct } from "../types";
import AddToCartButton from "../components/AddToCartButton";
import { useEffect, useState } from "react";

export default function ProductPage({
  addProduct,
  removeProduct,
  shoppingCart,
}: {
  addProduct: AddProduct;
  removeProduct: RemoveProduct;
  shoppingCart: ShoppingCart;
}) {
  const { category, subcategory, product } = useParams();

  const productData = getProductBySlug(product as string);

  const productInCart =
    shoppingCart.find(
      (cartItem) =>
        cartItem.product.categoryId === category &&
        cartItem.product.subCategoryId === subcategory &&
        cartItem.product.slug === product
    ) != undefined;

  const [imageURLs, setImageURLs] = useState<string[]>([]);

  useEffect(() => {
    getProductImageURLs(
      category as string,
      subcategory as string,
      product as string
    ).then((imagesArr) => setImageURLs(imagesArr));
  }, []);

  return !productData ? (
    <ProductNotFound />
  ) : (
    <section className="flex">
      <section>
        <h1>{productData.name}</h1>
        <RatingStars rating={productData.rating} />
        <Slideshow imageUrls={imageURLs} />
        <AttributesTable attributes={productData.attributes} />
      </section>
      <section>
        <h3>${productData.price}</h3>
        {productInCart ? (
          <button type="button" onClick={() => removeProduct(productData)}>
            REMOVE FROM CART
          </button>
        ) : (
          <AddToCartButton addProduct={addProduct} product={productData} />
        )}
      </section>
    </section>
  );
}
