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
  ProductType,
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
      <h1 className="text-3xl font-bold">{name}</h1>
      <span className="flex gap-2 items-center text-sm">
        <p className="opacity-70">{rating}</p>
        <RatingStars rating={rating} classes="text-sm text-purple-700" />
      </span>
      <h3 className="text-2xl mt-2">{formatPrice(price)}</h3>
    </section>
  );

  const FavAndCartButtons = ({
    isAdd,
    productData,
    classes,
  }: {
    isAdd: boolean;
    productData: ProductType;
    classes?: string;
  }) => (
    <section
      className={`flex gap-1 justify-center items-center w-full md:w-[250px] md:self-start lg:mb-44 ${classes}`}
    >
      <FavoriteToggle
        addToFavorites={() => addFavorite(productData.slug)}
        removeFromFavorites={() => removeFavorite(productData.slug)}
        isFavorite={isFavorite}
        classes="mr-4"
      />
      {!isAdd ? (
        <CartButton
          innerText={"REMOVE FROM CART"}
          callBack={() => removeProduct(productData)}
          classes="flex-1"
        />
      ) : (
        <>
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
            callBack={() => addProduct({ product: productData, quantity })}
            classes="flex-1"
          />
        </>
      )}
    </section>
  );

  const isFavorite = productData ? favorites.includes(productData.slug) : false;

  return !productData ? (
    <ProductNotFound />
  ) : (
    <section className="flex justify-center">
      <section className="flex flex-col lg:flex-row w-full xl:w-[1280px] justify-center gap-24 pb-32">
        <section className=" flex flex-col items-center px-6 mt-10">
          <section className="w-full md:w-[600px] flex flex-col gap-10 lg:gap-24">
            <h1 className="text-3xl font-bold lg:hidden">{productData.name}</h1>

            <Slideshow imageUrls={imageURLs} />

            <section className="lg:hidden">
              <span className="flex gap-2 items-center text-sm">
                <p className="opacity-70">{productData.rating}</p>
                <RatingStars
                  rating={productData.rating}
                  classes="text-sm text-purple-700"
                />
              </span>
              <h3 className="text-2xl mt-2">
                {formatPrice(productData.price)}
              </h3>
            </section>

            <FavAndCartButtons
              isAdd={!productInCart}
              productData={productData}
              classes={"lg:hidden"}
            />

            <AttributesTable attributes={productData.attributes} />
          </section>
        </section>
        <section className="flex flex-col items-center">
          <section className="w-full md:w-[300px] flex items-start flex-col gap-4 lg:mt-10 sticky top-10">
            <NameAndPrice
              name={productData.name}
              price={productData.price}
              rating={productData.rating}
              classes="hidden lg:flex"
            />

            <FavAndCartButtons
              isAdd={!productInCart}
              productData={productData}
              classes={"hidden lg:flex"}
            />
          </section>
        </section>
      </section>
    </section>
  );
}
