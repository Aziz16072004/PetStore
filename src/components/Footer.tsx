import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logo from '../assets/Group.png';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={logo} 
                alt="Pet Shop Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Pet Shop</span>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Sed viverra eget formes sit varius. Pellentesque mattis libero viverra dictumst amaraised justo convallis vitae
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center hover:from-primary hover:to-secondary transition-all duration-300 transform hover:scale-110 hover:shadow-glow">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center hover:from-primary hover:to-secondary transition-all duration-300 transform hover:scale-110 hover:shadow-glow">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center hover:from-primary hover:to-secondary transition-all duration-300 transform hover:scale-110 hover:shadow-glow">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center hover:from-primary hover:to-secondary transition-all duration-300 transform hover:scale-110 hover:shadow-glow">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg text-gray-900">Company</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Gift cards</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg text-gray-900">Useful Links</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">New products</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Best sellers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Discount</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">F.A.Q</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg text-gray-900">Customer Service</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Shipping</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Order tracking</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg text-gray-900">Store</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>4421 oued guriena
<br/>Manouba , Tunis</span>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+216 50-551-663</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>mouhamedazizchaabani@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© Copyright Pet Shop. 2024. Created by <span className="text-primary font-semibold"><a href='https://www.linkedin.com/in/aziz-chaabani-6b238a18b/'>Aziz Chaabani</a></span></p>
          <div className="flex gap-3 items-center">
            <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors duration-300 hover:shadow-sm">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='3' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%231f2937'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="h-6" />
            </div>
            <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors duration-300 hover:shadow-sm">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='3' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='7' fill='%231f2937'%3EMaster%3C/text%3E%3C/svg%3E" alt="Mastercard" className="h-6" />
            </div>
            <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors duration-300 hover:shadow-sm">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='3' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%231f2937'%3EAE%3C/text%3E%3C/svg%3E" alt="American Express" className="h-6" />
            </div>
            <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors duration-300 hover:shadow-sm">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='3' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='8' fill='%231f2937'%3EPayPal%3C/text%3E%3C/svg%3E" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
