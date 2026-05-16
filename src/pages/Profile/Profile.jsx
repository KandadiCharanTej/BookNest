// Importing necessary hooks and components
import { useState } from 'react'; // Hook for managing form inputs and edit state
import { useAuth } from '../../context/AuthContext'; // Hook to access user data and update profile
import { Link } from 'react-router-dom'; // Component for navigation
import './Profile.css'; // Importing profile-specific styles

// Functional component for the User Profile page
export default function Profile() {
  // Destructuring values from the Authentication context
  const { user, updateProfile, logout } = useAuth();
  
  // State to track whether the form is in "Edit Mode"
  const [isEditing, setIsEditing] = useState(false);
  
  // State for showing a brief success message after saving
  const [message, setMessage] = useState('');

  // Local state for basic personal information
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  // Local state for address details, grouped as an object
  const [address, setAddress] = useState({
    fullName: user?.address?.fullName || '',
    mobile: user?.address?.mobile || '',
    street: user?.address?.street || '',
    area: user?.address?.area || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
  });

  // Function to handle saving the updated profile
  const handleSave = (e) => {
    e.preventDefault(); // Prevent standard form reload
    
    // Call the global update function with the new values
    updateProfile({ name, phone, address });
    
    // Exit edit mode and show success feedback
    setIsEditing(false);
    setMessage('Profile updated successfully! ✅');
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    // Main wrapper for the profile page
    <main className="profile-page container">
      
      {/* Header section with page title */}
      <div className="profile-header">
        <h1 className="page-title">👤 My Profile</h1>
        <p className="page-subtitle">Manage your personal details and delivery addresses</p>
      </div>

      {/* Success notification popup */}
      {message && <div className="toast-msg">{message}</div>}

      {/* Layout Grid: Sidebar on the left, Main form on the right */}
      <div className="profile-layout">
        
        {/* Sidebar section with avatar and navigation */}
        <aside className="profile-sidebar glass-card">
          <div className="profile-avatar-large">
            {/* Show first letter of user's name as an avatar */}
            {user?.name?.charAt(0) || 'U'}
          </div>
          <h2 className="profile-name-side">{user?.name}</h2>
          <p className="profile-email-side">{user?.email}</p>
          
          <div className="profile-nav-vertical">
            {/* Quick links to orders and logout */}
            <Link to="/orders" className="nav-btn">My Orders</Link>
            <button className="nav-btn logout-btn" onClick={logout}>Logout</button>
          </div>
        </aside>

        {/* Main Content Area: Profile Form */}
        <section className="profile-content">
          <form onSubmit={handleSave}>
            
            {/* Section 1: Personal Details */}
            <div className="profile-section glass-card">
              <div className="section-header">
                <h3>Personal Information</h3>
                {/* Toggle edit mode button */}
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
                    value={name} 
                    disabled={!isEditing} // Input disabled if not editing
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="text" 
                    value={user?.email} 
                    disabled={true} // Email is usually non-editable
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    disabled={!isEditing}
                    placeholder="Enter phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Address Details */}
            <div className="profile-section glass-card">
              <h3>Delivery Address</h3>
              <div className="form-grid">
                {/* Recipient Full Name */}
                <div className="form-group full-width">
                  <label>Recipient Full Name</label>
                  <input 
                    type="text" 
                    value={address.fullName} 
                    disabled={!isEditing}
                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="form-input"
                  />
                </div>
                {/* Street/House Info */}
                <div className="form-group">
                  <label>House/Street</label>
                  <input 
                    type="text" 
                    value={address.street} 
                    disabled={!isEditing}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    placeholder="Flat/House No"
                    className="form-input"
                  />
                </div>
                {/* City */}
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    value={address.city} 
                    disabled={!isEditing}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    placeholder="Town/City"
                    className="form-input"
                  />
                </div>
                {/* Pincode */}
                <div className="form-group">
                  <label>Pincode</label>
                  <input 
                    type="text" 
                    value={address.pincode} 
                    disabled={!isEditing}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    placeholder="6-digit code"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Save and Cancel buttons, only visible in Edit Mode */}
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
