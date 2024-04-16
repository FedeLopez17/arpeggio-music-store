import { useParams } from "react-router-dom";
import { getProductBySlug } from "../catalogManager";
import ProductNotFound from "../components/ProductNotFound";
import RatingStars from "../components/RatingStars";
import Slideshow from "../components/Slideshow";
import { formatPrice, getProductImageURLs } from "../utils";
import AttributesTable from "../components/AttributesTable";
import {
  ShoppingCart,
  AddProduct,
  RemoveProduct,
  AddFavorite,
  RemoveFavorite,
} from "../types";
import { useEffect, useState } from "react";
import CartButton from "../components/CartButton";
import NumericSelectOptions from "../components/NumericSelectOptions";
import FavoriteToggle from "../components/FavoriteToggle";

export default function ProductPage({
  addProduct,
  removeProduct,
  shoppingCart,
  addFavorite,
  removeFavorite,
  favorites,
}: {
  addProduct: AddProduct;
  removeProduct: RemoveProduct;
  shoppingCart: ShoppingCart;
  addFavorite: AddFavorite;
  removeFavorite: RemoveFavorite;
  favorites: string[];
}) {
  const { category, subcategory, product } = useParams();

  const [quantity, setQuantity] = useState(1);

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
  }, [category, subcategory, product]);

  const NameAndPrice = ({
    name,
    price,
    rating,
    classes,
  }: {
    name: string;
    price: number;
    rating: number;
    classes?: string;
  }) => (
    <section className={`flex flex-col ${classes}`}>
      <h1 className="text-xl font-bold">{name}</h1>
      <span className="flex gap-2 items-center text-sm">
        <p className="opacity-70">{rating}</p>
        <RatingStars rating={rating} classes="text-sm text-purple-700" />
      </span>
      <h3 className="text-xl mt-2">{formatPrice(price)}</h3>
    </section>
  );

  const isFavorite = productData ? favorites.includes(productData.slug) : false;

  return !productData ? (
    <ProductNotFound />
  ) : (
    <section className="flex justify-center">
      <section className="flex flex-col lg:flex-row w-full xl:w-[1280px] justify-center gap-24 pb-32">
        <section className=" flex flex-col items-center px-6 mt-10">
          <section className="w-full md:w-[600px] flex flex-col gap-24">
            <NameAndPrice
              name={productData.name}
              price={productData.price}
              rating={productData.rating}
              classes="lg:hidden"
            />
            <Slideshow imageUrls={imageURLs} />
            <AttributesTable attributes={productData.attributes} />
          </section>
        </section>
        <section className="flex flex-col items-center">
          <section className="w-full md:w-fit flex items-center flex-col gap-4 mt-10 sticky top-10">
            <NameAndPrice
              name={productData.name}
              price={productData.price}
              rating={productData.rating}
              classes="hidden lg:flex"
            />

            <section className="flex gap-1 justify-center items-center w-11/12 md:w-[250px] md:self-start mb-44">
              {productInCart ? (
                <>
                  <FavoriteToggle
                    addToFavorites={() => addFavorite(productData.slug)}
                    removeFromFavorites={() => removeFavorite(productData.slug)}
                    isFavorite={isFavorite}
                    classes="mr-4"
                  />
                  <CartButton
                    innerText={"REMOVE FROM CART"}
                    callBack={() => removeProduct(productData)}
                    classes="flex-1"
                  />
                </>
              ) : (
                <>
                  <FavoriteToggle
                    addToFavorites={() => addFavorite(productData.slug)}
                    removeFromFavorites={() => removeFavorite(productData.slug)}
                    isFavorite={isFavorite}
                    classes="mr-4"
                  />
                  <select
                    className="w-1/4 h-full bg-slate-200"
                    id="quantity-select"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    <NumericSelectOptions />
                  </select>
                  <CartButton
                    innerText={"ADD TO CART"}
                    callBack={() =>
                      addProduct({ product: productData, quantity })
                    }
                    classes="flex-1"
                  />
                </>
              )}
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
