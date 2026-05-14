import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navbar & Common
    home: 'Home',
    explore: 'Explore',
    trending: 'Trending',
    trendingSubtitle: 'Discover what everyone is reading right now',
    categories: 'Categories',
    cart: 'Cart',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    profile: 'Profile',
    orders: 'Orders',
    wishlist: 'Wishlist',
    searchPlaceholder: 'Search books...',
    hi: 'Hi',
    back: 'Back',
    save: 'Save Changes',
    loading: 'Loading...',
    retry: 'Retry',
    
    // Hero
    heroTitle: 'Your Smart Personal',
    heroAccent: 'Digital Library',
    heroSubtitle: 'Discover, collect, and read your favorite books with Smart BookNest. Your ultimate companion for a smarter reading experience.',
    exploreBtn: 'Explore Books',
    trendingBtn: 'Trending Now',
    
    // Home
    featuredTitle: 'Featured Books',
    recommendedTitle: 'Recommended For You',
    viewAll: 'View All',
    
    // Book Details & Cards
    addToCart: 'Add to Cart',
    inCart: 'In Cart',
    buyNow: 'Buy Now',
    description: 'Description',
    details: 'Details',
    pages: 'Pages',
    publisher: 'Publisher',
    published: 'Published',
    noRatings: 'No Ratings',
    relatedBooks: 'Related Books',
    
    // Cart & Checkout
    cartTitle: 'Shopping Cart',
    emptyCart: 'Your cart is empty',
    subtotal: 'Subtotal',
    delivery: 'Delivery',
    total: 'Total',
    checkout: 'Proceed to Checkout',
    remove: 'Remove',
    
    // Payment Modal
    paymentTitle: 'Checkout',
    deliverTo: 'Deliver To',
    change: 'Change',
    payAmount: 'Paying Amount',
    selectMethod: 'Select Payment Method',
    payNow: 'Pay Now',
    placeOrder: 'Place Order',
    processing: 'Processing Payment...',
    waitMsg: 'Please wait while we confirm your order',
    paySuccess: 'Payment Successful!',
    orderId: 'Order ID',
    estDelivery: 'Estimated Delivery',
    viewSummary: 'View Order Summary',
    
    // Auth Pages
    welcomeBack: 'Welcome Back!',
    loginSubtitle: 'Login to access your personalized library',
    noAccount: "Don't have an account?",
    createAccount: 'Create an Account',
    signupSubtitle: 'Join Smart BookNest and start your reading journey',
    alreadyAccount: 'Already have an account?',
    fullName: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    
    // Orders & Success
    orderSuccess: 'Order Placed Successfully!',
    thankYou: 'Thank you for shopping with Smart BookNest.',
    trackOrder: 'Track My Order',
    contShopping: 'Continue Shopping',
    noOrders: 'No recent orders found',
    expectedDelivery: 'Expected Delivery',
    orderedBooks: 'Ordered Books',
  },
  hi: {
    // Navbar & Common
    home: 'होम',
    explore: 'खोजें',
    trending: 'ट्रेंडिंग',
    trendingSubtitle: 'अभी क्या पढ़ा जा रहा है उसे खोजें',
    categories: 'श्रेणियाँ',
    cart: 'कार्ट',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    profile: 'प्रोफ़ाइल',
    orders: 'आदेश',
    wishlist: 'विशलिस्ट',
    searchPlaceholder: 'पुस्तकें खोजें...',
    hi: 'नमस्ते',
    back: 'पीछे',
    save: 'बदलाव सहेजें',
    loading: 'लोड हो रहा है...',
    retry: 'पुनः प्रयास करें',

    // Hero
    heroTitle: 'आपका स्मार्ट व्यक्तिगत',
    heroAccent: 'डिजिटल लाइब्रेरी',
    heroSubtitle: 'स्मार्ट बुकनेस्ट के साथ अपनी पसंदीदा पुस्तकें खोजें और पढ़ें। बेहतर पढ़ने के अनुभव के लिए आपका अंतिम साथी।',
    exploreBtn: 'पुस्तकें खोजें',
    trendingBtn: 'अभी ट्रेंडिंग',

    // Home
    featuredTitle: 'विशेष पुस्तकें',
    recommendedTitle: 'आपके लिए अनुशंसित',
    viewAll: 'सभी देखें',

    // Book Details & Cards
    addToCart: 'कार्ट में जोड़ें',
    inCart: 'कार्ट में है',
    buyNow: 'अभी खरीदें',
    description: 'विवरण',
    details: 'विवरण',
    pages: 'पृष्ठ',
    publisher: 'प्रकाशक',
    published: 'प्रकाशित',
    noRatings: 'कोई रेटिंग नहीं',
    relatedBooks: 'संबंधित पुस्तकें',

    // Cart & Checkout
    cartTitle: 'शॉपिंग कार्ट',
    emptyCart: 'आपकी कार्ट खाली है',
    subtotal: 'उप-योग',
    delivery: 'डिलिवरी',
    total: 'कुल',
    checkout: 'चेकआउट के लिए आगे बढ़ें',
    remove: 'हटाएं',

    // Payment Modal
    paymentTitle: 'चेकआउट',
    deliverTo: 'यहां पहुंचाएं',
    change: 'बदलें',
    payAmount: 'भुगतान राशि',
    selectMethod: 'भुगतान विधि चुनें',
    payNow: 'अभी भुगतान करें',
    placeOrder: 'ऑर्डर दें',
    processing: 'भुगतान संसाधित हो रहा है...',
    waitMsg: 'कृपया प्रतीक्षा करें जब हम आपके ऑर्डर की पुष्टि करते हैं',
    paySuccess: 'भुगतान सफल!',
    orderId: 'ऑर्डर आईडी',
    estDelivery: 'अनुमानित डिलीवरी',
    viewSummary: 'ऑर्डर सारांश देखें',

    // Auth Pages
    welcomeBack: 'वापसी पर स्वागत है!',
    loginSubtitle: 'अपनी व्यक्तिगत लाइब्रेरी तक पहुंचने के लिए लॉगिन करें',
    noAccount: 'खाता नहीं है?',
    createAccount: 'खाता बनाएं',
    signupSubtitle: 'स्मार्ट बुकनेस्ट से जुड़ें और अपनी पढ़ने की यात्रा शुरू करें',
    alreadyAccount: 'पहले से ही खाता है?',
    fullName: 'पूरा नाम',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',

    // Orders & Success
    orderSuccess: 'ऑर्डर सफलतापूर्वक दिया गया!',
    thankYou: 'स्मार्ट बुकनेस्ट के साथ खरीदारी के लिए धन्यवाद।',
    trackOrder: 'मेरे ऑर्डर को ट्रैक करें',
    contShopping: 'खरीदारी जारी रखें',
    noOrders: 'कोई हालिया ऑर्डर नहीं मिला',
    expectedDelivery: 'अपेक्षित डिलीवरी',
    orderedBooks: 'ऑर्डर की गई पुस्तकें',
  },
  te: {
    // Navbar & Common
    home: 'హోమ్',
    explore: 'అన్వేషించండి',
    trending: 'ట్రెండింగ్',
    trendingSubtitle: 'ప్రస్తుతం అందరూ చదువుతున్న వాటిని కనుగొనండి',
    categories: 'వర్గాలు',
    cart: 'కార్ట్',
    login: 'లాగిన్',
    signup: 'సైన్ అప్',
    logout: 'లాగ్అవుట్',
    profile: 'ప్రొఫైల్',
    orders: 'ఆర్డర్లు',
    wishlist: 'విష్‌లిస్ట్',
    searchPlaceholder: 'పుస్తకాల కోసం వెతకండి...',
    hi: 'నమస్కారం',
    back: 'వెనుకకు',
    save: 'మార్పులను సేవ్ చేయండి',
    loading: 'లోడ్ అవుతోంది...',
    retry: 'మళ్ళీ ప్రయత్నించండి',

    // Hero
    heroTitle: 'మీ స్మార్ట్ వ్యక్తిగత',
    heroAccent: 'డిజిటల్ లైబ్రరీ',
    heroSubtitle: 'స్మార్ట్ బుక్‌నెస్ట్‌తో మీకు ఇష్టమైన పుస్తకాలను కనుగొనండి మరియు చదవండి. మెరుగైన పఠన అనుభవం కోసం మీ అంతిమ సహచరుడు.',
    exploreBtn: 'పుస్తకాలను అన్వేషించండి',
    trendingBtn: 'ప్రస్తుతం ట్రెండింగ్',

    // Home
    featuredTitle: 'ఫీచర్ చేసిన పుస్తకాలు',
    recommendedTitle: 'మీ కోసం సిఫార్సు చేయబడినవి',
    viewAll: 'అన్నీ చూడండి',

    // Book Details & Cards
    addToCart: 'కార్ట్‌కు జోడించు',
    inCart: 'కార్ట్‌లో ఉంది',
    buyNow: 'ఇప్పుడే కొనండి',
    description: 'వివరణ',
    details: 'వివరాలు',
    pages: 'పేజీలు',
    publisher: 'ప్రచురణకర్త',
    published: 'ప్రచురించబడింది',
    noRatings: 'రేటింగ్‌లు లేవు',
    relatedBooks: 'సంబంధిత పుస్తకాలు',

    // Cart & Checkout
    cartTitle: 'షాపింగ్ కార్ట్',
    emptyCart: 'మీ కార్ట్ ఖాళీగా ఉంది',
    subtotal: 'మొత్తం',
    delivery: 'డెలివరీ',
    total: 'మొత్తం ధర',
    checkout: 'చెక్అవుట్‌కు వెళ్లండి',
    remove: 'తొలగించు',

    // Payment Modal
    paymentTitle: 'చెక్అవుట్',
    deliverTo: 'ఇక్కడ డెలివరీ చేయండి',
    change: 'మార్చండి',
    payAmount: 'చెల్లించే మొత్తం',
    selectMethod: 'చెల్లింపు పద్ధతిని ఎంచుకోండి',
    payNow: 'ఇప్పుడే చెల్లించండి',
    placeOrder: 'ఆర్డర్ చేయండి',
    processing: 'చెల్లింపు జరుగుతోంది...',
    waitMsg: 'మేము మీ ఆర్డర్‌ని ధృవీకరించే వరకు దయచేసి వేచి ఉండండి',
    paySuccess: 'చెల్లింపు విజయవంతమైంది!',
    orderId: 'ఆర్డర్ ఐడి',
    estDelivery: 'అంచనా వేసిన డెలివరీ',
    viewSummary: 'ఆర్డర్ సారాంశాన్ని చూడండి',

    // Auth Pages
    welcomeBack: 'తిరిగి స్వాగతం!',
    loginSubtitle: 'మీ వ్యక్తిగతీకరించిన లైబ్రరీని యాక్సెస్ చేయడానికి లాగిన్ చేయండి',
    noAccount: 'ఖాతా లేదా?',
    createAccount: 'ఖాతాను సృష్టించండి',
    signupSubtitle: 'స్మార్ట్ బుక్‌నెస్ట్‌లో చేరండి మరియు మీ పఠన ప్రయాణాన్ని ప్రారంభించండి',
    alreadyAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    fullName: 'పూర్తి పేరు',
    email: 'ఈమెయిల్ చిరునామా',
    password: 'పాస్‌వర్డ్',
    confirmPassword: 'పాస్‌వర్డ్‌ను ధృవీకరించండి',

    // Orders & Success
    orderSuccess: 'ఆర్డర్ విజయవంతంగా పూర్తయింది!',
    thankYou: 'స్మార్ట్ బుక్‌నెస్ట్‌తో షాపింగ్ చేసినందుకు ధన్యవాదాలు.',
    trackOrder: 'నా ఆర్డర్‌ని ట్రాక్ చేయండి',
    contShopping: 'షాపింగ్ కొనసాగించండి',
    noOrders: 'ఇటీవలి ఆర్డర్లు ఏవీ లేవు',
    expectedDelivery: 'అంచనా వేసిన డెలివరీ',
    orderedBooks: 'ఆర్డర్ చేసిన పుస్తకాలు',
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
