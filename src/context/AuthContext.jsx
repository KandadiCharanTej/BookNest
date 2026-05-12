// AuthContext.jsx - Simple Global State for User and Profile
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('booknest_user');
    const token = localStorage.getItem('booknest_token');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Simple login - simulate token and store user
  const login = (email, password) => {
    // In a real app, this would be an API call
    const userData = {
      name: 'Charan Kumar', // Default for demo
      email: email,
      phone: '',
      address: {
        fullName: '',
        mobile: '',
        street: '',
        area: '',
        city: '',
        state: '',
        pincode: ''
      },
      avatar: null
    };

    // Check if user already has data in storage
    const existing = localStorage.getItem(`profile_${email}`);
    const finalUser = existing ? JSON.parse(existing) : userData;

    localStorage.setItem('booknest_token', 'fake-jwt-token');
    localStorage.setItem('booknest_user', JSON.stringify(finalUser));
    setUser(finalUser);
    setIsAuthenticated(true);
    return { success: true }; // Return object with success flag
  };

  // Simple signup - create user and store
  const signup = (name, email, password) => {
    const userData = {
      name: name,
      email: email,
      phone: '',
      address: {
        fullName: '',
        mobile: '',
        street: '',
        area: '',
        city: '',
        state: '',
        pincode: ''
      }
    };
    localStorage.setItem('booknest_token', 'fake-jwt-token');
    localStorage.setItem('booknest_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return { success: true }; // Return object with success flag
  };

  // Update profile data
  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('booknest_user', JSON.stringify(updatedUser));
    // Also save uniquely by email to persist across logouts
    localStorage.setItem(`profile_${user.email}`, JSON.stringify(updatedUser));
  };

  // Logout - clear storage
  const logout = () => {
    localStorage.removeItem('booknest_token');
    localStorage.removeItem('booknest_user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/'; // Force redirect to home on logout
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      signup, 
      logout, 
      updateProfile,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
