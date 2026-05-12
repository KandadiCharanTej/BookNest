import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" id="nav-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Smart <span className="logo-accent">BookNest</span></span>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch} id="nav-search-form">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            id="nav-search-input"
          />
        </form>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/explore" className="nav-link" onClick={() => setMenuOpen(false)}>Explore</NavLink>
          <NavLink to="/trending" className="nav-link" onClick={() => setMenuOpen(false)}>Trending</NavLink>
          
          <NavLink to="/cart" className="nav-link cart-link" id="nav-cart" onClick={() => setMenuOpen(false)}>
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>

          {isAuthenticated ? (
            <div className="nav-profile-container">
              <button 
                className="profile-trigger" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              >
                <div className="nav-avatar">{user?.name?.charAt(0)}</div>
                <span className="nav-user-name">Hi, {user?.name?.split(' ')[0]}</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {dropdownOpen && (
                <div className="profile-dropdown glass-card">
                  <Link to="/profile" className="dropdown-item">👤 My Profile</Link>
                  <Link to="/orders" className="dropdown-item">📦 My Orders</Link>
                  <Link to="/wishlist" className="dropdown-item">♥ Wishlist</Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-item" onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}
