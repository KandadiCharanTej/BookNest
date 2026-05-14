// Cart Page - Shows items in cart with order summary
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import PaymentModal from '../../components/PaymentModal';
import './Cart.css';

const PLACEHOLDER = 'https://via.placeholder.com/80x120/1E293B/F97316?text=Book';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Handle Proceed to Checkout
  const handleProceed = () => {
    // Check if address is added in profile
    const hasAddress = user?.address?.fullName && user?.address?.pincode && user?.address?.city;
    
    if (!hasAddress) {
      setError('Please add a delivery address in your profile before checkout.');
      setTimeout(() => {
        navigate('/profile#address-section');
      }, 2000);
      return;
    }

    setIsModalOpen(true);
  };

  // Show empty state if cart is empty
  if (cartItems.length === 0) {
    return (
      <main className="cart-page container">
        <div className="empty-state">
          <p className="empty-state-icon">🛒</p>
          <h3>{t.emptyCart}</h3>
          <p>Discover amazing books and add them to your cart</p>
          <Link to="/explore" className="btn btn-primary">{t.exploreBtn}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page container" id="cart-page">
      <h1 className="page-title">{t.cartTitle}</h1>

      {error && <div className="error-msg" style={{ marginBottom: '20px' }}>{error}</div>}

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item glass-card" key={item.id} id={`cart-item-${item.id}`}>
              <img
                src={item.image || PLACEHOLDER}
                alt={item.title}
                className="cart-item-img"
                onError={(e) => { e.target.src = PLACEHOLDER; }}
              />
              <div className="cart-item-info">
                <Link to={`/book/${item.id}`} className="cart-item-title">{item.title}</Link>
                <p className="cart-item-author">{item.authors[0]}</p>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-controls">
                <p className="cart-item-subtotal">₹{item.price}</p>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>{t.remove}</button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Panel */}
        <div className="cart-summary glass-card" id="order-summary">
          <h3 className="summary-title">{t.details}</h3>
          <div className="summary-row">
            <span>{t.items}</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="summary-row">
            <span>{t.subtotal}</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="summary-row">
            <span>{t.delivery}</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row summary-total">
            <span>{t.total}</span>
            <span>₹{cartTotal}</span>
          </div>
          <button 
            className="btn btn-primary checkout-btn" 
            id="checkout-btn"
            onClick={handleProceed}
          >
            {t.checkout}
          </button>
          <button className="btn btn-ghost clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>

      {/* Payment Modal Popup */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
