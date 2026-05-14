// Trending Page - Shows currently trending books
import { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard';
import Loader from '../../components/Loader';
import { useLanguage } from '../../context/LanguageContext';
import { searchBooks } from '../../services/api';
import './Trending.css';

export default function Trending() {
  const { lang, t } = useLanguage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending books on page load
  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchBooks('trending bestsellers 2024', 40, lang);
        setBooks(results);
      } catch {
        setError('Failed to load trending books. Please try again.');
      }
      setLoading(false);
    };
    loadTrending();
  }, [lang]);

  const retryLoad = () => window.location.reload();

  return (
    <main className="trending-page container" id="trending-page">
      <div className="trending-header">
        <h1 className="page-title">🔥 {t.trending}</h1>
        <p className="page-subtitle">{t.trendingSubtitle || 'Discover what everyone is reading right now'}</p>
      </div>

      {error && (
        <div className="error-container">
          <div className="error-msg">{error}</div>
          <button className="btn btn-secondary" onClick={retryLoad}>🔄 Retry</button>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
