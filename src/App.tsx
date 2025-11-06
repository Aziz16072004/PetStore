import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getSocket } from './lib/socket';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';

function AppContent() {
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.substring(1).split('/')[0];

  // App-level Socket.IO listeners -> dispatch DOM event for inbox
  useEffect(() => {
    const socket = getSocket();

    const events = [
      'support:message:created',
      'support:message:updated',
      'support:message:deleted',
      'support:message:replied',
    ] as const;

    const handler = () => {
      window.dispatchEvent(new CustomEvent('support:updated'));
    };

    events.forEach((evt) => socket.on(evt, handler));

    return () => {
      events.forEach((evt) => socket.off(evt, handler));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header currentPage={currentPage} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchase" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
