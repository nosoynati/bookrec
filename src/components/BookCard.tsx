import type { Book } from '../lib/hardcoverApi';

interface BookCardProps {
  book: Book;
  reason: string;
  primary?: boolean;
}

const HARDCOVER_BASE = 'https://hardcover.app/books';
const PLACEHOLDER = 'https://placehold.co/200x300/e7e5e4/78716c?text=No+Cover';

function StarRating({ rating }: { rating: number }) {
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

export default function BookCard({ book, reason, primary = false }: BookCardProps) {
  const href = `${HARDCOVER_BASE}/${book.slug}`;
  const cover = book.image?.url ?? PLACEHOLDER;

  return (
    <a
      className={`book-card ${primary ? 'book-card--primary' : 'book-card--secondary'}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="book-cover-wrap">
        <img
          className="book-cover"
          src={cover}
          alt={`Cover of ${book.title}`}
          onError={e => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
        />
      </div>
      <div className="book-info">
        <p className="book-title">{book.title}</p>
        {book.subtitle && <p className="book-subtitle">{book.subtitle}</p>}
        {book.rating != null && <StarRating rating={book.rating} />}
        <p className="book-reason">{reason}</p>
        <span className="book-link">View on Hardcover →</span>
      </div>
    </a>
  );
}
