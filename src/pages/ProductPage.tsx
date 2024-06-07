import { useParams } from "react-router-dom";
import { getProductBySlug } from "../catalogManager";
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
import { PiArrowUDownLeft } from "react-icons/pi";
import { GoShieldCheck } from "react-icons/go";
import { LiaMedalSolid } from "react-icons/lia";
import CollapsiblePurchaseDetail from "../components/CollapsiblePurchaseDetail";
import NotFoundOrEmpty from "../components/NotFoundOrEmpty";

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

  const PurchaseDetails = ({ classes }: { classes?: string }) => (
    <section
      className={`flex flex-col lg:mb-44 gap-[1px] bg-purple-500 ${classes}`}
    >
      <CollapsiblePurchaseDetail
        icon={PiArrowUDownLeft}
        summaryText="30-Day Money-Back Guarantee"
      >
        <p>
          So you thought a particular product was the right one for you, and
          then you discover it's not. Well, that's life.
          <br className="block mt-1 content-['']" />
          <b>But no problem!</b> We grant a hassle-free{" "}
          <b>30-Day Money-Back Guarantee</b> on any item you buy at Arpeggio.
          <br className="block mt-1 content-['']" />
          Only exceptions are products specially made or modified for you (e. g.
          custom cases), items that are subject to wear and tear, or products
          that cannot be taken back due to regulations of hygiene (e.g. used
          reeds for woodwinds).
        </p>
      </CollapsiblePurchaseDetail>

      <CollapsiblePurchaseDetail
        icon={GoShieldCheck}
        summaryText="Highest Payment Security"
      >
        <p>
          Your data will be treated with utmost confidentality by Arpeggio. Your
          address and credit card information is sent to us encrypted through a
          secure server and cannot be seen by anyone except your contact person
          and the web master.
        </p>
      </CollapsiblePurchaseDetail>
      <CollapsiblePurchaseDetail
        icon={LiaMedalSolid}
        summaryText="3-Year Arpeggio Warranty"
      >
        <p>
          Your purchases at Arpeggio are backed by our <b>3-year warranty</b>,
          i.e. we extend the manufacturer's warranty period (usually 12 months)
          to a <b>full 36 months</b> - at our own cost and there's no extra
          charge for you!
        </p>
      </CollapsiblePurchaseDetail>
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
      className={`flex gap-1 justify-center items-center w-full md:w-[250px] md:self-start ${classes}`}
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
            title="Quantity"
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
    <NotFoundOrEmpty notFoundType="no-product" />
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

            <PurchaseDetails classes={"lg:hidden"} />

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

            <PurchaseDetails classes={"hidden lg:flex mt-12"} />
          </section>
        </section>
      </section>
    </section>
  );
}
