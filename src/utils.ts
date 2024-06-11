export function getProductImage(productPath: string, imageNumber: number = 1) {
  return new URL(
    `./assets/images/catalog/${productPath}/${imageNumber}.jpg`,
    import.meta.url
  ).href;
}

// I search for the product images through GitHub because there's no way of dinamically importing all images from an specific directory using Vite.
// import.meta.glob won't work with dynamic paths.
export async function getProductImageURLs(
  category: string,
  subCategory: string,
  product: string
) {
  const noImageCache = new Set<string>();

  const imageExists = async (url: string) => {
    if (noImageCache.has(url)) return false;

    try {
      const response = await fetch(url);
      if (response.status === 404) {
        noImageCache.add(url);
        // Browsers always print network errors in the console if the status code is 4XX or 5XX.
        // I could clear the console, but that would be a bad solution, as it would remove all logs.
        // Here's an alternative solution to get rid of these 404 error logs I might implement in the future:
        // https://stackoverflow.com/questions/4500741/suppress-chrome-failed-to-load-resource-messages-in-console/75848002#75848002
        console.log("The previous 404 error is meant to happen");
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const BASE_URL = `https://raw.githubusercontent.com/FedeLopez17/arpeggio-music-store/main/src/assets/images/catalog/${category}/${subCategory}/${product}/`;

  // Here I use a binary search to reduce the amount of fetching I have to do in order to make the function faster
  const findMaxImageNumber = async (low: number, high: number) => {
    if (low > high) {
      return low - 1;
    }

    const mid = Math.floor((low + high) / 2);
    const imageUrl = `${BASE_URL}${mid}.jpg`;

    if (await imageExists(imageUrl)) {
      return await findMaxImageNumber(mid + 1, high);
    } else {
      return await findMaxImageNumber(low, mid - 1);
    }
  };

  const maxNumber = await findMaxImageNumber(1, 20);

  const imageUrls = [];
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
