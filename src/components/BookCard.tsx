import type { Book } from '../lib/hardcoverApi';
import StarRating from './StarRating';

interface BookCardProps {
  book: Book;
  reason: string;
  primary?: boolean;
}

const HARDCOVER_BASE = 'https://hardcover.app/books';
const PLACEHOLDER = 'https://placehold.co/200x300/e7e5e4/78716c?text=No+Cover';


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
        {book.rating != null && <StarRating rating={book.rating} />}
        <p className="book-reason">{reason}</p>
        <span className="book-link">View on Hardcover →</span>
      </div>
    </a>
  );
}
