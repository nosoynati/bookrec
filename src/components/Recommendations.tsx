import type { Book } from '../lib/hardcoverApi';
import type { Mood } from '../lib/moodMapper';
import { getRecommendationReason } from '../lib/moodMapper';
import BookCard from './BookCard';

interface RecommendationsProps {
  mood: Mood;
  primary: Book;
  secondary: [Book, Book];
  onReset: () => void;
}

export default function Recommendations({ mood, primary, secondary, onReset }: RecommendationsProps) {
  return (
    <section className="recommendations">
      <div className="mood-badge">
        <span className="mood-emoji">{mood.emoji}</span>
        <span className="mood-name">{mood.label}</span>
      </div>

      <p className="mood-message">{mood.message}</p>

      <div className="reco-tags">
        {mood.tags.slice(0, 5).map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="primary-slot">
        <p className="slot-label">Your main read</p>
        <BookCard
          book={primary}
          reason={getRecommendationReason(mood.key, primary.matchedTag)}
          primary
        />
      </div>

      <div className="secondary-grid">
        <p className="slot-label">You might also like</p>
        <div className="secondary-row">
          {secondary.map(book => (
            <BookCard
              key={book.id}
              book={book}
              reason={getRecommendationReason(mood.key, book.matchedTag)}
            />
          ))}
        </div>
      </div>

      <button className="reset-btn" onClick={onReset}>
        Try a different feeling
      </button>
    </section>
  );
}
