import { Phone, Mail, MapPin, Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CartSidebar from './CartSidebar';
import logo from '../assets/Group.png';

interface HeaderProps {
  currentPage: string;
}

export default function Header({ currentPage: _ }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems, toggleCart } = useCart();
  const { wishlistItems } = useWishlist();

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  // Handle search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-white">
      <div className="bg-gray-50  hidden lg:block ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-10 font-semibold">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 " />
                <span>+216 50-551-663</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>mouhamedazizchaabani@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>4421 oued guriena , Manouba , Tunis  </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fixed z-[1000] bg-white/95 backdrop-blur-md rounded-[50px] lg:rounded-[75px] left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] lg:w-[80%] shadow-soft hover:shadow-card transition-all duration-300 border border-gray-100 ${
        isScrolled ? 'top-2' : 'top-2 lg:top-10'
      }`}>
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <img 
              src={logo} 
              alt="Pet Shop Logo" 
              className="h-8 w-auto transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Pet Shop</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`relative font-semibold transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              )}
            </Link>
            <Link
              to="/shop"
              className={`relative font-semibold transition-all duration-300 ${
                location.pathname === '/shop' 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Shop
              {location.pathname === '/shop' && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              )}
            </Link>
            <Link
              to="/about"
              className={`relative font-semibold transition-all duration-300 ${
                location.pathname === '/about' 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              About Us
              {location.pathname === '/about' && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              )}
            </Link>
            <Link
              to="/contact"
              className={`relative font-semibold transition-all duration-300 ${
                location.pathname === '/contact' 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Contact Us
              {location.pathname === '/contact' && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary w-40 lg:w-64 transition-all"
              />
              <button
                onClick={() => handleSearch()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-primary transition-colors"
                type="button"
              >
                <Search className="w-5 h-5 text-gray-400 hover:text-primary" />
              </button>
            </div>
            <button 
              onClick={() => navigate('/wishlist')}
              className="p-2 hover:text-primary relative group transition-all duration-300 hover:scale-110"
            >
              <Heart className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-primary transition-all" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md animate-scale-in">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={toggleCart}
              className="p-2 hover:text-orange-500 relative transition-all duration-300 hover:scale-110 group"
            >
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 group-hover:animate-bounce" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md animate-scale-in">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button
              className="p-2 lg:hidden transition-all duration-200 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="transition-transform duration-200">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </div>
            </button>
          </div>
          
        </div>
        {/* Mobile Menu with smooth slide animation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-96 opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4'
        }`}>
          <div className="bg-white  rounded-b-[50px] lg:rounded-b-[75px] ">
            <nav className="flex flex-col py-6 px-6 space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left py-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'bg-primary text-white font-medium shadow-md' 
                    : 'hover:bg-gray-50 hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left py-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === '/shop' 
                    ? 'bg-primary text-white font-medium shadow-md' 
                    : 'hover:bg-gray-50 hover:text-primary'
                }`}
              >
                Shop
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left py-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === '/about' 
                    ? 'bg-primary text-white font-medium shadow-md' 
                    : 'hover:bg-gray-50 hover:text-primary'
                }`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left py-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === '/contact' 
                    ? 'bg-primary text-white font-medium shadow-md' 
                    : 'hover:bg-gray-50 hover:text-primary'
                }`}
              >
                Contact Us
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between ${
                  location.pathname === '/wishlist' 
                    ? 'bg-primary text-white font-medium shadow-md' 
                    : 'hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
}
