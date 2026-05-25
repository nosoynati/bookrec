import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RecommendationsPage from './pages/RecommendationsPage';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <Link to="/"><span className="logo-icon"></span>
          <div>
            <h1 className="app-title">Moodreads</h1>
          </div>
          </Link>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
