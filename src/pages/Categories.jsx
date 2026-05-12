// Categories Page - Browse books by genre
import { useState } from 'react';
import CategoryBar from '../components/CategoryBar';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { getBooksByCategory } from '../services/api';
import './Categories.css';

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books when a category is selected
  const handleCategorySelect = async (cat) => {
    setActiveCategory(cat);
    if (!cat) {
      setBooks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await getBooksByCategory(cat, 12);
      setBooks(results);
    } catch (err) {
      setError('Failed to load category books.');
    }
    setLoading(false);
  };

  return (
    <main className="categories-page container" id="categories-page">
      <div className="categories-header">
        <h1 className="page-title">📂 Browse by Genre</h1>
        <p className="page-subtitle">Select a genre to discover books</p>
      </div>

      {/* Category filter chips */}
      <CategoryBar active={activeCategory} onSelect={handleCategorySelect} />

      {/* Results */}
      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <Loader />
      ) : !activeCategory ? (
        <div className="empty-state">
          <p className="empty-state-icon">📚</p>
          <h3>Select a genre above</h3>
          <p>Choose a category to start browsing books</p>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-icon">🔍</p>
          <h3>No books found in {activeCategory}</h3>
          <p>Try selecting a different genre</p>
        </div>
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
