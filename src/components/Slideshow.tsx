import { useEffect, useState } from "react";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Slideshow({ imageUrls }: { imageUrls: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);

  useEffect(() => {
    if (imageUrls.length) {
      setCurrentImageIndex(0);
    }
  }, [imageUrls]);

  useEffect(() => {
    if (currentImageIndex === undefined) return;

    const img = new Image();
    img.src = imageUrls[currentImageIndex];
    img.onload = () => {
      setCurrentImageLoaded(true);
    };
  }, [currentImageIndex]);

  const notFirstImage =
    currentImageIndex !== undefined && currentImageIndex > 0;
  const notLastImage =
    currentImageIndex !== undefined && currentImageIndex < imageUrls.length - 1;

  return (
    <section className="flex flex-col w-full">
      <main className="flex justify-center items-center relative">
        {currentImageLoaded ? (
          <img
            src={imageUrls[currentImageIndex as number]}
            alt="Product image"
          />
        ) : (
          <ImageLoadingSkeleton classes="w-full h-[680px]" />
        )}
        {notFirstImage && (
          <section className="absolute left-[-20px] w-[40px] h-full flex items-center justify-start">
            <FaAngleLeft
              className="cursor-pointer text-black h-8 w-[20px]"
              onClick={() =>
                setCurrentImageIndex((prevIndex) => (prevIndex as number) - 1)
              }
            />
          </section>
        )}
        {notLastImage && (
          <section className="absolute right-[-20px] w-[40px] h-full flex items-center justify-end">
            <FaAngleRight
              className="cursor-pointer text-black h-8 w-[20px]"
              onClick={() =>
                setCurrentImageIndex((prevIndex) => (prevIndex as number) + 1)
              }
            />
          </section>
        )}
      </main>
      <footer className="flex gap-1 overflow-auto mt-[10px]">
        {imageUrls.map((imageUrl, index) => (
          <img
            src={imageUrl}
            key={imageUrl}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-[70px] aspect-square cursor-pointer border-2 ${
              currentImageIndex === index
                ? "border-red-600 border-"
                : "border-transparent"
            }`}
          />
        ))}
      </footer>
    </section>
  );
}
