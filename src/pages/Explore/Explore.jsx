// Explore Page - Search and browse all books
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import Loader from '../../components/Loader';
import { searchBooks } from '../../services/api';
import './Explore.css';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState(searchQuery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books when search query changes
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchTerm = searchQuery || 'bestselling books';
        const results = await searchBooks(searchTerm, 20);
        setBooks(results);
      } catch {
        setError('Failed to load books. Please try again.');
      }
      setLoading(false);
    };
    loadBooks();
  }, [searchQuery]);

  const navigate = useNavigate();

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <main className="explore-page container" id="explore-page">
      <div className="explore-header">
        <h1 className="page-title">📚 Explore Books</h1>
        <p className="page-subtitle">
          {searchQuery
            ? `Showing results for "${searchQuery}"`
            : 'Discover thousands of amazing books from all over the world'}
        </p>

        {/* Search form */}
        <form className="explore-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input explore-search-input"
            id="explore-search-input"
          />
          <button type="submit" className="btn btn-primary" id="explore-search-btn">
            🔍 Search
          </button>
        </form>
      </div>

      {/* Results */}
      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <Loader />
      ) : books.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-icon">🔍</p>
          <h3>No books found</h3>
          <p>Try a different search term</p>
        </div>
      ) : (
        <div className="books-grid">{books.map((b) => <BookCard key={b.id} book={b} />)}</div>
      )}
    </main>
  );
}
