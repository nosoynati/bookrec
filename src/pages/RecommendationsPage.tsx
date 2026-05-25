import { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Recommendations from '../components/Recommendations';
import type { Mood } from '../lib/moodMapper';
import { fetchBooksByTags, pickRecommendations, type Book } from '../lib/hardcoverApi';

interface LocationState {
  mood: Mood;
  primary: Book;
  secondary: [Book, Book];
}

export default function RecommendationsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeState = location.state as LocationState | null;

  const [primary, setPrimary] = useState<Book | null>(routeState?.primary ?? null);
  const [secondary, setSecondary] = useState<[Book, Book] | null>(routeState?.secondary ?? null);
  const [shuffling, setShuffling] = useState(false);

  if (!routeState?.mood) return <Navigate to="/" replace />;
  if (!primary || !secondary) return <Navigate to="/" replace />;

  async function handleShuffle() {
    setShuffling(true);
    try {
      const books = await fetchBooksByTags(routeState!.mood.tags);
      const picked = pickRecommendations(books);
      if (picked) {
        setPrimary(picked.primary);
        setSecondary(picked.secondary);
      }
    } finally {
      setShuffling(false);
    }
  }

  return (
    <Recommendations
      mood={routeState.mood}
      primary={primary}
      secondary={secondary}
      onReset={() => navigate('/')}
      onShuffle={handleShuffle}
      shuffling={shuffling}
    />
  );
}
