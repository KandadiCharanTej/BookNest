// Trending Page - Shows currently trending books
import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { searchBooks } from '../services/api';
import './Trending.css';

export default function Trending() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending books on page load
  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchBooks('bestseller 2024 india', 20);
        setBooks(results);
      } catch (err) {
        setError('Failed to load trending books. Please try again.');
      }
      setLoading(false);
    };
    loadTrending();
  }, []);

  return (
    <main className="trending-page container" id="trending-page">
      <div className="trending-header">
        <h1 className="page-title">🔥 Trending Books</h1>
        <p className="page-subtitle">Discover what everyone is reading right now</p>
      </div>

      {error && <div className="error-msg">{error}</div>}

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
