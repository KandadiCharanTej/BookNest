// Importing tools for navigation and state management
import { Link } from 'react-router-dom'; // Component for internal links
import { useWishlist } from '../../context/WishlistContext'; // Hook for managing favorite books
import { useCart } from '../../context/CartContext'; // Hook for shopping cart management
import './Wishlist.css'; // Importing styles for the wishlist page

// Premium placeholder image for broken links
const PLACEHOLDER = 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=200&auto=format&fit=crop';

// Functional component for the Wishlist page
export default function Wishlist() {
  // Accessing saved items and removal function from wishlist context
  const { wishlistItems, removeFromWishlist } = useWishlist();
  
  // Accessing add-to-cart function from cart context
  const { addToCart } = useCart();

  // Helper function to handle image errors
  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER;
    e.target.onerror = null;
  };

  // Helper function to move a book from wishlist to shopping cart
  const handleMoveToCart = (book) => {
    addToCart(book); // Add it to the cart
    removeFromWishlist(book.id); // Then remove it from the wishlist
  };

  // If no books are saved, show an empty state screen
  if (wishlistItems.length === 0) {
    return (
      <main className="wishlist-page container">
        <div className="empty-state">
          <p className="empty-state-icon">♥</p>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite books to read them later!</p>
          <Link to="/explore" className="btn btn-primary">Discover New Books</Link>
        </div>
      </main>
    );
  }

  return (
    // Main wrapper for the wishlist page content
    <main className="wishlist-page container">
      {/* Page Title */}
      <h1 className="page-title">♥ My Wishlist</h1>
      
      {/* Subtitle showing how many books are saved */}
      <p className="wishlist-count">{wishlistItems.length} book{wishlistItems.length !== 1 ? 's' : ''} saved</p>

      {/* Grid layout for displaying saved books */}
      <div className="wishlist-grid">
        {wishlistItems.map((book) => (
          /* Card for each wishlist item */
          <div className="wishlist-item glass-card" key={book.id}>
            
            {/* Clickable link to book details page */}
            <Link to={`/book/${book.id}`} className="wishlist-item-link">
              {/* Book Thumbnail with error handling */}
              <img 
                src={book.image} 
                alt={book.title} 
                className="wishlist-item-img" 
                onError={handleImageError}
              />
              
              {/* Book text information */}
              <div className="wishlist-item-info">
                <h3 className="wishlist-item-title">{book.title}</h3>
                <p className="wishlist-item-author">{book.authors?.join(', ') || 'Unknown Author'}</p>
                <p className="wishlist-item-price">₹{book.price}</p>
              </div>
            </Link>

            {/* Action buttons section */}
            <div className="wishlist-item-actions">
              {/* Move to cart button */}
              <button className="btn btn-primary btn-sm" onClick={() => handleMoveToCart(book)}>
                🛒 Move to Cart
              </button>
              
              {/* Remove from wishlist button */}
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
