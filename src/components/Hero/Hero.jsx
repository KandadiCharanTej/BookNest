import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" id="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="hero-bg-glow hero-bg-glow-2"></div>
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-badge">✨ Your Digital Bookshelf</span>
          <h1 className="hero-title">
            {t.heroTitle} <br />
            <span className="hero-accent">{t.heroAccent}</span>
          </h1>
          <p className="hero-subtitle">
            {t.heroSubtitle}
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary btn-lg">
              📚 {t.exploreBtn}
            </Link>
            <Link to="/trending" className="btn btn-secondary btn-lg">
              🔥 {t.trendingBtn}
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">50K+</span>
              <span className="stat-label">Books</span>
            </div>
            <div className="stat">
              <span className="stat-num">100+</span>
              <span className="stat-label">Genres</span>
            </div>
            <div className="stat">
              <span className="stat-num">4.8</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-book hero-book-1">📕</div>
          <div className="hero-book hero-book-2">📗</div>
          <div className="hero-book hero-book-3">📘</div>
          <div className="hero-book hero-book-4">📙</div>
          <div className="hero-orbit"></div>
        </div>
      </div>
    </section>
  );
}
