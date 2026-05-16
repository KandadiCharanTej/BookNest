// Importing hooks and components from React and React Router
import { useState, useEffect } from 'react'; // State and lifecycle hooks
import { useSearchParams, useNavigate } from 'react-router-dom'; // Hooks for URL parameters and navigation
import BookCard from '../../components/BookCard'; // Individual book display component
import Loader from '../../components/Loader'; // Loading indicator
import { useLanguage } from '../../context/LanguageContext'; // Hook for multi-language support
import { INDIAN_FEATURED_BOOKS } from '../../utils/mockData'; // Local data for fallback
import './Explore.css'; // Importing custom styles for this page

// Functional component for the Explore/Search page
export default function Explore() {
  // Accessing language translations
  const { t, lang } = useLanguage(); 
  
  // searchParams allows us to read values from the URL like ?search=harry
  const [searchParams] = useSearchParams();
  
  // useNavigate lets us programmatically change the URL
  const navigate = useNavigate();
  
  // State to store the list of books found
  const [books, setBooks] = useState([]);
  
  // Local state to manage the search input text
  const [query, setQuery] = useState(searchParams.get('search') || '');
  
  // State to track if data is currently being fetched
  const [loading, setLoading] = useState(false);

  // Triggered whenever the search parameter in the URL or the language changes
  useEffect(() => {
    // Get the current search term from the URL, or use a default one
    const searchTerm = searchParams.get('search') || 'trending bestsellers';
    fetchResults(searchTerm); // Start the API fetch
  }, [searchParams, lang]);

  // Function to fetch book results from the Google Books API
  const fetchResults = async (term) => {
    try {
      setLoading(true); // Start loading animation
      
      // Fetch books from the API based on the search term and current language
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}&maxResults=20&langRestrict=${lang}`);
      const data = await response.json(); // Parse results
      
      // If books are found
      if (data.items) {
        // Map API data to our clean format for the BookCard component
        const formatted = data.items.map(item => {
          // CRITICAL: Force HTTPS for all book images to prevent "Mixed Content" security blocks
          const rawImage = item.volumeInfo.imageLinks?.thumbnail || null;
          const secureImage = rawImage ? rawImage.replace('http://', 'https://') : null;

          return {
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown Author'],
            price: 399, // Static price for demo
            image: secureImage,
            categories: item.volumeInfo.categories || ['Explore'],
            rating: item.volumeInfo.averageRating || 4.0
          };
        });
        setBooks(formatted); // Update book list
      } else {
        // If no results, show fallback data
        setBooks(INDIAN_FEATURED_BOOKS.slice(0, 20));
      }
    } catch (error) {
      // Handle network errors by logging and showing fallback data
      console.log(error);
      setBooks(INDIAN_FEATURED_BOOKS.slice(0, 20));
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Function triggered when the user submits the search form
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (query.trim()) {
      // Update the URL with the new search term, which triggers the useEffect
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    // Main container for the explore page
    <main className="explore-page container">
      
      {/* Header section with Title and Search Input */}
      <div className="explore-header">
        <h1 className="page-title">📚 {t.explore}</h1>
        
        {/* Search Bar Form */}
        <form className="explore-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={query} // Bind input to local state
            onChange={(e) => setQuery(e.target.value)} // Update state on typing
            className="form-input"
          />
          {/* Submit button with search icon */}
          <button type="submit" className="btn btn-primary">🔍 {t.explore}</button>
        </form>
      </div>

      {/* Conditional Rendering: Show loader or the grid of books */}
      {loading ? (
        <Loader />
      ) : (
        <div className="books-grid">
          {/* If books exist, map through them; otherwise show error text */}
          {books.length > 0 ? (
            books.map(book => <BookCard key={book.id} book={book} />)
          ) : (
            <p>Unable to load books right now.</p>
          )}
        </div>
      )}
    </main>
  );
}
