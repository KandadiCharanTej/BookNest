import { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem('booknest_wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('booknest_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addToWishlist = (book) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.id === book.id)) {
        showToast('Already in wishlist');
        return prev;
      }
      showToast('Added to wishlist ♥');
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== bookId));
    showToast('Removed from wishlist');
  };

  const isInWishlist = (bookId) => wishlistItems.some((item) => item.id === bookId);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toast }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
