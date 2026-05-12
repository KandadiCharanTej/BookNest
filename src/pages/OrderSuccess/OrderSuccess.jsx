// Order Success Page - Shows after successful simulated payment
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const [latestOrder, setLatestOrder] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    // Get the most recent order from LocalStorage
    const orders = JSON.parse(localStorage.getItem('booknest_orders') || '[]');
    if (orders.length > 0) {
      const order = orders[orders.length - 1];
      setLatestOrder(order);

      // Generate a fake delivery date (3-5 days from now)
      const date = new Date();
      date.setDate(date.getDate() + 3 + Math.floor(Math.random() * 3));
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      setDeliveryDate(date.toLocaleDateString('en-IN', options));
    }
  }, []);

  if (!latestOrder) {
    return (
      <main className="order-success-page container">
        <div className="empty-state">
          <h3>No recent orders found</h3>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="order-success-page container" id="order-success-page">
      <div className="success-card glass-card">
        <div className="success-header">
          <div className="success-check-anim">
            <span className="check-icon">✓</span>
          </div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-msg">Thank you for shopping with Smart BookNest.</p>
        </div>

        <div className="success-grid">
          {/* Order Info */}
          <div className="order-info-box">
            <div className="info-row">
              <span className="info-label">Order ID:</span>
              <span className="info-value highlighted">{latestOrder.orderId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Payment Method:</span>
              <span className="info-value">{latestOrder.paymentMethod?.toUpperCase()}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Total Amount:</span>
              <span className="info-value amount">₹{latestOrder.total}</span>
            </div>
            <div className="delivery-status-box">
              <span className="delivery-label">Expected Delivery:</span>
              <span className="delivery-value">{deliveryDate}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="delivery-address-box">
            <h3>🚚 Delivering To:</h3>
            <p><strong>{latestOrder.address?.fullName}</strong></p>
            <p>{latestOrder.address?.street}, {latestOrder.address?.area}</p>
            <p>{latestOrder.address?.city}, {latestOrder.address?.state}</p>
            <p>Pincode: {latestOrder.address?.pincode}</p>
            <p>Phone: {latestOrder.address?.mobile}</p>
          </div>
        </div>

        <div className="order-items-preview">
          <h3>Ordered Books ({latestOrder.items.length})</h3>
          <div className="preview-list">
            {latestOrder.items.map((item) => (
              <div key={item.id} className="preview-item">
                <span className="item-name">{item.title}</span>
                <span className="item-qty">Qty: {item.quantity}</span>
                <span className="item-price">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="success-actions">
          <Link to="/orders" className="btn btn-primary">Track My Order</Link>
          <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
}
