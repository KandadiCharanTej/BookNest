import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: 'Home',
    explore: 'Explore',
    trending: 'Trending',
    categories: 'Categories',
    cart: 'Cart',
    login: 'Login',
    logout: 'Logout',
    profile: 'Profile',
    orders: 'Orders',
    wishlist: 'Wishlist',
    searchPlaceholder: 'Search for books, authors...',
    heroTitle: 'Your Smart Personal',
    heroAccent: 'Digital Library',
    heroSubtitle: 'Discover, collect, and read your favorite books with Smart BookNest. Your ultimate companion for a smarter reading experience.',
    exploreButton: 'Explore Books',
    featuredTitle: 'Featured Books',
    recommendedTitle: 'Recommended For You',
    viewAll: 'View All',
    addToCart: 'Add to Cart',
    inCart: 'In Cart',
    hi: 'Hi',
    noRatings: 'No Ratings',
  },
  hi: {
    home: 'होम',
    explore: 'खोजें',
    trending: 'ट्रेंडिंग',
    categories: 'श्रेणियाँ',
    cart: 'कार्ट',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    profile: 'प्रोफ़ाइल',
    orders: 'मेरे आदेश',
    wishlist: 'विशलिस्ट',
    searchPlaceholder: 'पुस्तकें, लेखक खोजें...',
    heroTitle: 'आपका स्मार्ट व्यक्तिगत',
    heroAccent: 'डिजिटल लाइब्रेरी',
    heroSubtitle: 'स्मार्ट बुकनेस्ट के साथ अपनी पसंदीदा पुस्तकें खोजें और पढ़ें। बेहतर पढ़ने के अनुभव के लिए आपका अंतिम साथी।',
    exploreButton: 'पुस्तकें खोजें',
    featuredTitle: 'विशेष पुस्तकें',
    recommendedTitle: 'आपके लिए अनुशंसित',
    viewAll: 'सभी देखें',
    addToCart: 'कार्ट में जोड़ें',
    inCart: 'कार्ट में है',
    hi: 'नमस्ते',
    noRatings: 'कोई रेटिंग नहीं',
  },
  te: {
    home: 'హోమ్',
    explore: 'అన్వేషించండి',
    trending: 'ట్రెండింగ్',
    categories: 'వర్గాలు',
    cart: 'కార్ట్',
    login: 'లాగిన్',
    logout: 'లాగ్అవుట్',
    profile: 'ప్రొఫైల్',
    orders: 'నా ఆర్డర్లు',
    wishlist: 'విష్‌లిస్ట్',
    searchPlaceholder: 'పుస్తకాలు, రచయితల కోసం వెతకండి...',
    heroTitle: 'మీ స్మార్ట్ వ్యక్తిగత',
    heroAccent: 'డిజిటల్ లైబ్రరీ',
    heroSubtitle: 'స్మార్ట్ బుక్‌నెస్ట్‌తో మీకు ఇష్టమైన పుస్తకాలను కనుగొనండి మరియు చదవండి. మెరుగైన పఠన అనుభవం కోసం మీ అంతిమ సహచరుడు.',
    exploreButton: 'పుస్తకాలను అన్వేషించండి',
    featuredTitle: 'ఫీచర్ చేసిన పుస్తకాలు',
    recommendedTitle: 'మీ కోసం సిఫార్సు చేయబడినవి',
    viewAll: 'అన్నీ చూడండి',
    addToCart: 'కార్ట్‌కు జోడించు',
    inCart: 'కార్ట్‌లో ఉంది',
    hi: 'నమస్కారం',
    noRatings: 'రేటింగ్‌లు లేవు',
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('booknest_lang') || 'en';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('booknest_lang', newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
