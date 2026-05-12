import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './BookCard.css';

const PLACEHOLDER = 'https://via.placeholder.com/128x192/1E293B/F97316?text=No+Cover';

export default function BookCard({ book }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(book.id);

  // Render star rating or fallback text
  const renderStars = (rating) => {
    if (!rating) return <span className="no-rating">No Ratings</span>;
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (half) stars += '½';
    return <span className="stars">{stars} <span className="rating-num">{rating}</span></span>;
  };

  return (
    <div className="book-card glass-card" id={`book-card-${book.id}`}>
      {/* Wishlist toggle button */}
      <button
        className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          wishlisted ? removeFromWishlist(book.id) : addToWishlist(book);
        }}
        aria-label="Toggle wishlist"
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      {/* Book info - links to details page */}
      <Link to={`/book/${book.id}`} className="book-card-link">
        <div className="book-card-img-wrap">
          <img
            src={book.image || PLACEHOLDER}
            alt={book.title}
            className="book-card-img"
            loading="lazy"
            onError={(e) => { e.target.src = PLACEHOLDER; }}
          />
        </div>
        <div className="book-card-info">
          <span className="badge badge-genre">{book.categories[0]}</span>
          <h3 className="book-card-title">{book.title}</h3>
          <p className="book-card-author">{book.authors[0]}</p>
          <div className="book-card-rating">{renderStars(book.rating)}</div>
          <p className="book-card-price">₹{book.price}</p>
        </div>
      </Link>

      {/* Add to Cart button */}
      <button
        className="btn btn-primary btn-sm book-card-cart-btn"
        onClick={() => addToCart(book)}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}
