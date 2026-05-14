// Book Details Page - Shows full book information
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import Loader from '../../components/Loader';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { getBookById, getBooksByCategory, INDIAN_FEATURED_BOOKS } from '../../services/api';
import './BookDetails.css';

const PLACEHOLDER = 'https://via.placeholder.com/300x450/1E293B/F97316?text=No+Cover';

export default function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [book, setBook] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book details when page loads or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadBook = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check if it's a static Indian book first
        const indianBook = INDIAN_FEATURED_BOOKS.find((b) => b.id === id);

        if (indianBook) {
          setBook(indianBook);
          // Show other Indian books as similar
          setSimilar(INDIAN_FEATURED_BOOKS.filter((b) => b.id !== id).slice(0, 4));
        } else {
          // Fetch from Google Books API
          const fetchedBook = await getBookById(id);
          setBook(fetchedBook);

          // Track genre for recommendations
          const genres = JSON.parse(localStorage.getItem('booknest_genres') || '[]');
          const cat = fetchedBook.categories[0];
          if (cat && cat !== 'General' && !genres.includes(cat)) {
            genres.push(cat);
            localStorage.setItem('booknest_genres', JSON.stringify(genres.slice(-5)));
          }

          // Fetch similar books from same category
          if (cat && cat !== 'General') {
            const simBooks = await getBooksByCategory(cat, 6);
            setSimilar(simBooks.filter((b) => b.id !== id));
          }
        }
      } catch {
        setError('Failed to load book details. Please try again.');
      }
      setLoading(false);
    };

    loadBook();
  }, [id]);

  // Open Wikipedia page for the book
  const openWikipedia = () => {
    const searchTerm = book.title.replace(/ /g, '_');
    window.open(`https://en.wikipedia.org/wiki/${searchTerm}`, '_blank');
  };

  // Render star rating
  const renderStars = (rating) => {
    if (!rating) return <span className="detail-no-rating">No Ratings Available</span>;
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < Math.round(rating) ? '★' : '☆';
    }
    return (
      <span className="stars detail-stars">
        {stars} <span className="rating-num">{rating} / 5</span>
      </span>
    );
  };

  // Show loader while fetching
  if (loading) return <Loader />;

  // Show error message
  if (error) {
    return (
      <div className="container section">
        <div className="error-msg">{error}</div>
      </div>
    );
  }

  if (!book) return null;

  const wishlisted = isInWishlist(book.id);

  return (
    <main className="book-details-page">
      <div className="container">
        <div className="details-layout">
          {/* Left Side - Book Image */}
          <div className="details-image-col">
            <div className="details-image-wrap glass-card">
              <img
                src={book.image || PLACEHOLDER}
                alt={book.title}
                className="details-image"
                onError={(e) => { e.target.src = PLACEHOLDER; }}
              />
            </div>
          </div>

          {/* Right Side - Book Info */}
          <div className="details-info-col">
            <span className="badge badge-genre">{book.categories[0]}</span>
            <h1 className="details-title">{book.title}</h1>
            <p className="details-author">by {book.authors.join(', ')}</p>
            <div className="details-rating">{renderStars(book.rating)}</div>
            <p className="details-price">₹{book.price}</p>

            {/* Book metadata */}
            <div className="details-meta">
              <div className="meta-item">
                <span className="meta-label">Published</span>
                <span className="meta-value">{book.publishedDate}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Publisher</span>
                <span className="meta-value">{book.publisher}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Pages</span>
                <span className="meta-value">{book.pageCount || 'N/A'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="details-description">
              <h3>About this book</h3>
              <p dangerouslySetInnerHTML={{ __html: book.description }}></p>
            </div>

            {/* Action buttons */}
            <div className="details-actions">
              <button className="btn btn-primary" onClick={() => addToCart(book)} id="detail-add-cart">
                🛒 Add to Cart
              </button>
              <button
                className={`btn ${wishlisted ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => wishlisted ? removeFromWishlist(book.id) : addToWishlist(book)}
                id="detail-wishlist"
              >
                {wishlisted ? '💔 Remove from Wishlist' : '♥ Add to Wishlist'}
              </button>
              <button className="btn btn-wiki" onClick={openWikipedia} id="detail-wikipedia">
                🌐 Research on Wikipedia
              </button>
            </div>
          </div>
        </div>

        {/* Similar Books Section */}
        {similar.length > 0 && (
          <section className="section" id="similar-books">
            <h2 className="section-title">📖 Similar Books</h2>
            <div className="books-grid">
              {similar.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
