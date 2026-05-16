// Importing React hooks and context consumers
import { useState } from 'react'; // Hook to manage local image state
import { Link } from 'react-router-dom'; // Component for internal navigation
import { useCart } from '../../context/CartContext'; // Hook to handle shopping cart logic
import { useWishlist } from '../../context/WishlistContext'; // Hook to handle wishlist logic
import { useLanguage } from '../../context/LanguageContext'; // Hook to handle language translations
import './BookCard.css'; // Importing specific styles for the BookCard

// Reliable backup placeholder image
const PLACEHOLDER = 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=300&auto=format&fit=crop';

// Functional component to display an individual book card
export default function BookCard({ book }) {
  // Local state to track image loading attempts
  const [imageSrc, setImageSrc] = useState(book.image);
  const [retryCount, setRetryCount] = useState(0);

  // Destructuring helper functions and data from contexts
  const { cartItems, increaseQuantity, decreaseQuantity, addToCart } = useCart(); 
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); 
  const { t } = useLanguage(); 
  
  // Checking if this specific book is already in the wishlist or cart
  const wishlisted = isInWishlist(book.id); 
  const cartItem = cartItems.find((item) => item.id === book.id); 

  // Helper function to render star ratings
  const renderStars = (rating) => {
    if (!rating) return <span className="no-rating">{t.noRatings || 'No Ratings'}</span>;
    const full = Math.floor(rating);
    const stars = '★'.repeat(full) + (rating % 1 >= 0.5 ? '½' : '');
    return <span className="stars">{stars} <span className="rating-num">{rating}</span></span>;
  };

  // ADVANCED IMAGE FAILOVER SYSTEM: If one source fails, try another!
  const handleImageError = () => {
    if (retryCount === 0) {
      // Step 1: Try the standard Google Books content format
      setImageSrc(`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1`);
      setRetryCount(1);
    } else if (retryCount === 1) {
      // Step 2: Try a high-quality Unsplash book placeholder (always works!)
      setImageSrc(`https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop`);
      setRetryCount(2);
    } else {
      // Step 3: Final hard fallback
      setImageSrc(PLACEHOLDER);
    }
  };

  return (
    <div className="book-card glass-card">
      {/* Wishlist Toggle Button */}
      <button 
        className={`wishlist-btn ${wishlisted ? 'active' : ''}`} 
        onClick={() => wishlisted ? removeFromWishlist(book.id) : addToWishlist(book)}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      <Link to={`/book/${book.id}`} className="book-card-link">
        <div className="book-card-img-wrap">
          <img 
            src={imageSrc || PLACEHOLDER} 
            alt={book.title} 
            className="book-card-img" 
            loading="lazy"
            onError={handleImageError} // Trigger the failover system on error
          />
        </div>

        <div className="book-card-info">
          {book.categories && <span className="badge badge-genre">{book.categories[0]}</span>}
          <h3 className="book-card-title">{book.title}</h3>
          <div className="book-card-rating">{renderStars(book.rating || 4.5)}</div>
          <p className="book-card-price">₹{book.price}</p>
        </div>
      </Link>

      {/* Cart Controls */}
      {cartItem ? (
        <div className="book-card-qty-selector">
          <button className="qty-btn" onClick={() => decreaseQuantity(book.id)}>−</button>
          <span className="qty-value">{cartItem.quantity} {t.inCart || 'in Cart'}</span>
          <button className="qty-btn" onClick={() => increaseQuantity(book.id)}>+</button>
        </div>
      ) : (
        <button className="btn btn-primary btn-sm book-card-cart-btn" onClick={() => addToCart(book)}>
          🛒 {t.addToCart}
        </button>
      )}
    </div>
  );
}
