// Importing React hooks
import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the Theme (Dark/Light mode)
const ThemeContext = createContext();

// Provider to manage the theme state across the app
export function ThemeProvider({ children }) {
  // State to track if dark mode is active (default is true)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Runs on mount to check user's saved preference
  useEffect(() => {
    const saved = localStorage.getItem('theme'); // Get theme string
    if (saved === 'light') setIsDarkMode(false); // Update state if 'light' was saved
  }, []);

  // Syncs the state with the HTML document body whenever it changes
  useEffect(() => {
    if (isDarkMode) {
      // Add CSS class to the body for dark mode styles
      document.body.className = 'dark-mode';
      localStorage.setItem('theme', 'dark'); // Save preference
    } else {
      // Remove classes for light mode (default)
      document.body.className = '';
      localStorage.setItem('theme', 'light'); // Save preference
    }
  }, [isDarkMode]);

  // Function to switch between dark and light modes
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // Provide the theme status and toggle function to components
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for theme access
export const useTheme = () => useContext(ThemeContext);
