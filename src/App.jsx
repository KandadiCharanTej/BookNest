// Importing essential React hooks and routing components
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Components for managing multi-page navigation

// Importing Global State Providers (Context API)
import { AuthProvider } from "./context/AuthContext"; // Wraps app to provide user login data
import { CartProvider } from "./context/CartContext"; // Wraps app to provide shopping cart data
import { WishlistProvider } from "./context/WishlistContext"; // Wraps app to provide saved books data
import { ThemeProvider } from "./context/ThemeContext"; // Wraps app to provide dark/light mode data
import { LanguageProvider } from "./context/LanguageContext"; // Wraps app to provide multi-language data

// Importing Page Components
import Home from "./pages/Home/Home"; // Main Landing page
import Explore from "./pages/Explore/Explore"; // Search/Browse page
import Trending from "./pages/Trending/Trending"; // Most popular books page
import Categories from "./pages/Categories/Categories"; // Browse by genre page
import BookDetails from "./pages/BookDetails/BookDetails"; // Specific book info page
import Cart from "./pages/Cart/Cart"; // Shopping cart page
import Wishlist from "./pages/Wishlist/Wishlist"; // Saved books page
import Profile from "./pages/Profile/Profile"; // User account management page
import Orders from "./pages/Orders/Orders"; // Order history page
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess"; // Payment confirmation page
import { Login, Signup } from "./pages/Auth"; // Login and Signup components

// Importing Layout Components (Header/Footer)
import Navbar from "./components/Navbar/Navbar"; // Top navigation bar
import Footer from "./components/Footer/Footer"; // Bottom footer
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Helper to lock pages for logged-in users only
import ScrollToTop from "./components/ScrollToTop"; // Helper to reset scroll position on page change

// Main Application Component
function App() {
  return (
    /* Global State Providers: Every component inside can access these values */
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ThemeProvider>
            <LanguageProvider>
              
              {/* BrowserRouter: Enables URL-based navigation */}
              <BrowserRouter>
                
                {/* ScrollToTop: Automatically scrolls to top when you change pages */}
                <ScrollToTop />
                
                {/* Navbar: Visible on all pages */}
                <Navbar />

                {/* Main Content Area: Changes based on the current URL path */}
                <div className="content-wrapper">
                  <Routes>
                    {/* Public Routes - Anyone can access */}
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes - Only logged-in users can access */}
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                  </Routes>
                </div>

                {/* Footer: Visible on all pages */}
                <Footer />

              </BrowserRouter>

            </LanguageProvider>
          </ThemeProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

// Export the App component to be used in main.jsx
export default App;
