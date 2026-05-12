// PaymentModal - Simulated payment flow for checkout
// Uses: useState, conditional rendering, setTimeout, LocalStorage

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './PaymentModal.css';

export default function PaymentModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Payment flow states
  const [step, setStep] = useState('select');   // 'select' | 'processing' | 'success'
  const [method, setMethod] = useState('');       // selected payment method
  const [orderId, setOrderId] = useState('');      // generated order ID

  // Payment method options
  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'debit', label: 'Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
    { id: 'credit', label: 'Credit Card', icon: '🏦', desc: 'All major cards accepted' },
    { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
  ];

  // Generate a random order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BN-${timestamp}-${random}`;
  };

  // Handle "Pay Now" button click
  const handlePayment = () => {
    if (!method) return;

    // Step 1: Show processing spinner
    setStep('processing');

    // Step 2: Simulate payment delay using setTimeout
    setTimeout(() => {
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);

      // Save order to LocalStorage with Delivery Info
      const order = {
        orderId: newOrderId,
        items: cartItems,
        total: cartTotal,
        paymentMethod: method,
        address: user.address, // Save current delivery address
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN'),
      };

      const orders = JSON.parse(localStorage.getItem('booknest_orders') || '[]');
      orders.push(order);
      localStorage.setItem('booknest_orders', JSON.stringify(orders));

      // Step 3: Show success screen
      setStep('success');
    }, 2000);
  };

  // Handle closing after success
  const handleDone = () => {
    clearCart();
    onClose();
    setStep('select');
    setMethod('');
    navigate('/order-success');
  };

  // Reset modal when closing without completing
  const handleClose = () => {
    if (step === 'processing') return; // Don't close during processing
    onClose();
    setStep('select');
    setMethod('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose} id="payment-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* ===== STEP 1: Select Payment Method ===== */}
        {step === 'select' && (
          <>
            <div className="modal-header">
              <h2 className="modal-title">💳 Checkout</h2>
              <button className="modal-close" onClick={handleClose}>✕</button>
            </div>

            {/* Delivery Address Preview */}
            <div className="modal-delivery-box">
              <div className="delivery-header">
                <h3>📍 Deliver To:</h3>
                <button className="btn-link" onClick={() => navigate('/profile')}>Change</button>
              </div>
              <div className="delivery-info">
                <p><strong>{user?.address?.fullName}</strong></p>
                <p>{user?.address?.street}, {user?.address?.area}</p>
                <p>{user?.address?.city}, {user?.address?.state} - {user?.address?.pincode}</p>
                <p>Phone: {user?.address?.mobile}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="modal-summary">
              <h3>Order Summary</h3>
              <div className="summary-total-row">
                <span>Paying Amount</span>
                <span className="summary-total-amount">₹{cartTotal}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="modal-methods">
              <h3>Select Payment Method</h3>
              <div className="method-list">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    className={`method-option ${method === pm.id ? 'active' : ''}`}
                    onClick={() => setMethod(pm.id)}
                  >
                    <span className="method-icon">{pm.icon}</span>
                    <div className="method-info">
                      <span className="method-label">{pm.label}</span>
                      <span className="method-desc">{pm.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fake UPI QR Code */}
            {method === 'upi' && (
              <div className="upi-qr-section">
                <p className="qr-label">Scan QR Code to Pay</p>
                <div className="qr-code-box">
                  <svg viewBox="0 0 100 100" className="qr-svg">
                    <rect width="100" height="100" fill="#fff"/>
                    <rect x="5" y="5" width="25" height="25" fill="#000"/>
                    <rect x="8" y="8" width="19" height="19" fill="#fff"/>
                    <rect x="11" y="11" width="13" height="13" fill="#000"/>
                    <rect x="70" y="5" width="25" height="25" fill="#000"/>
                    <rect x="73" y="8" width="19" height="19" fill="#fff"/>
                    <rect x="76" y="11" width="13" height="13" fill="#000"/>
                    <rect x="5" y="70" width="25" height="25" fill="#000"/>
                    <rect x="8" y="73" width="19" height="19" fill="#fff"/>
                    <rect x="11" y="76" width="13" height="13" fill="#000"/>
                    <rect x="35" y="5" width="5" height="5" fill="#000"/>
                    <rect x="45" y="5" width="5" height="5" fill="#000"/>
                    <rect x="55" y="5" width="5" height="5" fill="#000"/>
                    <rect x="35" y="15" width="5" height="5" fill="#000"/>
                    <rect x="50" y="15" width="5" height="5" fill="#000"/>
                    <rect x="35" y="35" width="5" height="5" fill="#000"/>
                    <rect x="5" y="35" width="5" height="5" fill="#000"/>
                    <rect x="5" y="45" width="5" height="5" fill="#000"/>
                    <rect x="35" y="85" width="5" height="5" fill="#000"/>
                    <rect x="70" y="70" width="25" height="25" fill="#000"/>
                    <rect x="73" y="73" width="19" height="19" fill="#fff"/>
                    <rect x="76" y="76" width="13" height="13" fill="#000"/>
                  </svg>
                </div>
                <p className="qr-upi-id">booknest@upi</p>
              </div>
            )}

            <button
              className={`btn btn-primary modal-pay-btn ${!method ? 'disabled' : ''}`}
              onClick={handlePayment}
              disabled={!method}
            >
              {method === 'cod' ? '✓ Place Order (COD)' : `💳 Pay ₹${cartTotal}`}
            </button>
          </>
        )}

        {/* ===== STEP 2: Processing ===== */}
        {step === 'processing' && (
          <div className="modal-processing">
            <div className="processing-spinner">
              <div className="spinner-ring"></div>
            </div>
            <h3>Processing Payment...</h3>
            <p>Please wait while we confirm your order</p>
          </div>
        )}

        {/* ===== STEP 3: Success ===== */}
        {step === 'success' && (
          <div className="modal-success">
            <div className="success-icon">✅</div>
            <h2>Payment Successful!</h2>
            <p className="success-subtitle">Order ID: {orderId}</p>
            <div className="success-details">
              <div className="success-row">
                <span>Status</span>
                <span className="success-value">Confirmed</span>
              </div>
              <div className="success-row">
                <span>Estimated Delivery</span>
                <span className="success-value">3-4 Business Days</span>
              </div>
            </div>
            <button className="btn btn-primary modal-pay-btn" onClick={handleDone}>
              🎉 View Order Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
