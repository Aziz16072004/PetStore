import { Order, OrderResponse, CheckoutFormData } from '../types/checkout';
import { CartItem } from '../context/CartContext';
import { API_BASE_URL } from '../config/api';

/**
 * Create an order from checkout form data and cart items
 */
export const createOrderPayload = (
  formData: CheckoutFormData,
  cartItems: CartItem[],
  pricing: { subtotal: number; shipping: number; tax: number; total: number }
): Omit<Order, 'orderId' | 'orderDate'> => {
  return {
    customer: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    },
    shippingAddress: {
      street: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    },
    items: cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      category: item.category,
      subtotal: item.price * item.quantity,
    })),
    payment: {
      cardNumber: formData.cardNumber.slice(-4), // Only send last 4 digits for security
      cardholderName: formData.cardName,
      expiryDate: formData.expiryDate,
      cvv: '***', // Never send actual CVV to backend
      paymentMethod: 'credit_card' as const,
    },
    pricing,
    status: 'pending' as const,
  };
};

/**
 * Submit order to the backend API
 */
export const submitOrder = async (
  formData: CheckoutFormData,
  cartItems: CartItem[],
  pricing: { subtotal: number; shipping: number; tax: number; total: number }
): Promise<OrderResponse> => {
  try {
    // Create a simplified payload that matches backend expectations
    const orderPayload = {
      // Personal Information (flat structure)
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      
      // Shipping Address (flat structure)
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      
      // Payment Information (flat structure)
      cardNumber: formData.cardNumber.slice(-4),
      cardholderName: formData.cardName,
      expiryDate: formData.expiryDate,
      paymentMethod: 'credit_card',
      
      // Order Items
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
        subtotal: item.price * item.quantity,
      })),
      
      // Pricing
      subtotal: pricing.subtotal,
      shipping: pricing.shipping,
      tax: pricing.tax,
      total: pricing.total,
      
      // Status
      status: 'pending',
    };

    console.log('Sending order payload:', orderPayload);

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend error response:', errorData);
      throw new Error(
        errorData.message || `Failed to submit order: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Order submitted successfully:', data);
    
    // Handle different response formats from backend
    // Format 1: { success: true, orderId: "...", message: "..." }
    // Format 2: { orderId: "...", message: "..." }
    // Format 3: { _id: "...", ... } (MongoDB style)
    const orderId = data.orderId || data._id || data.id || `ORD-${Date.now()}`;
    
    return {
      success: true,
      orderId: orderId,
      message: data.message || 'Order created successfully',
      order: data.order || data,
    };
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.status} ${response.statusText}`);
    }

    const data: Order = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

/**
 * Get all orders for a user (by email)
 */
export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
    }

    const data: Order[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
