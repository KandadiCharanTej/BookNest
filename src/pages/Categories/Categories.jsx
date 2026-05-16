// Importing hooks and components
import { useState } from 'react'; // Hook for managing selected category
import CategoryBar from '../../components/CategoryBar'; // Sidebar/Bar for selecting genres
import BookCard from '../../components/BookCard'; // Component for book display
import Loader from '../../components/Loader'; // Spinner component
import { INDIAN_FEATURED_BOOKS } from '../../utils/mockData'; // Static local data for fallback
import './Categories.css'; // Specific styles for this page

// Functional component for the Categories page
export default function Categories() {
  // State to store which category is currently selected
  const [activeCategory, setActiveCategory] = useState('');
  
  // State to store the books found for the selected category
  const [books, setBooks] = useState([]);
  
  // State to track if data is currently being loaded
  const [loading, setLoading] = useState(false);

  // Function called when a user selects a new category from the CategoryBar
  const handleCategorySelect = async (cat) => {
    setActiveCategory(cat); // Update the active category state
    
    // If no category is selected, clear the books list
    if (!cat) {
      setBooks([]);
      return;
    }

    try {
      setLoading(true); // Show loading spinner
      
      // Fetch books from Google API based on the subject/genre selected
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(cat)}&maxResults=12`);
      const data = await res.json(); // Parse results
      
      // If we got items back from the API
      if (data.items) {
        // Format the API items into our clean book object format
        const formatted = data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ['Unknown Author'],
          price: 399, // Static price for display
          image: item.volumeInfo.imageLinks?.thumbnail || null,
          categories: item.volumeInfo.categories || [cat],
          rating: item.volumeInfo.averageRating || 4.1
        }));
        setBooks(formatted); // Update book list state
      } else {
        // Use static local data if no API results found
        setBooks(INDIAN_FEATURED_BOOKS.slice(0, 12));
      }
    } catch (err) {
      // Handle network errors by logging and using fallback data
      console.log(err);
      setBooks(INDIAN_FEATURED_BOOKS.slice(0, 12));
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    // Main container for the categories page
    <main className="categories-page container">
      {/* Header section */}
      <div className="categories-header">
        <h1 className="page-title">📂 Browse by Genre</h1>
      </div>

      {/* Component that displays the list of genres to choose from */}
      <CategoryBar active={activeCategory} onSelect={handleCategorySelect} />

      {/* Conditional Rendering: Show spinner if loading, otherwise show the books */}
      {loading ? (
        <Loader />
      ) : (
        <div className="books-grid">
          {/* Check if we have any books to show */}
          {books.length > 0 ? (
            /* Map through books and render a card for each */
            books.map(book => <BookCard key={book.id} book={book} />)
          ) : (
            /* Show an empty state message if no books are found or selected */
            <div className="empty-state">
              <p>{activeCategory ? 'No books found for this category.' : 'Please select a genre above to start browsing.'}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
