// App.jsx - Main Application Component
// Uses React Router for navigation and Context API for state management

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { useCart } from './context/CartContext';
import { useWishlist } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Trending from './pages/Trending';
import Categories from './pages/Categories';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import OrderSuccess from './pages/OrderSuccess';
import { Login, Signup } from './pages/Auth';

import './styles/global.css';

// Toast notification component - shows cart/wishlist messages
function ToastManager() {
  const { toast: cartToast } = useCart();
  const { toast: wishToast } = useWishlist();
  const message = cartToast || wishToast;
  if (!message) return null;
  return <div className="toast">{message}</div>;
}

// App content with routes
function AppContent() {
  return (
    <>
      <Navbar />
      <ToastManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/book/:id" element={<BookDetails />} />
        
        {/* Protected Routes */}
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />
        <Route path="/order-success" element={
          <ProtectedRoute><OrderSuccess /></ProtectedRoute>
        } />
        
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

// Root component - wraps everything in providers
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ErrorBoundary>
              <AppContent />
            </ErrorBoundary>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
