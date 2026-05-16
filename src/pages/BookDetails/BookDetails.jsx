// Importing hooks and components from React and Router
import { useState, useEffect } from 'react'; // Hooks for state and side effects
import { useParams } from 'react-router-dom'; // Hook to get the 'id' from the URL
import BookCard from '../../components/BookCard'; // Component for similar books list
import Loader from '../../components/Loader'; // Loading spinner
import { useCart } from '../../context/CartContext'; // Hook for cart management
import { useWishlist } from '../../context/WishlistContext'; // Hook for wishlist management
import { INDIAN_FEATURED_BOOKS } from '../../utils/mockData'; // Static local data for fallback
import './BookDetails.css'; // Specific styles for this page

// Premium placeholder image for books without a thumbnail
const PLACEHOLDER = 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=400&auto=format&fit=crop';

// Functional component for the Book Details page
export default function BookDetails() {
  // Get the 'id' parameter from the URL
  const { id } = useParams();
  
  // Access global functions for Cart and Wishlist
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // State to store the details of the specific book
  const [book, setBook] = useState(null);
  
  // State to store a list of similar books
  const [similar, setSimilar] = useState([]);
  
  // State to track if the page is currently loading data
  const [loading, setLoading] = useState(true);

  // useEffect runs whenever the 'id' in the URL changes
  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position to top
    fetchBook(); // Load the specific book data
  }, [id]);

  // Function to fetch book details
  const fetchBook = async () => {
    try {
      setLoading(true); // Show loader

      // 1. Check local static data first
      const indianBook = INDIAN_FEATURED_BOOKS.find(b => b.id === id);
      if (indianBook) {
        setBook(indianBook);
        setSimilar(INDIAN_FEATURED_BOOKS.filter(b => b.id !== id).slice(0, 4));
        setLoading(false);
        return;
      }

      // 2. Fetch from Google Books API
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await res.json();
      
      if (data.volumeInfo) {
        const formatted = {
          id: data.id,
          title: data.volumeInfo.title,
          authors: data.volumeInfo.authors || ['Unknown Author'],
          price: 499,
          image: data.volumeInfo.imageLinks?.thumbnail || data.volumeInfo.imageLinks?.medium || null,
          description: data.volumeInfo.description || 'No description available.',
          categories: data.volumeInfo.categories || ['General'],
          rating: data.volumeInfo.averageRating || 4.2,
          publishedDate: data.volumeInfo.publishedDate || 'Unknown',
          publisher: data.volumeInfo.publisher || 'Unknown Publisher',
          pageCount: data.volumeInfo.pageCount || 0,
        };
        setBook(formatted);

        // 3. Fetch similar books
        if (formatted.categories[0]) {
          const simRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(formatted.categories[0])}&maxResults=5`);
          const simData = await simRes.json();
          if (simData.items) {
             const simFormatted = simData.items.map(item => ({
               id: item.id,
               title: item.volumeInfo.title,
               authors: item.volumeInfo.authors || ['Unknown Author'],
               price: 399,
               image: item.volumeInfo.imageLinks?.thumbnail || null,
               categories: item.volumeInfo.categories || [formatted.categories[0]],
               rating: item.volumeInfo.averageRating || 4.0
             }));
             setSimilar(simFormatted.filter(b => b.id !== id));
          }
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Wikipedia search helper
  const openWikipedia = () => {
    const searchTerm = book.title.split(' ').join('_');
    window.open(`https://en.wikipedia.org/wiki/${searchTerm}`, '_blank');
  };

  // Image error fallback
  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER;
    e.target.onerror = null;
  };

  if (loading) return <Loader />;
  if (!book) return <div className="container">Unable to load book details.</div>;

  const wishlisted = isInWishlist(book.id);
  const cartItem = cartItems.find((item) => item.id === book.id); // Check if in cart

  return (
    <main className="book-details-page">
      <div className="container">
        <div className="details-layout">
          
          <div className="details-image-col">
            <div className="details-image-wrap glass-card">
              <img 
                src={book.image || PLACEHOLDER} 
                alt={book.title} 
                className="details-image" 
                onError={handleImageError}
              />
            </div>
          </div>

          <div className="details-info-col">
            <span className="badge badge-genre">{book.categories[0]}</span>
            <h1 className="details-title">{book.title}</h1>
            <p className="details-author">by {book.authors.join(', ')}</p>
            <p className="details-price">₹{book.price}</p>

            <div className="details-meta">
              <div className="meta-item">
                <span className="meta-label">Published</span>
                <span className="meta-value">{book.publishedDate}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Pages</span>
                <span className="meta-value">{book.pageCount || 'N/A'}</span>
              </div>
            </div>

            <div className="details-description">
              <h3>About this book</h3>
              <p dangerouslySetInnerHTML={{ __html: book.description }}></p>
            </div>

            <div className="details-actions">
              {/* Conditional Cart Controls in Details Page */}
              {cartItem ? (
                <div className="details-qty-selector glass-card">
                  <button className="qty-btn" onClick={() => decreaseQuantity(book.id)}>−</button>
                  <span className="qty-value">{cartItem.quantity} in Cart</span>
                  <button className="qty-btn" onClick={() => increaseQuantity(book.id)}>+</button>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => addToCart(book)}>🛒 Add to Cart</button>
              )}
              
              <button 
                className={`btn ${wishlisted ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => wishlisted ? removeFromWishlist(book.id) : addToWishlist(book)}
              >
                {wishlisted ? '💔 Remove' : '♥ Wishlist'}
              </button>
              
              <button className="btn btn-wiki" onClick={openWikipedia}>🌐 Wikipedia</button>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="section">
            <h2 className="section-title">📖 Similar Books</h2>
            <div className="books-grid">
              {similar.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
