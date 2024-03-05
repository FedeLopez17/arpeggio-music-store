import { Octokit } from "@octokit/core";
import { GitHubFile } from "./types";

const TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
const octokit = new Octokit({ auth: TOKEN });

export async function getProductImage(productPath: string) {
  try {
    const response = await octokit.request(
      "GET /repos/FedeLopez17/shopping-cart/contents/src/assets/images/catalog/{productPath}/1.jpg",
      {
        productPath,
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
