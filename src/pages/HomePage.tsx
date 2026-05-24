import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodInput from '../components/MoodInput';
import { detectMood, type Mood } from '../lib/moodMapper';
import { fetchBooksByTags, pickRecommendations } from '../lib/hardcoverApi';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty'; mood: Mood };

export default function HomePage() {
  const [state, setState] = useState<State>({ status: 'idle' });
  const navigate = useNavigate();

  async function handleSubmit(input: string) {
    setState({ status: 'loading' });
    const mood = detectMood(input);

    try {
      const books = await fetchBooksByTags(mood.tags);
      const picked = pickRecommendations(books);

      if (!picked) {
        setState({ status: 'empty', mood });
        return;
      }

      navigate('/recommendations', { state: { mood, ...picked } });
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong.',
      });
    }
  }

  function reset() {
    setState({ status: 'idle' });
  }

  return (
    <>
      {(state.status === 'idle' || state.status === 'loading') && (
        <div className="hero">
          <div className="hero-text">
            <h3 className="hero-heading">A read based on your mood.</h3>
          </div>
          <MoodInput onSubmit={handleSubmit} loading={state.status === 'loading'} />
        </div>
      )}

      {state.status === 'empty' && (
        <div className="feedback-card">
          <p className="feedback-emoji">{state.mood.emoji}</p>
          <p className="feedback-title">No books found for this mood</p>
          <p className="feedback-desc">
            We couldn't find books tagged for <strong>{state.mood.label}</strong>. Try describing your mood differently.
          </p>
          <button className="reset-btn" onClick={reset}>Try again</button>
        </div>
      )}

      {state.status === 'error' && (
        <div className="feedback-card feedback-card--error">
          <p className="feedback-emoji">⚠️</p>
          <p className="feedback-title">Something went wrong</p>
          <p className="feedback-desc">{state.message}</p>
          <button className="reset-btn" onClick={reset}>Try again</button>
        </div>
      )}
    </>
  );
}
