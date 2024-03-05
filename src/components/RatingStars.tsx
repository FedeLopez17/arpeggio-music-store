import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

export default function RatingStars({ rating }: { rating: number }) {
  const MAX_RATING = 5;
  const roundedDownRating = Math.floor(rating);
  const ratingIsDecimal = roundedDownRating !== rating;
  const stars: JSX.Element[] = [];

  let filledStarsCompleted = false;
  for (let i = 0; i < MAX_RATING; i++) {
    if (i < roundedDownRating) {
      stars.push(<BsStarFill key={stars.length} />);
    }

    if (i == roundedDownRating) {
      filledStarsCompleted = true;

      if (ratingIsDecimal) {
        stars.push(<BsStarHalf key={stars.length} />);
      }
    }

    if (filledStarsCompleted) {
      const emptyStars = MAX_RATING - stars.length;
      if (emptyStars) {
        for (let j = 0; j < emptyStars; j++) {
          stars.push(<BsStar key={stars.length} />);
        }
      }
      break;
    }
  }

  return <section className="flex gap-2">{stars}</section>;
}
