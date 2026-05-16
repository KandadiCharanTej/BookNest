// Importing hooks and components
import { useState, useEffect } from 'react'; // React hooks
import BookCard from '../../components/BookCard'; // Individual book display
import Loader from '../../components/Loader'; // Loading spinner
import { useLanguage } from '../../context/LanguageContext'; // For multi-language
import { INDIAN_FEATURED_BOOKS } from '../../utils/mockData'; // Fallback data
import './Trending.css'; // Page styles

// Functional component for the Trending page
export default function Trending() {
  // Getting language translations and current language code
  const { t, lang } = useLanguage(); 
  
  // State for the list of trending books
  const [books, setBooks] = useState([]);
  
  // State to track if data is being fetched
  const [loading, setLoading] = useState(false);

  // Re-run fetching whenever the language changes
  useEffect(() => {
    fetchTrending();
  }, [lang]);

  // Function to call the Google Books API for trending books
  const fetchTrending = async () => {
    try {
      setLoading(true); // Start loading spinner
      
      // Fetch books with the 'trending bestsellers' query from the API
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=trending+bestsellers+2024&maxResults=20&langRestrict=${lang}`);
      const data = await res.json(); // Convert response to JSON
      
      // If we found books in the results
      if (data.items) {
        // Map API data into our simplified format for the BookCard component
        const formatted = data.items.map(item => {
           // CRITICAL: Force HTTPS for all book images to prevent "Mixed Content" security blocks
          const rawImage = item.volumeInfo.imageLinks?.thumbnail || null;
          const secureImage = rawImage ? rawImage.replace('http://', 'https://') : null;

          return {
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown Author'],
            price: 499, // Static price for presentation
            image: secureImage,
            categories: item.volumeInfo.categories || ['Trending'],
            rating: item.volumeInfo.averageRating || 4.5
          };
        });
        setBooks(formatted); // Update state
      } else {
        // Fallback to static data if no API results
        setBooks(INDIAN_FEATURED_BOOKS.slice(0, 20));
      }
    } catch (err) {
      // Log errors and use local data if API fails
      console.log(err);
      setBooks(INDIAN_FEATURED_BOOKS.slice(0, 20));
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    // Main container for the trending page
    <main className="trending-page container">
      
      {/* Header section with page title and description */}
      <div className="trending-header">
        <h1 className="page-title">🔥 {t.trending}</h1>
        <p className="page-subtitle">{t.trendingSubtitle}</p>
      </div>

      {/* Conditional rendering based on loading state */}
      {loading ? (
        <Loader /> // Show spinner while loading
      ) : (
        /* Render the grid of book cards */
        <div className="books-grid">
          {books.length > 0 ? (
            /* Map through each book and render a BookCard component */
            books.map(book => <BookCard key={book.id} book={book} />)
          ) : (
            /* Simple text if no books are available */
            <p>Unable to load books right now.</p>
          )}
        </div>
      )}
    </main>
  );
}
