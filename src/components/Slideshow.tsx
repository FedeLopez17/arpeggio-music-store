import { useState } from "react";

export default function Slideshow({ imageUrls }: { imageUrls: string[] }) {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  return (
    <section className="flex h-[700px] aspect-video overflow-hidden">
      <section className="bg-blue-400 flex flex-col gap-4 justify-start items-center overflow-auto">
        {imageUrls.map((imageUrl) => (
          <img
            src={imageUrl}
            key={imageUrl}
            onClick={() => setCurrentImage(imageUrl)}
            className="w-20 aspect-square cursor-pointer"
          />
        ))}
      </section>
      <section className="bg-red-400 flex justify-center items-center">
        <img src={currentImage} alt="Product image" />
      </section>
    </section>
  );
}
