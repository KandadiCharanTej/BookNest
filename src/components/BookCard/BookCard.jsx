// Importing React hooks and context consumers
import { Link } from 'react-router-dom'; // Component for internal navigation
import { useCart } from '../../context/CartContext'; // Hook to handle shopping cart logic
import { useWishlist } from '../../context/WishlistContext'; // Hook to handle wishlist logic
import { useLanguage } from '../../context/LanguageContext'; // Hook to handle language translations
import './BookCard.css'; // Importing specific styles for the BookCard

// Premium placeholder image for books without a thumbnail
const PLACEHOLDER = 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=300&auto=format&fit=crop';

// Functional component to display an individual book card
export default function BookCard({ book }) {
  // Destructuring helper functions and data from contexts
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } = useCart(); 
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); 
  const { t } = useLanguage(); 
  
  // Checking if this specific book is already in the wishlist or cart
  const wishlisted = isInWishlist(book.id); 
  const cartItem = cartItems.find((item) => item.id === book.id); // Get the item if it's in the cart

  // Helper function to render star ratings based on a number (e.g., 4.5)
  const renderStars = (rating) => {
    if (!rating) return <span className="no-rating">{t.noRatings || 'No Ratings'}</span>;
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (half) stars += '½';
    return <span className="stars">{stars} <span className="rating-num">{rating}</span></span>;
  };

  // Function to handle image loading errors gracefully
  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER;
    e.target.onerror = null;
  };

  return (
    // Main card container with a 'glass' effect style
    <div className="book-card glass-card">
      
      {/* Wishlist Toggle Button */}
      <button 
        className={`wishlist-btn ${wishlisted ? 'active' : ''}`} 
        onClick={() => wishlisted ? removeFromWishlist(book.id) : addToWishlist(book)}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      {/* Clickable link to the Book Details page */}
      <Link to={`/book/${book.id}`} className="book-card-link">
        
        {/* Image wrapper for the book cover */}
        <div className="book-card-img-wrap">
          <img 
            src={book.image || PLACEHOLDER} 
            alt={book.title} 
            className="book-card-img" 
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        {/* Content section of the card */}
        <div className="book-card-info">
          {/* Badge showing the book's category */}
          {book.categories && <span className="badge badge-genre">{book.categories[0]}</span>}
          
          {/* Book Title */}
          <h3 className="book-card-title">{book.title}</h3>
          
          {/* Star Rating Section */}
          <div className="book-card-rating">{renderStars(book.rating || 4.5)}</div>
          
          {/* Price Tag */}
          <p className="book-card-price">₹{book.price}</p>
        </div>
      </Link>

      {/* Conditional Rendering for Cart Controls */}
      {cartItem ? (
        /* If item is in cart, show Quantity Selector [-] Qty [+] */
        <div className="book-card-qty-selector">
          <button className="qty-btn" onClick={() => decreaseQuantity(book.id)}>−</button>
          <span className="qty-value">{cartItem.quantity} {t.inCart || 'in Cart'}</span>
          <button className="qty-btn" onClick={() => increaseQuantity(book.id)}>+</button>
        </div>
      ) : (
        /* If item is NOT in cart, show standard Add to Cart button */
        <button 
          className="btn btn-primary btn-sm book-card-cart-btn" 
          onClick={() => addToCart(book)}
        >
          🛒 {t.addToCart}
        </button>
      )}
    </div>
  );
}
