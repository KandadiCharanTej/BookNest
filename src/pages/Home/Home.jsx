// Importing necessary React hooks and components
import { useState, useEffect } from 'react'; // Hooks for state and side effects
import { Link } from 'react-router-dom'; // Component for navigation
import Hero from '../../components/Hero'; // Hero section component
import BookCard from '../../components/BookCard'; // Individual book card component
import Loader from '../../components/Loader'; // Loading spinner component
import { useLanguage } from '../../context/LanguageContext'; // Hook for language translations
import { INDIAN_FEATURED_BOOKS, CATEGORIES } from '../../utils/mockData'; // Static data
import './Home.css'; // Importing specific styles for the Home page

// Functional component for the Home page
export default function Home() {
  // Destructuring language values
  const { t, lang } = useLanguage(); 
  
  // State to store recommended books from the API
  const [recommended, setRecommended] = useState([]); 
  
  // State to manage the loading status
  const [loading, setLoading] = useState(false);

  // useEffect runs when the component mounts or when the language changes
  useEffect(() => {
    fetchBooks(); // Trigger the API call
  }, [lang]);

  // Function to fetch books from Google Books API
  const fetchBooks = async () => {
    try {
      setLoading(true); // Show loader
      
      // Fetch books related to 'best selling books' using the current language
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=best+selling+books&maxResults=10&langRestrict=${lang}`);
      const data = await response.json(); // Parse response as JSON
      
      // If books are found in the API response
      if (data.items) {
        // Map the API data into our local book format
        const formatted = data.items.map(item => {
          // CRITICAL: Force HTTPS for all book images to prevent "Mixed Content" errors
          const rawImage = item.volumeInfo.imageLinks?.thumbnail || null;
          const secureImage = rawImage ? rawImage.replace('http://', 'https://') : null;

          return {
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown Author'],
            price: 299, // Set a default price
            image: secureImage,
            categories: item.volumeInfo.categories || ['General'],
            rating: item.volumeInfo.averageRating || 4.2
          };
        });
        setRecommended(formatted); // Update state with new books
      } else {
        // If no items found, use static fallback data
        setRecommended(INDIAN_FEATURED_BOOKS.slice(0, 10));
      }
    } catch (error) {
      // Log error and use static fallback data on failure
      console.log("Error fetching books:", error);
      setRecommended(INDIAN_FEATURED_BOOKS.slice(0, 10));
    } finally {
      setLoading(false); // Hide loader after API call finishes
    }
  };

  return (
    // Main home page wrapper
    <main className="home-page">
      {/* Visual Hero Banner Section */}
      <Hero />
      
      {/* Main content container for grid and sections */}
      <div className="container">
        
        {/* Section 1: Browse by Categories */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">📂 Explore Categories</h2>
            <Link to="/categories" className="view-all-link">{t.viewAll} →</Link>
          </div>
          <div className="home-categories-grid">
            {CATEGORIES.slice(0, 6).map((cat, index) => (
              <Link to={`/categories`} key={cat} className="home-cat-card glass-card">
                <span className="cat-icon">{['📜', '🧪', '💼', '🚀', '🧠', '🎭'][index % 6]}</span>
                <span className="cat-name">{cat}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Featured Indian Books */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">✨ {t.featuredTitle}</h2>
            <Link to="/explore" className="view-all-link">{t.viewAll} →</Link>
          </div>
          <div className="books-grid">
            {INDIAN_FEATURED_BOOKS.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Section 3: Recommended Books */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">⭐ {t.recommendedTitle}</h2>
          </div>
          
          {loading ? (
            <Loader />
          ) : (
            <div className="books-grid">
              {recommended.length > 0 ? (
                recommended.map(book => <BookCard key={book.id} book={book} />)
              ) : (
                <p>Unable to load books right now.</p>
              )}
            </div>
          )}
        </section>

        {/* Premium Banner: Call to Action */}
        <section className="promo-banner glass-card">
          <div className="promo-content">
            <h2>Join our 50,000+ Readers</h2>
            <p>Get personalized recommendations and exclusive deals delivered to your inbox.</p>
            <Link to="/signup" className="btn btn-primary">{t.createAccount || 'Join Now'}</Link>
          </div>
          <div className="promo-image">📚</div>
        </section>

      </div>
    </main>
  );
}
