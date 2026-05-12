// Wishlist Page - Shows saved favorite books
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './Wishlist.css';

const PLACEHOLDER = 'https://via.placeholder.com/80x120/1E293B/F97316?text=Book';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Move book from wishlist to cart
  const handleMoveToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book.id);
  };

  // Show empty state if wishlist is empty
  if (wishlistItems.length === 0) {
    return (
      <main className="wishlist-page container">
        <div className="empty-state">
          <p className="empty-state-icon">♥</p>
          <h3>Your wishlist is empty</h3>
          <p>Save books you love and come back to them later</p>
          <Link to="/explore" className="btn btn-primary">Discover Books</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page container" id="wishlist-page">
      <h1 className="page-title">♥ My Wishlist</h1>
      <p className="wishlist-count">{wishlistItems.length} book{wishlistItems.length !== 1 ? 's' : ''} saved</p>

      <div className="wishlist-grid">
        {wishlistItems.map((book) => (
          <div className="wishlist-item glass-card" key={book.id}>
            <Link to={`/book/${book.id}`} className="wishlist-item-link">
              <img
                src={book.image || PLACEHOLDER}
                alt={book.title}
                className="wishlist-item-img"
                onError={(e) => { e.target.src = PLACEHOLDER; }}
              />
              <div className="wishlist-item-info">
                <h3 className="wishlist-item-title">{book.title}</h3>
                <p className="wishlist-item-author">{book.authors[0]}</p>
                <p className="wishlist-item-price">₹{book.price}</p>
              </div>
            </Link>
            <div className="wishlist-item-actions">
              <button className="btn btn-primary btn-sm" onClick={() => handleMoveToCart(book)}>
                🛒 Move to Cart
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromWishlist(book.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
