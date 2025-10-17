import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../data/products';
import { useState } from 'react';

interface ProductCardProps {
  name: string;
  price: number | string;
  image?: string;
  id?: string;
  stock?: number;
}

export default function ProductCard({ name, price, image, id, stock }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addedToCart, setAddedToCart] = useState(false);
  const inWishlist = isInWishlist(id || '');

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
    <Link to={`/product/${id}`} className="block group h-full">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer border border-gray-100 hover:border-primary/20 transform hover:-translate-y-2 h-full flex flex-col">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden flex-shrink-0">
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
          {/* Stock Badge */}
          {stock !== undefined && (
            <div className="absolute top-3 right-3 z-10">
              {stock === 0 ? (
                <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  Out of Stock
                </span>
              ) : stock <= 10 ? (
                <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  Only {stock} left
                </span>
              ) : (
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  In Stock
                </span>
              )}
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 flex-grow">
          <div className="flex-1">
            <h3 className="font-semibold mb-2 text-gray-800 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">{name}</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const product: Product = {
                id: id || '',
                name,
                price: typeof price === 'number' ? price : parseFloat(price as string),
                image,
                category: '',
                brand: '',
                tags: [],
                petType: '',
                stock,
              };
              if (inWishlist) {
                removeFromWishlist(id || '');
              } else {
                addToWishlist(product);
              }
            }}
            className={`transition-all duration-300 hover:scale-125 p-2 flex-shrink-0 ${
              inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 mt-auto ${
            stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : addedToCart
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {stock === 0 ? 'Out of Stock' : addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
      </div>
    </Link>
  );
}
