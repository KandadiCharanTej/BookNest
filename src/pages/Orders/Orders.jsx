// Orders Page - Displays user order history from LocalStorage
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load all orders from LocalStorage
    const storedOrders = JSON.parse(localStorage.getItem('booknest_orders') || '[]');
    // Sort by date (newest first)
    setOrders(storedOrders.reverse());
  }, []);

  if (orders.length === 0) {
    return (
      <main className="orders-page container">
        <h1 className="page-title">📦 My Orders</h1>
        <div className="empty-state glass-card">
          <p className="empty-state-icon">🛍️</p>
          <h3>No orders yet</h3>
          <p>Your order history will appear here once you make a purchase.</p>
          <Link to="/explore" className="btn btn-primary">Start Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page container" id="orders-page">
      <h1 className="page-title">📦 My Orders</h1>
      <p className="page-subtitle">Track and manage your past purchases</p>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card glass-card" key={order.orderId}>
            <div className="order-card-header">
              <div className="order-header-main">
                <span className="order-date">{order.date}</span>
                <span className="order-id">ID: {order.orderId}</span>
              </div>
              <div className="order-header-status">
                <span className="status-badge">Processing</span>
              </div>
            </div>

            <div className="order-card-body">
              <div className="order-books">
                {order.items.map((item) => (
                  <div key={item.id} className="order-book-item">
                    <img src={item.image} alt={item.title} className="order-book-img" />
                    <div className="order-book-info">
                      <p className="order-book-title">{item.title}</p>
                      <p className="order-book-qty">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-delivery">
                <h4>Deliver to:</h4>
                <p>{order.address?.fullName || 'N/A'}</p>
                <p>{order.address?.street}, {order.address?.city}</p>
                <p>{order.address?.state} - {order.address?.pincode}</p>
              </div>

              <div className="order-total-info">
                <div className="total-row">
                  <span>Payment:</span>
                  <span>{order.paymentMethod?.toUpperCase()}</span>
                </div>
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
