// Importing React hooks and components
import { useState, useEffect } from 'react'; // Hooks for state and life-cycle
import { Link } from 'react-router-dom'; // Component for navigation
import './Orders.css'; // Importing styles for the orders page

// Premium placeholder for broken images
const PLACEHOLDER = 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=100&auto=format&fit=crop';

// Functional component to display the user's order history
export default function Orders() {
  // State to store the list of orders retrieved from local storage
  const [orders, setOrders] = useState([]);

  // useEffect runs once on page load to fetch saved orders
  useEffect(() => {
    // Get the orders string from browser storage
    const saved = localStorage.getItem('orders');
    
    // If orders exist, parse them into an array and reverse them (newest first)
    if (saved) {
      setOrders(JSON.parse(saved).reverse());
    }
  }, []);

  // Helper function to handle image errors
  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER;
    e.target.onerror = null;
  };

  // If the user hasn't placed any orders yet, show an empty state screen
  if (orders.length === 0) {
    return (
      <main className="orders-page container">
        {/* Page Title */}
        <h1 className="page-title">📦 My Orders</h1>
        
        {/* Centered empty state box with a button to start shopping */}
        <div className="empty-state glass-card">
          <p className="empty-state-icon">🛍️</p>
          <h3>No orders yet</h3>
          <p>Your order history will appear here once you make your first purchase.</p>
          <Link to="/explore" className="btn btn-primary">Start Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    // Main wrapper for the order history page
    <main className="orders-page container">
      {/* Page Heading and Subtitle */}
      <h1 className="page-title">📦 My Orders</h1>
      <p className="page-subtitle">Track and manage your past purchases</p>

      {/* List of order cards */}
      <div className="orders-list">
        {orders.map((order) => (
          /* Card for a single order */
          <div className="order-card glass-card" key={order.orderId}>
            
            {/* Header section of the card: Date and Order ID */}
            <div className="order-card-header">
              <div className="order-header-main">
                <span className="order-date">{order.date}</span>
                <span className="order-id">ID: {order.orderId}</span>
              </div>
              {/* Status badge - simulated as 'Processing' */}
              <div className="order-header-status">
                <span className="status-badge">Processing</span>
              </div>
            </div>

            {/* Main body of the order card */}
            <div className="order-card-body">
              
              {/* List of books included in this specific order */}
              <div className="order-books">
                {order.items.map((item) => (
                  <div key={item.id} className="order-book-item">
                    {/* Small thumbnail for the book with error handling */}
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="order-book-img" 
                      onError={handleImageError}
                    />
                    <div className="order-book-info">
                      {/* Book Title and Purchased Quantity */}
                      <p className="order-book-title">{item.title}</p>
                      <p className="order-book-qty">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Display total amount paid for this order */}
              <div className="order-total-info">
                <div className="total-row main-total">
                  <span>Total Paid:</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
