interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const filled = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? 'star filled' : 'star'}>★</span>
      ))}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </span>
  );
}
