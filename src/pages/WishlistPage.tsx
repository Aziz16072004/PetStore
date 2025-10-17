import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    setAddedToCartId(product.id);
    setTimeout(() => setAddedToCartId(null), 2000);
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Save your favorite items to your wishlist and shop them later!
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg hover:shadow-glow transition-all duration-300 font-semibold"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32 lg:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Clear All
            </button>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300 border border-gray-100 group"
            >
              {/* Product Image */}
              <div
                className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(product.id);
                  }}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors z-10"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                </button>

                {/* Stock Badge */}
                {product.stock !== undefined && (
                  <div className="absolute top-3 left-3 z-10">
                    {product.stock === 0 ? (
                      <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        Out of Stock
                      </span>
                    ) : product.stock <= 10 ? (
                      <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        Only {product.stock} left
                      </span>
                    ) : (
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        In Stock
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h3
                  className="font-semibold mb-2 text-gray-800 hover:text-primary transition-colors line-clamp-2 cursor-pointer min-h-[3rem]"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                  ${product.price.toFixed(2)}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : addedToCartId === product.id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.stock === 0
                    ? 'Out of Stock'
                    : addedToCartId === product.id
                    ? 'Added!'
                    : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
