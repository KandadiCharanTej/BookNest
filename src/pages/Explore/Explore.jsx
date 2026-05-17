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

  // Function to fetch book results from the Google Books API and apply strict filtering
  const fetchResults = async (term) => {
    try {
      setLoading(true); // Start loading animation
      
      const lowerQuery = term.toLowerCase().trim();
      const isDefaultQuery = lowerQuery === 'trending bestsellers' || lowerQuery === '';
      
      // Fetch books from the API based on the search term and current language
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}&maxResults=20&langRestrict=${lang}`);
      const data = await response.json(); // Parse results
      
      let results = [];
      
      // If books are found in Google Books API
      if (data.items) {
        // Map API data to our clean format for the BookCard component
        const formatted = data.items.map(item => {
          const bookId = item.id;
          const secureImage = `https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w400-h600&source=gbs_api`;

          return {
            id: bookId,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown Author'],
            price: 399, // Static price for demo
            image: secureImage,
            categories: item.volumeInfo.categories || ['Explore'],
            rating: item.volumeInfo.averageRating || 4.0
          };
        });

        // If it's a specific search query (not the default view), strictly filter the Google Books results to match
        if (!isDefaultQuery) {
          results = formatted.filter(book => 
            book.title.toLowerCase().includes(lowerQuery) ||
            book.authors.some(author => author.toLowerCase().includes(lowerQuery)) ||
            book.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
          );
        } else {
          results = formatted;
        }
      }

      // Fallback: If no results from API, or API results were filtered to empty, fall back to filtered mock data
      if (results.length === 0) {
        if (!isDefaultQuery) {
          results = INDIAN_FEATURED_BOOKS.filter(book => 
            book.title.toLowerCase().includes(lowerQuery) ||
            book.authors.some(author => author.toLowerCase().includes(lowerQuery)) ||
            book.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
          );
        } else {
          results = INDIAN_FEATURED_BOOKS;
        }
      }

      setBooks(results); // Update book list
    } catch (error) {
      // Handle network errors by logging and showing filtered fallback data
      console.log("Error fetching from API, using filtered mock data fallback:", error);
      
      const lowerQuery = term.toLowerCase().trim();
      const isDefaultQuery = lowerQuery === 'trending bestsellers' || lowerQuery === '';
      let results;
      
      if (!isDefaultQuery) {
        results = INDIAN_FEATURED_BOOKS.filter(book => 
          book.title.toLowerCase().includes(lowerQuery) ||
          book.authors.some(author => author.toLowerCase().includes(lowerQuery)) ||
          book.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
        );
      } else {
        results = INDIAN_FEATURED_BOOKS;
      }
      setBooks(results);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Triggered whenever the search parameter in the URL or the language changes
  useEffect(() => {
    // Sync input field value when URL changes (e.g. navigation or clearing search)
    const urlQuery = searchParams.get('search') || '';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(urlQuery);
    
    // Get the current search term from the URL, or use a default one
    const searchTerm = urlQuery || 'trending bestsellers';
    fetchResults(searchTerm); // Start the API fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, lang]);

  // Function triggered when the user submits the search form
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (query.trim()) {
      // Update the URL with the new search term, which triggers the useEffect
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    } else {
      // If query is empty, navigate to /explore without search param (shows all/trending)
      navigate('/explore');
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
            className="form-input explore-search-input"
          />
          {/* Submit button with search icon */}
          <button type="submit" className="btn btn-primary">🔍 {t.explore}</button>
        </form>
      </div>

      {/* Conditional Rendering: Show loader or the grid of books */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* If books exist, map through them; otherwise show premium empty state */}
          {books.length > 0 ? (
            <div className="books-grid">
              {books.map(book => <BookCard key={book.id} book={book} />)}
            </div>
          ) : (
            <div className="no-results-container glass-card">
              <span className="no-results-icon">🔍</span>
              <h3 className="no-results-title">No Books Found</h3>
              <p className="no-results-text">
                We couldn't find any books matching "<strong>{searchParams.get('search') || query}</strong>".
              </p>
              <p className="no-results-hint">
                Try checking the spelling or searching for a different book title, author, or genre.
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
