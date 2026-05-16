// Importing hooks from React
import { createContext, useContext, useState, useEffect } from 'react';

// Create a new context for the Wishlist (Saved Books)
const WishlistContext = createContext();

// Provider component to manage wishlist state globally
export function WishlistProvider({ children }) {
  // State to store the list of books in the wishlist
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // State for temporary feedback notifications
  const [toast, setToast] = useState(null);

  // useEffect runs on app startup to load saved wishlist from local storage
  useEffect(() => {
    const saved = localStorage.getItem('wishlist'); // Retrieve string from storage
    if (saved) setWishlistItems(JSON.parse(saved)); // Convert back to array if it exists
  }, []);

  // useEffect runs every time the wishlist changes to sync it back to local storage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems)); // Save array as string
  }, [wishlistItems]);

  // Helper function to show a message for 3 seconds
  const showToast = (msg) => {
    setToast(msg); // Set message text
    setTimeout(() => setToast(null), 3000); // Reset message after delay
  };

  // Function to add a book to the wishlist
  const addToWishlist = (book) => {
    // Check if the book is already in the list
    const exists = wishlistItems.find(item => item.id === book.id);
    
    if (!exists) {
      // If it doesn't exist, add it to the array
      setWishlistItems([...wishlistItems, book]);
      showToast('Added to wishlist ♥'); // Show success message
    } else {
      // If it exists, just show a reminder
      showToast('Already in wishlist');
    }
  };

  // Function to remove a book using its ID
  const removeFromWishlist = (id) => {
    // Filter out the book with the matching ID
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    showToast('Removed from wishlist'); // Show removal message
  };

  // Helper function to check if a specific book ID is in the wishlist
  const isInWishlist = (id) => wishlistItems.some(item => item.id === id);

  return (
    // Provide wishlist data and functions to the rest of the app
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toast }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use the Wishlist context easily
export const useWishlist = () => useContext(WishlistContext);
