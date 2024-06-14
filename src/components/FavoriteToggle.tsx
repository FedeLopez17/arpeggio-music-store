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
        <MdFavorite
          className="w-full h-full hover:scale-105 text-purple-700 favorite-toggle-remove"
          title="Remove from Favorites"
        />
      ) : (
        <MdFavoriteBorder
          className="w-full h-full hover:scale-105 text-purple-500 hover:text-purple-700 favorite-toggle-add"
          title="Add to Favorites"
        />
      )}
    </section>
  );
}
