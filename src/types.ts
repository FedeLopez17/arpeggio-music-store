export type AttributesType = { [key: string]: string | undefined };

export type ProductType = {
  name: string;
  brand: string;
  slug: string;
  categoryId: string;
  subCategoryId: string;
  imagesPath: string;
  price: number;
  rating: number;
  attributes: AttributesType;
};

export interface NameAndId {
  name: string;
  id: string;
}

export type CategoryType = NameAndId & {
  subCategories: NameAndId[];
};

export type ShoppingCartItem = {
  product: ProductType;
  quantity: number;
};

export type ShoppingCart = ShoppingCartItem[];

export type AddProduct = ({
  product,
  quantity,
}: {
  product: ProductType;
  quantity: number;
}) => void;

export type RemoveProduct = (product: ProductType) => void;

export type OrderByOption =
  | "Price: low to high"
  | "Price: high to low"
  | "Best rated first"
  | "Brand"
  | "Alphabet (A-Z)"
  | "Alphabet (Z-A)";

export type SetOrderByOption = (orderBy: OrderByOption) => void;
