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

export type UpdateProductQuantity = (
  productSlug: string,
  quantity: number
) => void;

export type AddFavorite = (favorite: string) => void;

export type RemoveFavorite = (favorite: string) => void;

export type OrderByOption =
  | "Price: low to high"
  | "Price: high to low"
  | "Best rated first"
  | "Brand"
  | "Alphabet (A-Z)"
  | "Alphabet (Z-A)";

export type SetOrderByOption = (orderBy: OrderByOption) => void;

export type GitHubFile = {
  type: string;
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: { git: string; html: string; self: string };
};

export type HeroImage = {
  src: string;
  alt: string;
  linkTo: string;
};

export type CategoryCard = {
  image: string;
  text: string;
  linkTo: string;
};
