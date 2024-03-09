import { useParams } from "react-router-dom";
import { getProductBySlug } from "../catalogManager";
import ProductNotFound from "../components/ProductNotFound";
import RatingStars from "../components/RatingStars";
import Slideshow from "../components/Slideshow";
import { formatPrice, getProductImageURLs } from "../utils";
import AttributesTable from "../components/AttributesTable";
import { ShoppingCart, AddProduct, RemoveProduct } from "../types";
import { useEffect, useState } from "react";
import CartButton from "../components/CartButton";

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

  const [quantity, setQuantity] = useState(1);

  const selectOptions = [];
  for (let i = 1; i <= 10; i++) {
    selectOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

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

  const NameAndPrice = ({
    name,
    price,
    classes,
  }: {
    name: string;
    price: number;
    classes?: string;
  }) => (
    <section className={classes}>
      <h1 className="text-xl font-bold">{name}</h1>
      <h3 className="text-lg">{formatPrice(price)}</h3>
    </section>
  );

  return !productData ? (
    <ProductNotFound />
  ) : (
    <section className="flex justify-center">
      <section className="flex flex-col lg:flex-row bg-slate-500 w-full xl:w-[1280px] justify-center gap-6">
        <section className="bg-blue-400 flex flex-col items-center px-6">
          <section className="w-full md:w-[600px] flex flex-col gap-4">
            <NameAndPrice
              name={productData.name}
              price={productData.price}
              classes="lg:hidden"
            />
            <Slideshow imageUrls={imageURLs} />
            <RatingStars rating={productData.rating} classes="text-lg" />
            <AttributesTable attributes={productData.attributes} />
          </section>
        </section>
        <section className=" bg-green-500 flex flex-col items-center">
          <section className="w-full md:w-fit flex flex-col gap-4 mt-10 sticky top-10">
            <NameAndPrice
              name={productData.name}
              price={productData.price}
              classes="hidden lg:block"
            />
            {productInCart ? (
              <CartButton
                innerText={"REMOVE FROM CART"}
                callBack={() => removeProduct(productData)}
                classes="self-center w-11/12 md:w-[200px] mb-10"
              />
            ) : (
              <section className="flex gap-1 justify-center items-stretch w-11/12 md:w-[200px] self-center mb-10">
                <select
                  className="w-1/4"
                  id="quantity-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {selectOptions}
                </select>
                <CartButton
                  innerText={"ADD TO CART"}
                  callBack={() =>
                    addProduct({ product: productData, quantity })
                  }
                  classes="flex-1"
                />
              </section>
            )}
          </section>
        </section>
      </section>
    </section>
  );
}
