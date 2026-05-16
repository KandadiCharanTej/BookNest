// Importing necessary tools from React and contexts
import { useState, useEffect } from 'react'; // Hooks for state and life-cycle
import { Link } from 'react-router-dom'; // Component for navigation
import { useLanguage } from '../../context/LanguageContext'; // Hook for translation support
import './OrderSuccess.css'; // Importing specific styles for the success page

// Functional component for the Order Success/Confirmation page
export default function OrderSuccess() {
  // Destructuring translation object
  const { t } = useLanguage();
  
  // Local state to store the details of the order that was just placed
  const [latestOrder, setLatestOrder] = useState(null);

  // Runs on page load to find the most recent order from local storage
  useEffect(() => {
    // Get all orders from storage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // If orders exist, pick the last one (most recently added)
    if (orders.length > 0) {
      setLatestOrder(orders[orders.length - 1]);
    }
  }, []);

  // If for some reason no order is found, show a simple fallback message
  if (!latestOrder) {
    return (
      <main className="order-success-page container">
        <div className="empty-state">
          <h3>No order found</h3>
          <Link to="/" className="btn btn-primary">Go back Home</Link>
        </div>
      </main>
    );
  }

  return (
    // Main wrapper for the order success page
    <main className="order-success-page container">
      
      {/* Visual card to display confirmation details */}
      <div className="success-card glass-card">
        
        {/* Top section: Confirmation Icon and Message */}
        <div className="success-header">
          {/* Animated checkmark icon container */}
          <div className="success-check-anim">
            <span className="check-icon">✓</span>
          </div>
          {/* Main heading translated from context */}
          <h1 className="success-title">{t.orderSuccess}</h1>
          <p className="success-msg">{t.thankYou}</p>
        </div>

        {/* Middle section: Split layout for order and delivery info */}
        <div className="success-grid">
          
          {/* Box 1: Core Order Information */}
          <div className="order-info-box">
            <div className="info-row">
              <span className="info-label">Order ID:</span>
              {/* Highlighted Order ID number */}
              <span className="info-value highlighted">{latestOrder.orderId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Amount Paid:</span>
              {/* Final price amount */}
              <span className="info-value amount">₹{latestOrder.total}</span>
            </div>
          </div>

          {/* Box 2: Delivery Address Summary */}
          <div className="delivery-address-box">
            <h3>🚚 Deliver to:</h3>
            <p><strong>{latestOrder.address?.fullName}</strong></p>
            <p>{latestOrder.address?.street}</p>
            <p>{latestOrder.address?.city}, {latestOrder.address?.pincode}</p>
          </div>
        </div>

        {/* Action Buttons: Navigate back to home or view history */}
        <div className="success-actions">
          <Link to="/orders" className="btn btn-primary">Track your Order</Link>
          <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
}
