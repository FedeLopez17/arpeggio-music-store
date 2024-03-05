import { useEffect, useState } from "react";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";

export default function Slideshow({ imageUrls }: { imageUrls: string[] }) {
  const [currentImage, setCurrentImage] = useState<string>();
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);

  useEffect(() => {
    if (imageUrls.length) {
      setCurrentImage(imageUrls[0]);
    }
  }, [imageUrls]);

  useEffect(() => {
    if (!currentImage) return;

    const img = new Image();
    img.src = currentImage;
    img.onload = () => {
      setCurrentImageLoaded(true);
    };
  }, [currentImage]);

  return (
    <section className="flex flex-col w-[600px]">
      <main className="flex justify-center items-center">
        {currentImageLoaded ? (
          <img src={currentImage} alt="Product image" />
        ) : (
          <ImageLoadingSkeleton classes="w-[600px] h-[670px]" />
        )}
      </main>
      <footer className="flex gap-1 overflow-auto">
        {imageUrls.map((imageUrl) => (
          <img
            src={imageUrl}
            key={imageUrl}
            onClick={() => setCurrentImage(imageUrl)}
            className="w-[70px] aspect-square cursor-pointer"
          />
        ))}
      </footer>
    </section>
  );
}
