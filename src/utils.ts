import { Octokit } from "@octokit/core";
import { GitHubFile } from "./types";

let cachedToken = "";

async function fetchToken() {
  if(cachedToken) return cachedToken;

  try {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://pastebin.com/raw/WcQ9DqZS')}`);
    if (!res.ok) {      
      throw new Error('Failed to fetch token');
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

export async function getProductImage(
  productPath: string,
  imageNumber?: number
) {
  try {
    const token = await fetchToken();
    const octokit = token ? new Octokit({ auth: token }) : new Octokit();
    const response = await octokit.request(
      "GET /repos/FedeLopez17/shopping-cart/contents/src/assets/images/catalog/{productPath}/{imageNumber}.jpg",
      {
        productPath,
        imageNumber: imageNumber !== undefined ? imageNumber : 1,
      }
    );

    const responseData: GitHubFile = response.data as GitHubFile;
    const imageUrl = responseData.download_url as string;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
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
