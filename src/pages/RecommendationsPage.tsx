import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Recommendations from '../components/Recommendations';
import type { Mood } from '../lib/moodMapper';
import type { Book } from '../lib/hardcoverApi';

interface LocationState {
  mood: Mood;
  primary: Book;
  secondary: [Book, Book];
}

export default function RecommendationsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state?.mood) return <Navigate to="/" replace />;

  return (
    <Recommendations
      mood={state.mood}
      primary={state.primary}
      secondary={state.secondary}
      onReset={() => navigate('/')}
    />
  );
}
