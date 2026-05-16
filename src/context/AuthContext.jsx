// Importing hooks for context, state, and life-cycle management
import { createContext, useContext, useState, useEffect } from 'react';

// Create a new Context for Authentication
const AuthContext = createContext();

// Provider component that wraps the app and provides auth data
export function AuthProvider({ children }) {
  // State to store the logged-in user object
  const [user, setUser] = useState(null);
  
  // State to track if the user is currently logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State to track if we are still checking the login status from storage
  const [loading, setLoading] = useState(true);

  // Runs once when the app starts
  useEffect(() => {
    // Try to get user data from browser's local storage
    const storedUser = localStorage.getItem('user');
    
    // If a user was found in storage, log them back in automatically
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convert string back to object
      setIsAuthenticated(true); // Set login status to true
    }
    
    // Finish the initial loading phase
    setLoading(false);
  }, []);

  // Function to handle login simulation
  const login = (email, password) => {
    // Create a fake user object for demonstration
    const userData = {
      name: 'Charan Kumar',
      email: email,
      address: {
        fullName: 'Charan Kumar',
        mobile: '9876543210',
        street: '123 Book St',
        area: 'Hitech City',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500081'
      }
    };
    
    // Save user data to local storage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'loggedin'); // Save a fake session token
    
    // Update local React state
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Function to handle signup simulation
  const signup = (name, email) => {
    // Create new user data based on signup inputs
    const userData = { name, email, address: {} };
    
    // Save to storage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'loggedin');
    
    // Update state
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Function to log the user out
  const logout = () => {
    // Clear all auth-related data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Reset local state
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirect to home page
    window.location.href = '/';
  };

  // Function to update the user's profile info (like name or address)
  const updateProfile = (newData) => {
    // Merge new data with the existing user object
    const updated = { ...user, ...newData };
    
    // Update state and storage
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  return (
    // Provide the auth data and functions to all child components
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to easily use the Auth context in any component
export const useAuth = () => useContext(AuthContext);
