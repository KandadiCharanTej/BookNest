// Explore Page - Search and browse all books
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import Loader from '../../components/Loader';
import { useLanguage } from '../../context/LanguageContext';
import { searchBooks } from '../../services/api';
import './Explore.css';

export default function Explore() {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState(searchQuery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books when search query changes
  useEffect(() => {
    setQuery(searchQuery); // Keep input in sync with URL
    
    const loadBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchTerm = searchQuery || 'trending bestsellers';
        // Fetch 40 books (max per request)
        const results = await searchBooks(searchTerm, 40, lang);
        setBooks(results || []);
      } catch {
        setError('Failed to load books. Please check your connection.');
      }
      setLoading(false);
    };
    loadBooks();
  }, [searchQuery, lang]);

  const retryLoad = () => {
    window.location.reload();
  };

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
        <h1 className="page-title">📚 {t.explore}</h1>
        <p className="page-subtitle">
          {searchQuery
            ? `Showing results for "${searchQuery}"`
            : t.heroSubtitle}
        </p>

        {/* Search form */}
        <form className="explore-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input explore-search-input"
            id="explore-search-input"
          />
          <button type="submit" className="btn btn-primary" id="explore-search-btn">
            🔍 {t.explore}
          </button>
        </form>
      </div>

      {/* Results */}
      {error && (
        <div className="error-container">
          <div className="error-msg">{error}</div>
          <button className="btn btn-secondary" onClick={retryLoad}>🔄 Retry</button>
        </div>
      )}

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
