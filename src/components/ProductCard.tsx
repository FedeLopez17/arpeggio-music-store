import { Link } from "react-router-dom";
import { ProductType } from "../types";
import { getImageUrl } from "../utils";

export default function Product({ product }: { product: ProductType }) {
  const imagePath = getImageUrl(`${product.imagesPath}/1.jpg`);

  return (
    <Link to={`/${product.imagesPath}`}>
      <div className="flex flex-col max-w-sm bg-red-500 p-3">
        <img src={imagePath} />
        <p>
          {product.name} - ${product.price}
        </p>
      </div>
    </Link>
  );
}