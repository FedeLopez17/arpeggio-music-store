import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function FavoriteToggle({
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  classes,
}: {
  addToFavorites: () => void;
  removeFromFavorites: () => void;
  isFavorite: boolean;
  classes?: string;
}) {
  return (
    <section
      className={`w-6 h-6 flex justify-center items-center cursor-pointer ${classes}`}
      onClick={(e) => {
        e.preventDefault();
        isFavorite ? removeFromFavorites() : addToFavorites();
      }}
    >
      {isFavorite ? (
        <MdFavorite className="w-full h-full hover:scale-105" />
      ) : (
        <MdFavoriteBorder className="w-full h-full hover:scale-105 opacity-65 hover:opacity-100" />
      )}
    </section>
  );
}
