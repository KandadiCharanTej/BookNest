// Importing essential React hooks
import { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the Shopping Cart
const CartContext = createContext();

// Provider component that manages the cart logic globally
export function CartProvider({ children }) {
  // State to store the list of books in the cart
  const [cart, setCart] = useState([]);
  
  // State for temporary popup notifications
  const [toast, setToast] = useState(null);

  // Load cart data from LocalStorage when the app first starts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save the cart to LocalStorage every time the 'cart' state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to show a brief notification message
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Function to add a book to the cart
  const addToCart = (book) => {
    // Check if this book is already in the cart
    const existingBook = cart.find(item => item.id === book.id);

    if (existingBook) {
      // If it exists, create a new array where its quantity is increased by 1
      const updatedCart = cart.map(item =>
        item.id === book.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      showToast('Quantity increased!');
    } else {
      // If it's a new book, add it to the cart array with quantity 1
      setCart([...cart, { ...book, quantity: 1 }]);
      showToast('Added to cart!');
    }
  };

  // Function to increase the quantity of a specific book in the cart
  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Function to decrease the quantity or remove if it hits zero
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0); // Only keep items with quantity > 0
    
    setCart(updatedCart);
  };

  // Function to remove an item entirely from the cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    showToast('Removed from cart');
  };

  // Function to empty the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total number of items using reduce()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price using reduce()
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    // Providing all cart data and functions to the app
    <CartContext.Provider value={{ 
      cartItems: cart, 
      addToCart, 
      increaseQuantity, 
      decreaseQuantity, 
      removeFromCart, 
      clearCart, 
      cartCount, 
      cartTotal, 
      toast 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
