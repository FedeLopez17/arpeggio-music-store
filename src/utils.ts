export function getImageUrl(path: string) {
  return new URL(`./assets/images/${path}`, import.meta.url).href;
}

export function getProductImageUrls(
  category: string,
  subcategory: string,
  product: string
): string[] {
  return Object.values(
    // Here I import all product images and then filter out the ones I don't need.
    // This isn't ideal, but it's the only way it would work, as dinamically importing assets isn't possible with Vite.
    // See this GitHub issue for more information: https://github.com/vitejs/vite/issues/5478
    import.meta.glob("./assets/images/products/*/*/*/*", {
      eager: true,
      as: "url",
    })
  ).filter((url) =>
    url.includes(`products/${category}/${subcategory}/${product}`)
  );
}
