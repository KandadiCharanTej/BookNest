// Importing React hooks and context
import { useState } from 'react'; // For local state (modal)
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import { useCart } from '../../context/CartContext'; // Access cart state and functions
import { useAuth } from '../../context/AuthContext'; // Access user address info
import { useLanguage } from '../../context/LanguageContext'; // Access translations
import PaymentModal from '../../components/PaymentModal'; // Checkout popup
import './Cart.css'; // Cart page styles

// Premium placeholder image for broken images
const PLACEHOLDER = 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=200&auto=format&fit=crop';

// Functional component for the Shopping Cart page
export default function Cart() {
  // Destructuring all needed cart data from our custom hook
  const { 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart, 
    cartTotal, 
    cartCount 
  } = useCart();
  
  // Accessing user data and language helpers
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Local state for modal visibility and error messages
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Function to handle image loading errors
  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER;
    e.target.onerror = null;
  };

  // Function to handle the checkout button click
  const handleProceed = () => {
    // If user hasn't added an address yet, redirect them to profile
    if (!user?.address?.fullName) {
      setError('Please add a delivery address in your profile first!');
      setTimeout(() => navigate('/profile'), 2000);
      return;
    }
    // Otherwise, open the payment popup
    setIsModalOpen(true);
  };

  // Show this view if the cart is empty
  if (cartItems.length === 0) {
    return (
      <main className="cart-page container">
        <div className="empty-state">
          <p className="empty-state-icon">🛒</p>
          <h3>{t.emptyCart}</h3>
          <p>Start browsing our collection to find your next favorite book!</p>
          <Link to="/explore" className="btn btn-primary">{t.exploreBtn}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page container">
      {/* Page Title */}
      <h1 className="page-title">{t.cartTitle}</h1>
      
      {/* Error message display if any */}
      {error && <div className="error-msg">{error}</div>}

      {/* Main layout split into Items List and Summary Sidebar */}
      <div className="cart-layout">
        
        {/* Section 1: Cart Items List */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item glass-card" key={item.id}>
              {/* Item Image with error handling */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="cart-item-img" 
                onError={handleImageError}
              />
              
              {/* Item Info (Title & Unit Price) */}
              <div className="cart-item-info">
                <Link to={`/book/${item.id}`} className="cart-item-title">{item.title}</Link>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              
              {/* Quantity Controls and Actions */}
              <div className="cart-item-controls">
                <div className="qty-controls">
                  {/* Decrease button: [-] */}
                  <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>−</button>
                  {/* Current quantity display */}
                  <span className="qty-value">{item.quantity}</span>
                  {/* Increase button: [+] */}
                  <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                
                {/* Total price for this specific item (Price * Quantity) */}
                <p className="cart-item-subtotal">₹{item.price * item.quantity}</p>
                
                {/* Remove item button */}
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                  {t.remove}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Order Summary Sidebar */}
        <div className="cart-summary glass-card">
          <h3 className="summary-title">{t.details}</h3>
          
          <div className="summary-row">
            <span>{t.items}</span>
            <span>{cartCount} items</span>
          </div>
          
          <div className="summary-row">
            <span>{t.subtotal}</span>
            <span>₹{cartTotal}</span>
          </div>
          
          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-shipping">FREE</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row summary-total">
            <span>{t.total}</span>
            <span>₹{cartTotal}</span>
          </div>
          
          {/* Action Buttons */}
          <button className="btn btn-primary checkout-btn" onClick={handleProceed}>
            {t.checkout}
          </button>
          
          <button className="btn btn-ghost clear-btn" onClick={clearCart}>
            Clear Entire Cart
          </button>
        </div>
      </div>

      {/* Checkout/Payment Popup */}
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
