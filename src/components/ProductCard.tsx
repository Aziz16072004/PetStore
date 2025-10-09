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
    <Link to={`/product/${id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 text-gray-300">
              <rect x="40" y="60" width="60" height="100" rx="10" fill="currentColor"/>
              <rect x="110" y="60" width="50" height="100" rx="10" fill="currentColor"/>
              <rect x="50" y="40" width="40" height="30" rx="5" fill="currentColor"/>
            </svg>
          )}
        </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium mb-1">{name}</h3>
            <p className="text-lg font-bold">${typeof price === 'number' ? price.toFixed(2) : price}</p>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="text-primary hover:text-secondary"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-orange-500 text-white hover:bg-orange-600'
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
