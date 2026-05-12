# 📚 Smart BookNest — Premium Digital Bookstore

Smart BookNest is a modern, visually stunning React JS application designed for book lovers. This project focuses on a premium user experience with a sleek dark-themed interface, localized for the Indian market with ₹ (Rupee) currency and featured Indian literature.

**Built for:** College Viva, Portfolio Showcase, and React Learning.

---

## ✨ Key Features

### 🇮🇳 Indian Localization
- **Currency:** Full integration of Indian Rupee (₹) symbols.
- **Curated Collection:** Featured Indian books including "Wings of Fire", "The Alchemist", and more.
- **Dynamic Pricing:** Realistic Indian pricing logic for all books.

### 🔐 User System & Security
- **Authentication:** Custom login/signup system with simulated token-based auth.
- **Profile Management:** Edit personal details and manage multiple delivery addresses.
- **Protected Routes:** Secure access to Cart, Orders, and Profile pages.

### 🛍️ Shopping Experience
- **Advanced Search:** Quick search with real-time results powered by Google Books API.
- **Cart & Wishlist:** Fully functional persistence using LocalStorage.
- **Multi-Page Routing:** Seamless navigation using `react-router-dom`.

### 💳 Simulated Checkout Flow
- **Payment Gateway:** A professional 3-step simulated payment modal.
- **Payment Methods:** Support for UPI (with fake QR), Card, and Cash on Delivery.
- **Order Tracking:** Detailed order success page and historical order dashboard.

### 🔍 Research Integration
- **Wikipedia Feature:** Context-aware "Research on Wikipedia" button on every book detail page.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Hooks & Context API)
- **Tooling:** Vite (Fast Refresh & Build)
- **Routing:** React Router v6
- **Styling:** Modern Vanilla CSS (Glassmorphism & Flexbox/Grid)
- **Icons:** Emoji-based & Custom SVG
- **Storage:** Browser LocalStorage

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/KandadiCharanTej/BookNest.git

# Navigate to the project directory
cd smart-booknest

# Install dependencies
npm install
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (Navbar, BookCard, Modal)
├── context/        # Global state management (Auth, Cart, Wishlist)
├── pages/          # Page-level components (Home, Profile, Explore)
├── services/       # API integration & static data
├── styles/         # Global CSS variables & layout
└── App.jsx         # Main routing & application entry
```

---

## 🎓 Viva Ready Concepts
This project covers the following React syllabus concepts:
- **Functional Components & Hooks** (`useState`, `useEffect`)
- **State Management** via Context API
- **Client-side Routing** with React Router
- **API Integration** (Fetch/JSON)
- **Conditional Rendering** & List Mapping
- **Local Persistence** (LocalStorage API)

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📜 License
This project is licensed under the MIT License.

---
*Developed with ❤️ by [Kandadi Charan Tej](https://github.com/KandadiCharanTej)*
