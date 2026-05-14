import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useRef } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  const { isDarkMode, toggleTheme } = useTheme();
  const { lang, changeLanguage, t } = useLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <Link to="/" className="navbar-logo">
          Smart <span className="logo-accent">BookNest</span>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>{t.home}</NavLink>
          <NavLink to="/explore" className="nav-link" onClick={() => setMenuOpen(false)}>{t.explore}</NavLink>
          <NavLink to="/trending" className="nav-link" onClick={() => setMenuOpen(false)}>{t.trending}</NavLink>
          <NavLink to="/categories" className="nav-link" onClick={() => setMenuOpen(false)}>{t.categories}</NavLink>
          
          <div className="nav-controls">
            <button className="control-btn theme-toggle" onClick={toggleTheme} title="Toggle Theme">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <select 
              className="lang-select" 
              value={lang} 
              onChange={(e) => changeLanguage(e.target.value)}
              aria-label="Select Language"
            >
              <option value="en">EN</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>

          <NavLink to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
            {t.cart}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>

          {isAuthenticated ? (
            <div className="nav-profile-container" ref={dropdownRef}>
              <button 
                className="profile-trigger" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="nav-avatar">{user?.name?.charAt(0)}</div>
                <span className="nav-user-name">{t.hi}, {user?.name?.split(' ')[0]}</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {dropdownOpen && (
                <div className="profile-dropdown glass-card">
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>👤 {t.profile}</Link>
                  <Link to="/orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>📦 {t.orders}</Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={() => setDropdownOpen(false)}>♥ {t.wishlist}</Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-item" onClick={() => { logout(); setDropdownOpen(false); }}>{t.logout}</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary" onClick={() => setMenuOpen(false)}>
              {t.login}
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
