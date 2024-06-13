export function getProductImage(productPath: string, imageNumber: number = 1) {
  return new URL(
    `./assets/images/catalog/${productPath}/${imageNumber}.jpg`,
    import.meta.url
  ).href;
}

// I search for the product images this way because there's no way of dinamically importing
// all images from an specific directory using Vite, as import.meta.glob won't work with dynamic paths.
// What I do instead is, since product images are named numerically, use binary search to find the highest image number
// and then get the images through the GitHub repository. This way, I only need a few imports.
export async function getProductImageURLs(
  category: string,
  subCategory: string,
  product: string
) {
  const noImageCache = new Set<number>();

  const imageExists = (
    category: string,
    subCategory: string,
    product: string,
    imageNumber: number
  ) => {
    if (noImageCache.has(imageNumber)) return false;

    const url = new URL(
      `./assets/images/catalog/${category}/${subCategory}/${product}/${imageNumber}.jpg`,
      import.meta.url
    );

    const noImage = url.toString().includes("undefined");
    if (noImage) {
      noImageCache.add(imageNumber);
      return false;
    }

    return true;
  };

  // Here I use a binary search to reduce the amount of fetching I have to do in order to make the function faster
  const findMaxImageNumber = async (
    low: number,
    high: number
  ): Promise<number> => {
    if (low > high) {
      return low - 1;
    }

    const mid = Math.floor((low + high) / 2);

    if (imageExists(category, subCategory, product, mid)) {
      return await findMaxImageNumber(mid + 1, high);
    } else {
      return await findMaxImageNumber(low, mid - 1);
    }
  };

  const maxNumber = await findMaxImageNumber(1, 20);
  const imageUrls = [];
  const BASE_URL = `https://raw.githubusercontent.com/FedeLopez17/arpeggio-music-store/main/src/assets/images/catalog/${category}/${subCategory}/${product}/`;
  for (let i = 1; i <= maxNumber; i++) {
    imageUrls.push(`${BASE_URL}${i}.jpg`);
  }

  return imageUrls;
}

export function formatPrice(number: number) {
  return (
    number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }) + " USD"
  );
}

export function checkVisibility(domElement: Element) {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver(([entry]) => {
      resolve(entry.intersectionRatio === 1);
      observer.disconnect();
    });
    observer.observe(domElement);
  });
}

export function shuffleArray(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function randomArrIndex(arr: any[]) {
  return Math.floor(Math.random() * arr.length);
}
