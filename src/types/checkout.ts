// Checkout Form Data Model
export interface CheckoutFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Shipping Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Payment Information (optional usage)
  cardNumber: string;
  cardName: string;
  expiryDate: string; // Format: MM/YY
  cvv: string;
}

// Order Summary Model
export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// Complete Order Model (for backend submission)
export interface Order {
  orderId: string;
  orderDate: Date;
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  pricing: OrderSummary;
  status: OrderStatus;
}

// Customer Information
export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Shipping Address
export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Order Item (Product in cart)
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
  subtotal: number; // price * quantity
}

// Order Status
export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// Form Validation Errors
export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

// API Response Models
export interface OrderResponse {
  success: boolean;
  orderId: string;
  message: string;
  order?: Order;
}

// Example Usage:
/*
const checkoutData: CheckoutFormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'USA'
};

const order: Order = {
  orderId: 'ORD-2025-001',
  orderDate: new Date(),
  customer: {
    firstName: checkoutData.firstName,
    lastName: checkoutData.lastName,
    email: checkoutData.email,
    phone: checkoutData.phone
  },
  shippingAddress: {
    street: checkoutData.address,
    city: checkoutData.city,
    state: checkoutData.state,
    zipCode: checkoutData.zipCode,
    country: checkoutData.country
  },
  items: cartItems.map(item => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
    category: item.category,
    subtotal: item.price * item.quantity
  })),
  pricing: {
    subtotal: 100.00,
    shipping: 9.99,
    tax: 8.00,
    total: 117.99
  },
  status: 'pending'
};
*/
