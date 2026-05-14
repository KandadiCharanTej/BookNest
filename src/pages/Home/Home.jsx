// Home Page - Shows hero section and featured Indian books
import { useState, useEffect } from 'react';
import Hero from '../../components/Hero';
import BookCard from '../../components/BookCard';
import Loader from '../../components/Loader';
import { useLanguage } from '../../context/LanguageContext';
import { INDIAN_FEATURED_BOOKS, searchBooks } from '../../services/api';
import './Home.css';

export default function Home() {
  const { t } = useLanguage();
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch personalized recommendations on page load
  useEffect(() => {
    const loadRecommended = async () => {
      setLoading(true);
      try {
        // Check if user has browsed any genres before
        const genres = JSON.parse(localStorage.getItem('booknest_genres') || '[]');
        const query = genres.length > 0 ? genres[genres.length - 1] : 'indian bestseller';
        const results = await searchBooks(query, 8);
        setRecommended(results);
      } catch {
        setError('Could not load recommendations. Please try again.');
      }
      setLoading(false);
    };
    loadRecommended();
  }, []);

  const retryRecommended = () => {
    localStorage.removeItem('booknest_genres'); // Clear potential bad data
    window.location.reload();
  };

  return (
    <main className="home-page">
      {/* Hero Section */}
      <Hero />

      <div className="container">
        {/* Featured Indian Books - Static Data */}
        <section className="section" id="featured-indian">
          <h2 className="section-title">✨ {t.featuredTitle}</h2>
          <div className="books-grid">
            {INDIAN_FEATURED_BOOKS.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Recommended For You - Dynamic API Data */}
        <section className="section" id="recommended">
          <h2 className="section-title">⭐ {t.recommendedTitle}</h2>
          {error && (
            <div className="error-container">
              <div className="error-msg">{error}</div>
              <button className="btn btn-secondary btn-sm" onClick={retryRecommended}>🔄 Retry</button>
            </div>
          )}
          {loading ? (
            <Loader />
          ) : (
            <div className="books-grid">
              {recommended.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
