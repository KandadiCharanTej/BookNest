// Importing React hooks and context
import { useState } from 'react'; // Hook for managing modal steps and selections
import { useNavigate } from 'react-router-dom'; // Hook for navigation after payment
import { useAuth } from '../../context/AuthContext'; // Access user info (like address)
import { useCart } from '../../context/CartContext'; // Access cart total and clear function
import { useLanguage } from '../../context/LanguageContext'; // Access translations
import './PaymentModal.css'; // Specific styling for the modal

// Functional component for the Checkout/Payment process
export default function PaymentModal({ isOpen, onClose }) {
  // Accessing values from our global state contexts
  const { user } = useAuth(); // User profile data
  const { cartItems, cartTotal, clearCart } = useCart(); // Cart data and clearing function
  const { t } = useLanguage(); // Translation set
  const navigate = useNavigate(); // Navigation function

  // Local state to manage the flow of the modal
  const [step, setStep] = useState('select'); // Current step: 'select', 'processing', or 'success'
  const [method, setMethod] = useState(''); // Stores the user's chosen payment method

  // Function to simulate the payment process
  const handlePayment = () => {
    if (!method) return; // Don't proceed if no method is chosen
    setStep('processing'); // Show the loading/processing screen

    // Simulate a 2-second delay for payment authorization
    setTimeout(() => {
      // Generate a fake random Order ID
      const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
      
      // Create a new order object to save
      const newOrder = {
        orderId,
        items: cartItems, // Books purchased
        total: cartTotal, // Final amount paid
        address: user.address, // Delivery location
        paymentMethod: method, // Payment type
        date: new Date().toLocaleDateString('en-IN') // Date of purchase
      };

      // Retrieve existing orders from storage, or start with empty list
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Save the new order along with existing ones
      localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
      
      // Move to the final success step
      setStep('success');
    }, 2000);
  };

  // Function called when the user clicks 'Finish'
  const handleDone = () => {
    clearCart(); // Remove all items from the cart
    onClose(); // Close the modal
    setStep('select'); // Reset step for next time
    // REDIRECT TO HOME INSTEAD OF ORDER-SUCCESS AS REQUESTED
    navigate('/'); 
  };

  // If the modal shouldn't be open, return nothing
  if (!isOpen) return null;

  return (
    // Backdrop overlay that closes the modal when clicked
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal box container - stops click propagation */}
      <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
        
        {/* STEP 1: Selection Phase */}
        {step === 'select' && (
          <>
            {/* Modal Top section */}
            <div className="modal-header">
              <h2 className="modal-title">💳 {t.paymentTitle}</h2>
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>

            {/* Delivery Location Preview */}
            <div className="modal-delivery-box">
              <div className="delivery-header">
                <h3>📍 {t.deliverTo}:</h3>
                <button className="btn-link" onClick={() => navigate('/profile')}>{t.change}</button>
              </div>
              <div className="delivery-info">
                <p><strong>{user?.address?.fullName}</strong></p>
                <p>{user?.address?.city}, {user?.address?.pincode}</p>
              </div>
            </div>

            {/* Order Total Preview */}
            <div className="modal-summary">
              <h3>{t.details}</h3>
              <div className="summary-total-row">
                <span>{t.payAmount || 'Amount to Pay'}</span>
                <span className="summary-total-amount">₹{cartTotal}</span>
              </div>
            </div>

            {/* Payment Method Options */}
            <div className="modal-methods">
              <h3>{t.selectMethod}</h3>
              <div className="method-list">
                {/* UPI Option */}
                <button className={`method-option ${method === 'upi' ? 'active' : ''}`} onClick={() => setMethod('upi')}>
                  <span className="method-icon">📱</span>
                  <div className="method-info">
                    <span className="method-label">UPI</span>
                    <span className="method-desc">GPay, PhonePe, Paytm</span>
                  </div>
                </button>
                
                {/* Card Option */}
                <button className={`method-option ${method === 'card' ? 'active' : ''}`} onClick={() => setMethod('card')}>
                  <span className="method-icon">💳</span>
                  <div className="method-info">
                    <span className="method-label">Debit/Credit Card</span>
                    <span className="method-desc">Visa, Mastercard, RuPay</span>
                  </div>
                </button>
                
                {/* Cash on Delivery Option */}
                <button className={`method-option ${method === 'cod' ? 'active' : ''}`} onClick={() => setMethod('cod')}>
                  <span className="method-icon">💵</span>
                  <div className="method-info">
                    <span className="method-label">Cash on Delivery</span>
                    <span className="method-desc">Pay when you receive</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Final Payment Button */}
            <button className={`btn btn-primary modal-pay-btn ${!method ? 'disabled' : ''}`} onClick={handlePayment} disabled={!method}>
              {method === 'cod' ? '✓ Place Order' : `💳 Pay ₹${cartTotal}`}
            </button>
          </>
        )}

        {/* STEP 2: Processing Spinner */}
        {step === 'processing' && (
          <div className="modal-processing">
            <div className="processing-spinner">
              <div className="spinner-ring"></div>
            </div>
            <h3>{t.processing || 'Processing Payment...'}</h3>
            <p>{t.waitMsg || 'Please wait while we confirm your order'}</p>
          </div>
        )}

        {/* STEP 3: Success Screen */}
        {step === 'success' && (
          <div className="modal-success">
            <div className="success-icon">✅</div>
            <h2>{t.paySuccess || 'Payment Successful!'}</h2>
            <div className="success-details">
              <div className="success-row">
                <span>Status</span>
                <span className="success-value">Confirmed</span>
              </div>
            </div>
            {/* FINISH BUTTON GOES STRAIGHT TO HOME NOW */}
            <button className="btn btn-primary modal-pay-btn" onClick={handleDone}>
              🎉 {t.finish || 'Finish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
