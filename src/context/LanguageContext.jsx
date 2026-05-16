// Importing React hooks and the translations data
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations'; // Object containing all text strings

// Create a context for Multi-Language support
const LanguageContext = createContext();

// Provider to manage language state
export function LanguageProvider({ children }) {
  // State to track current language code (e.g., 'en', 'hi', 'te')
  const [lang, setLang] = useState('en');

  // Check saved language on app start
  useEffect(() => {
    const saved = localStorage.getItem('lang'); // Get saved code
    if (saved) setLang(saved); // Update state if found
  }, []);

  // Function to switch language and save the choice
  const changeLanguage = (newLang) => {
    setLang(newLang); // Update state
    localStorage.setItem('lang', newLang); // Save to storage
  };

  // Select the correct set of words based on the current language
  const t = translations[lang];

  return (
    // Provide language code, change function, and current translation object
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
