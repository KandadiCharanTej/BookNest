// Importing React hooks and external dependencies
import { useState } from 'react'; // Hook to manage local state
import { Link, NavLink } from 'react-router-dom'; // Components for navigation without page refresh
import { useAuth } from '../../context/AuthContext'; // Custom hook to access authentication data
import { useCart } from '../../context/CartContext'; // Custom hook to access cart data
import { useTheme } from '../../context/ThemeContext'; // Custom hook to access theme (dark/light) data
import { useLanguage } from '../../context/LanguageContext'; // Custom hook to access language translations
import './Navbar.css'; // Importing CSS for styling the Navbar

// Functional component for the Navigation Bar
export default function Navbar() {
  // Destructuring values from our custom contexts
  const { isAuthenticated, user, logout } = useAuth(); // Auth status, user info, and logout function
  const { cartCount } = useCart(); // Total number of items in the cart
  const { isDarkMode, toggleTheme } = useTheme(); // Dark mode status and function to toggle it
  const { lang, changeLanguage, t } = useLanguage(); // Current language, change function, and translations object

  // Local state to manage mobile menu and profile dropdown visibility
  const [menuOpen, setMenuOpen] = useState(false); // Controls mobile side menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls user profile dropdown

  return (
    // Main navigation container
    <nav className="navbar">
      {/* Container to center and pad the content */}
      <div className="navbar-inner container">
        
        {/* Brand Logo - Links to Home page */}
        <Link to="/" className="navbar-logo" onClick={() => {setMenuOpen(false); setDropdownOpen(false);}}>
          Smart <span className="logo-accent">BookNest</span>
        </Link>

        {/* Navigation Links - Conditional class for mobile menu */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          
          {/* Main Navigation Links */}
          <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>{t.home}</NavLink>
          <NavLink to="/explore" className="nav-link" onClick={() => setMenuOpen(false)}>{t.explore}</NavLink>
          
          {/* Cart Link with a Badge showing item count */}
          <NavLink to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
            {t.cart} 
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>

          {/* Conditional Rendering: Show Profile if logged in, otherwise show Login button */}
          {isAuthenticated ? (
            <div className="nav-profile-container">
              
              {/* User Profile Trigger - Toggles the dropdown */}
              <button className="profile-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {/* Avatar with the first letter of the user's name */}
                <div className="nav-avatar">{user?.name?.charAt(0)}</div>
                {/* Personalized Greeting */}
                <span className="nav-user-name">Hi, {user?.name?.split(' ')[0]}</span>
                {/* Arrow icon */}
                <span className="dropdown-arrow">▼</span>
              </button>

              {/* Profile Dropdown - Only visible when dropdownOpen is true */}
              {dropdownOpen && (
                <div className="profile-dropdown glass-card">
                  {/* Dropdown Header with Name and Email */}
                  <div className="dropdown-header">
                    <span className="dropdown-user-name">{user?.name}</span>
                    <span className="dropdown-user-email">{user?.email}</span>
                  </div>
                  
                  {/* Links to Profile, Orders, and Wishlist */}
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>👤 {t.profile}</Link>
                  <Link to="/orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>📦 {t.orders}</Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={() => setDropdownOpen(false)}>♥ {t.wishlist}</Link>
                  
                  {/* Visual Divider */}
                  <div className="dropdown-divider"></div>
                  
                  {/* Settings Section: Theme and Language */}
                  <div className="dropdown-settings">
                    {/* Theme Toggle */}
                    <div className="setting-item">
                      <span>{isDarkMode ? '🌙' : '☀️'} Theme</span>
                      <button className="mini-toggle" onClick={toggleTheme}>
                        {/* Toggle track with active state */}
                        <div className={`toggle-track ${isDarkMode ? 'active' : ''}`}>
                          <div className="toggle-thumb"></div>
                        </div>
                      </button>
                    </div>

                    {/* Language Selection */}
                    <div className="setting-item">
                      <span>🌐 Lang</span>
                      <select 
                        className="lang-select-mini" 
                        value={lang} 
                        onChange={(e) => changeLanguage(e.target.value)}
                      >
                        <option value="en">EN</option>
                        <option value="hi">HI</option>
                        <option value="te">TE</option>
                      </select>
                    </div>
                  </div>

                  {/* Visual Divider */}
                  <div className="dropdown-divider"></div>
                  
                  {/* Logout Button */}
                  <button className="dropdown-item logout-item" onClick={() => { logout(); setDropdownOpen(false); }}>
                    🚪 {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Login Button - Shown if not authenticated */
            <Link to="/login" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
              {t.login}
            </Link>
          )}
        </div>

        {/* Hamburger Menu Icon - Visible only on mobile */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {/* Three bars for the menu icon, with 'open' class for animation */}
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}
