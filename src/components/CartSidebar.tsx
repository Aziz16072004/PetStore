import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handlePurchase = () => {
    toggleCart();
    navigate('/purchase');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[9998] transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some products to get started!</p>
              <button
                onClick={toggleCart}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-orange-500">
                          ${item.price.toFixed(2)}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 w-full text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Purchase Button */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              {/* Total */}
              <div className="flex items-center justify-between text-lg font-bold border-t border-gray-200 pt-4">
                <span>Total</span>
                <span className="text-orange-500">${getTotalPrice().toFixed(2)}</span>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={toggleCart}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
