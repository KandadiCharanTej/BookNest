import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  
  // State for form fields
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [addressData, setAddressData] = useState({
    fullName: user?.address?.fullName || '',
    mobile: user?.address?.mobile || '',
    street: user?.address?.street || '',
    area: user?.address?.area || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
  });

  const [message, setMessage] = useState('');

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      ...profileData,
      address: addressData
    });
    setIsEditing(false);
    setMessage('Profile updated successfully! ✅');
    setTimeout(() => setMessage(''), 3000);
  };

  // Check if address is complete
  const isAddressComplete = addressData.fullName && addressData.city && addressData.pincode;

  return (
    <main className="profile-page container" id="profile-page">
      <div className="profile-header">
        <h1 className="page-title">👤 My Profile</h1>
        <p className="page-subtitle">Manage your personal information and delivery addresses</p>
      </div>

      {message && <div className="toast-msg">{message}</div>}

      <div className="profile-layout">
        {/* Sidebar */}
        <aside className="profile-sidebar glass-card">
          <div className="profile-avatar-large">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <h2 className="profile-name-side">{user?.name}</h2>
          <p className="profile-email-side">{user?.email}</p>
          
          <div className="profile-nav-vertical">
            <button className="nav-btn active">Personal Info</button>
            <Link to="/orders" className="nav-btn">My Orders</Link>
            <button className="nav-btn" onClick={logout}>Logout</button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="profile-content">
          <form onSubmit={handleSave}>
            {/* Personal Details */}
            <div className="profile-section glass-card">
              <div className="section-header">
                <h3>Personal Information</h3>
                {!isEditing && (
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                )}
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={profileData.name} 
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={profileData.email} 
                    disabled={true} // Email usually fixed
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={profileData.phone} 
                    disabled={!isEditing}
                    placeholder="Enter phone number"
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="profile-section glass-card" id="address-section">
              <div className="section-header">
                <h3>Delivery Address</h3>
                {!isAddressComplete && !isEditing && (
                  <span className="warning-text">⚠️ Please add address for checkout</span>
                )}
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Recipient Name</label>
                  <input 
                    type="text" 
                    value={addressData.fullName} 
                    disabled={!isEditing}
                    placeholder="Full name of recipient"
                    onChange={(e) => setAddressData({...addressData, fullName: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    value={addressData.mobile} 
                    disabled={!isEditing}
                    placeholder="10-digit mobile number"
                    onChange={(e) => setAddressData({...addressData, mobile: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>House No. / Street</label>
                  <input 
                    type="text" 
                    value={addressData.street} 
                    disabled={!isEditing}
                    placeholder="Flat, House no., Building"
                    onChange={(e) => setAddressData({...addressData, street: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Area / Colony</label>
                  <input 
                    type="text" 
                    value={addressData.area} 
                    disabled={!isEditing}
                    placeholder="Area, Street, Sector, Village"
                    onChange={(e) => setAddressData({...addressData, area: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    value={addressData.city} 
                    disabled={!isEditing}
                    placeholder="Town/City"
                    onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input 
                    type="text" 
                    value={addressData.state} 
                    disabled={!isEditing}
                    placeholder="State"
                    onChange={(e) => setAddressData({...addressData, state: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input 
                    type="text" 
                    value={addressData.pincode} 
                    disabled={!isEditing}
                    placeholder="6 digits [0-9]"
                    onChange={(e) => setAddressData({...addressData, pincode: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
