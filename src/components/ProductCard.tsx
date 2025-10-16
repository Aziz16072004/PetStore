import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../data/products';
import { useState } from 'react';

interface ProductCardProps {
  name: string;
  price: number | string;
  image?: string;
  id?: string;
}

export default function ProductCard({ name, price, image, id }: ProductCardProps) {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const product: Product = {
      id: id || '',
      name,
      price: typeof price === 'number' ? price : parseFloat(price),
      image,
      category: '',
      brand: '',
      tags: [],
      petType: '',
    };
    
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer border border-gray-100 hover:border-primary/20 transform hover:-translate-y-2">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          ) : (
            <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 text-gray-300 group-hover:text-gray-400 transition-colors">
              <rect x="40" y="60" width="60" height="100" rx="10" fill="currentColor"/>
              <rect x="110" y="60" width="50" height="100" rx="10" fill="currentColor"/>
              <rect x="50" y="40" width="40" height="30" rx="5" fill="currentColor"/>
            </svg>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold mb-2 text-gray-800 group-hover:text-primary transition-colors line-clamp-2">{name}</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-125 p-2"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 ${
            addedToCart
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
      </div>
    </Link>
  );
}
