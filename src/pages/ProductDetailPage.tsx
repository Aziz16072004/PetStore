import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Loader2 } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { API_BASE_URL } from '../config/api';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', id);
        
        if (!id || id === 'undefined') {
          throw new Error('Invalid product ID');
        }
        
        const response = await fetch(`${API_BASE_URL}/items/${id}`);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Product data received:', data);
        
        // Normalize the product data
        const normalizedProduct = {
          ...data,
          id: data.id || data._id || data.productId
        };
        
        setProduct(normalizedProduct);
        setSelectedImageIndex(0); // Reset to first image when product changes
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id && id !== 'undefined') {
      fetchProduct();
    } else {
      setError('Invalid product ID');
      setLoading(false);
    }
  }, [id]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    const maxStock = product?.stock || 999;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product && product.stock !== 0) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const isOutOfStock = product?.stock === 0;
  const isLowStock = product?.stock !== undefined && product.stock > 0 && product.stock <= 10;
  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleToggleWishlist = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Product Not Found</h3>
            <p className="text-red-700 mb-4">{error || 'The product you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[selectedImageIndex]
                    : product.image || '/api/placeholder/600/600'
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-orange-500 ring-2 ring-orange-200'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating})</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
              </div>

              {/* Stock Status */}
              {product.stock !== undefined && (
                <div className="mb-6">
                  {isOutOfStock ? (
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Out of Stock
                    </div>
                  ) : isLowStock ? (
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold">
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                      Only {product.stock} left in stock - Order soon!
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      In Stock ({product.stock} available)
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              )}
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Quantity:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      const maxStock = product.stock || 999;
                      if (value >= 1 && value <= maxStock) {
                        setQuantity(value);
                      }
                    }}
                    className="w-16 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    min="1"
                    max={product.stock || 999}
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock !== undefined && quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                {product.stock !== undefined && quantity >= product.stock && (
                  <p className="text-sm text-orange-600 mt-2">Maximum available quantity reached</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                  isOutOfStock
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : addedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {isOutOfStock ? 'OUT OF STOCK' : addedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
              </button>
              <button 
                onClick={handleToggleWishlist}
                className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-all ${
                  inWishlist 
                    ? 'border-red-500 bg-red-50 text-red-500' 
                    : 'border-gray-900 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Additional Product Details */}
            <div className="pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
              <div>ID: {product.id}</div>
              <div>Category: {product.category}</div>
              <div>Brand: {product.brand}</div>
              <div>Pet Type: {product.petType}</div>
              {product.stock !== undefined && (
                <div>Stock: {product.stock} units</div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div>Tags: {product.tags.join(', ')}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
