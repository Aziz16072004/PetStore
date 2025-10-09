import { Phone, Mail, MapPin, Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar';

interface HeaderProps {
  currentPage: string;
}

export default function Header({ currentPage: _ }: HeaderProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCart();

  return (
    <header className="bg-white">
      <div className="bg-gray-50  hidden lg:block ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-10 font-semibold">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 " />
                <span>+379 871-8371</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>rgarton@outlook.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>8592 Fairground St. Tallahassee, FL 32303</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fixed top-10 z-[1000] bg-white rounded-[50px] lg:rounded-[75px] left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] lg:w-[80%] shadow-[1px_5px_20px_0px_rgba(105,105,105,0.29)] backdrop-blur-sm">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9L3 7V9H1V11H3V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V11H23V9H21ZM5 20V11H19V20H5Z"/>
            </svg>
            <span className="text-xl font-bold">Pet Shop</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={location.pathname === '/' ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary font-semibold'}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={location.pathname === '/shop' ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary font-semibold'}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={location.pathname === '/about' ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary font-semibold'}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={location.pathname === '/contact' ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary font-semibold'}
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary w-40 lg:w-64"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button className="p-2 hover:text-primary hidden md:block">
              <Search className="w-5 h-5 md:hidden" />
            </button>
            <button className="p-2 hover:text-primary relative hidden md:block">
              <Heart className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <button 
              onClick={toggleCart}
              className="p-2 hover:text-orange-500 relative transition-colors"
            >
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
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
            </nav>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
}
