// AuthContext.jsx - Simple Global State for User and Profile
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('booknest_user');
      const token = localStorage.getItem('booknest_token');
      
      if (token && storedUser) {
        // Safe parsing to prevent app crash on corrupted data
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      // Clear corrupted data
      localStorage.removeItem('booknest_user');
      localStorage.removeItem('booknest_token');
    } finally {
      // Always set loading to false to avoid "hanging" app
      setLoading(false);
    }
  }, []);

  // Simple login - simulate token and store user
  const login = (email, password) => {
    const userData = {
      name: 'Charan Kumar',
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

    try {
      const existing = localStorage.getItem(`profile_${email}`);
      const finalUser = existing ? JSON.parse(existing) : userData;

      localStorage.setItem('booknest_token', 'fake-jwt-token');
      localStorage.setItem('booknest_user', JSON.stringify(finalUser));
      setUser(finalUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // Simple signup
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
    return { success: true };
  };

  // Update profile
  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('booknest_user', JSON.stringify(updatedUser));
    localStorage.setItem(`profile_${user.email}`, JSON.stringify(updatedUser));
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('booknest_token');
    localStorage.removeItem('booknest_user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/'; 
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
      {/* Important: Show children even if loading fails */}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
