import { useState } from "react";
import { ProductType, addProduct } from "../types";

export default function AddToCartButton({
  addProduct,
  product,
}: {
  addProduct: addProduct;
  product: ProductType;
}) {
  const [quantity, setQuantity] = useState(1);

  const selectOptions = [];
  for (let i = 1; i <= 10; i++) {
    selectOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <section>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))} //
      >
        {selectOptions}
      </select>
      <button type="button" onClick={() => addProduct({ product, quantity })}>
        ADD TO CART
      </button>
    </section>
  );
}
