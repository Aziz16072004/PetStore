import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L14 6L12 8L10 6L12 4Z" fill="currentColor"/>
                <path d="M12 8L14 10L12 12L10 10L12 8Z" fill="currentColor"/>
                <path d="M8 8L10 10L8 12L6 10L8 8Z" fill="currentColor"/>
                <path d="M16 8L18 10L16 12L14 10L16 8Z" fill="currentColor"/>
              </svg>
              <span className="text-xl font-bold">Pet Shop</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Sed viverra eget formes sit varius. Pellentesque mattis libero viverra dictumst amaraised justo convallis vitae
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-primary">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-primary">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-primary">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-primary">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Gift cards</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">New products</a></li>
              <li><a href="#" className="hover:text-primary">Best sellers</a></li>
              <li><a href="#" className="hover:text-primary">Discount</a></li>
              <li><a href="#" className="hover:text-primary">F.A.Q</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Shipping</a></li>
              <li><a href="#" className="hover:text-primary">Returns</a></li>
              <li><a href="#" className="hover:text-primary">Order tracking</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Store</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>8592 Fairground St.</li>
              <li>Tallahassee, FL 32303</li>
              <li className="pt-2">+775 378-6348</li>
              <li>rgarton@outlook.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© Copyright Pet Shop. 2024. Design by Figma guru</p>
          <div className="flex gap-4 items-center">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='3' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%231f2937'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="h-6" />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='3' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='7' fill='%231f2937'%3EMaster%3C/text%3E%3C/svg%3E" alt="Mastercard" className="h-6" />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='3' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%231f2937'%3EAE%3C/text%3E%3C/svg%3E" alt="American Express" className="h-6" />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='3' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='8' fill='%231f2937'%3EPayPal%3C/text%3E%3C/svg%3E" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
