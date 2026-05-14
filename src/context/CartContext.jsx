import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('booknest_cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('booknest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (book) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === book.id);
      if (exists) {
        showToast('Quantity increased!');
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast('Added to cart!');
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== bookId));
    showToast('Removed from cart');
  };

  const updateQuantity = (bookId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === bookId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, toast }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
