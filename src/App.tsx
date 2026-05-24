import { useState } from 'react';
import './App.css';
import MoodInput from './components/MoodInput';
import Recommendations from './components/Recommendations';
import { detectMood, type Mood } from './lib/moodMapper';
import { fetchBooksByTags, pickRecommendations, type Book } from './lib/hardcoverApi';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'results'; mood: Mood; primary: Book; secondary: [Book, Book] }
  | { status: 'error'; message: string }
  | { status: 'empty'; mood: Mood };

export default function App() {
  const [state, setState] = useState<State>({ status: 'idle' });

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

      setState({ status: 'results', mood, ...picked });
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
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo-icon">📚</span>
          <div>
            <h1 className="app-title">Moodreads</h1>
            <p className="app-subtitle">Books matched to how you feel</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {(state.status === 'idle' || state.status === 'loading') && (
          <div className="hero">
            <div className="hero-text">
              <h2 className="hero-heading">
                Tell us how you feel,<br />we'll find your next read.
              </h2>
              <p className="hero-desc">
                Describe your mood in a few words and get a personalised book recommendation powered by Hardcover.
              </p>
            </div>
            <MoodInput onSubmit={handleSubmit} loading={state.status === 'loading'} />
          </div>
        )}

        {state.status === 'results' && (
          <Recommendations
            mood={state.mood}
            primary={state.primary}
            secondary={state.secondary}
            onReset={reset}
          />
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
      </main>

      <footer className="app-footer">
        <p>Powered by <a href="https://hardcover.app" target="_blank" rel="noopener noreferrer">Hardcover</a></p>
      </footer>
    </div>
  );
}
