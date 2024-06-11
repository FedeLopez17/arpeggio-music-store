import { Octokit } from "@octokit/core";
import { GitHubFile } from "./types";

let cachedToken = "";

async function fetchToken() {
  if (cachedToken) return cachedToken;

  try {
    // I understand that storing tokens in platforms like Pastebin may not be the most secure practice.
    // However, in this case, the token is not critical. I'm using this method as a workaround because GitHub automatically revokes tokens when hardcoded in the codebase.
    const res = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://pastebin.com/raw/WcQ9DqZS"
      )}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch token");
    }
    const data = await res.json();
    const token = data.contents;
    cachedToken = token;
    return token;
  } catch (error) {
    console.error("Unable to fetch product images:", error);
    return "";
  }
}

export function getProductImage(productPath: string, imageNumber: number = 1) {
  return new URL(
    `./assets/images/catalog/${productPath}/${imageNumber}.jpg`,
    import.meta.url
  ).href;
}

export async function getProductImageURLs(
  category: string,
  subCategory: string,
  product: string
) {
  try {
    const token = await fetchToken();
    const octokit = token ? new Octokit({ auth: token }) : new Octokit();
    const response = await octokit.request(
      "GET /repos/FedeLopez17/shopping-cart/contents/src/assets/images/catalog/{category}/{subCategory}/{product}",
      {
        category,
        subCategory,
        product,
      }
    );

    const responseData: GitHubFile[] = response.data as GitHubFile[];
    const imageUrls = responseData.map((file) => file.download_url as string);
    return imageUrls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
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
