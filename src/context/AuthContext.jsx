/* eslint-disable react-refresh/only-export-components */
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser)); // Convert string back to object
      setIsAuthenticated(true); // Set login status to true
    }
    
    // Finish the initial loading phase
    setLoading(false);
  }, []);

  // Function to handle login simulation with credential validation
  const login = (email, password) => {
    // Define pre-configured default credentials for the Viva demo
    const defaultCredentials = [
      { email: 'charan@booknest.com', password: 'charan123', name: 'Charan Tej' },
      { email: 'admin@booknest.com', password: 'admin123', name: 'Admin User' }
    ];

    // Find if the entered credentials match any default account
    const matchedUser = defaultCredentials.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      const userData = {
        name: matchedUser.name,
        email: matchedUser.email,
        address: {
          fullName: matchedUser.name,
          mobile: '9876543210',
          street: '123 Book St',
          area: 'Hitech City',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500081'
        }
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'loggedin');
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    
    // Also allow any custom email/password registered during signup
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const matchedRegistered = storedUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (matchedRegistered) {
      const userData = {
        name: matchedRegistered.name,
        email: matchedRegistered.email,
        address: {
          fullName: matchedRegistered.name,
          mobile: '9988776655',
          street: '456 Lane Rd',
          area: 'Madhapur',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500081'
        }
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'loggedin');
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }

    return false; // Authentication failed
  };

  // Function to handle signup simulation and persistence
  const signup = (name, email, password) => {
    const userData = { name, email, address: {} };
    
    // Register the user to the mock users list
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (!storedUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      storedUsers.push({ name, email, password });
      localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
    }
    
    // Save active user session
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'loggedin');
    
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
