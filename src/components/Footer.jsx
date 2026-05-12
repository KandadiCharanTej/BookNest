import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">📚 Book<span className="logo-accent">Nest</span> India</h3>
            <p className="footer-desc">
              India's premium digital bookstore. Discover Indian and international books — from mythology to startups.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/trending">Trending</Link>
            <Link to="/categories">Categories</Link>
          </div>
          <div className="footer-col">
            <h4>Genres</h4>
            <Link to="/categories">Fiction</Link>
            <Link to="/categories">Science</Link>
            <Link to="/categories">Biography</Link>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Smart BookNest India. Built with ❤️ and React.</p>
        </div>
      </div>
    </footer>
  );
}
