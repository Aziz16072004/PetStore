# Orders API Integration

## Overview
The checkout page now integrates with your backend API to submit orders.

## API Endpoint

**Endpoint:** `POST http://localhost:4000/api/orders`

### Request Payload

```json
{
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890"
  },
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "items": [
    {
      "productId": "1",
      "name": "Premium Dog Food",
      "price": 19.99,
      "quantity": 2,
      "image": "https://example.com/image.jpg",
      "category": "Food",
      "subtotal": 39.98
    }
  ],
  "payment": {
    "cardNumber": "3456",
    "cardholderName": "John Doe",
    "expiryDate": "12/25",
    "cvv": "***",
    "paymentMethod": "credit_card"
  },
  "pricing": {
    "subtotal": 39.98,
    "shipping": 9.99,
    "tax": 3.20,
    "total": 53.17
  },
  "status": "pending"
}
```

### Expected Response

**Success (200 OK):**
```json
{
  "success": true,
  "orderId": "ORD-2025-12345",
  "message": "Order created successfully",
  "order": {
    "orderId": "ORD-2025-12345",
    "orderDate": "2025-10-08T22:17:00.000Z",
    "customer": { ... },
    "shippingAddress": { ... },
    "items": [ ... ],
    "payment": { ... },
    "pricing": { ... },
    "status": "pending"
  }
}
```

**Error (400/500):**
```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

## Security Features

1. **Card Number**: Only last 4 digits are sent to backend
2. **CVV**: Never sent to backend (replaced with "***")
3. **Validation**: All fields validated before submission
4. **Error Handling**: Comprehensive error messages displayed to user

## Files Modified

1. **`src/services/orderService.ts`** - API service layer
   - `submitOrder()` - Submit order to backend
   - `createOrderPayload()` - Transform form data to API format
   - `getOrderById()` - Fetch order by ID
   - `getOrdersByEmail()` - Fetch orders by email

2. **`src/types/checkout.ts`** - TypeScript type definitions
   - `CheckoutFormData` - Form input types
   - `Order` - Complete order object
   - `OrderResponse` - API response type
   - `OrderSummary` - Price breakdown

3. **`src/pages/CheckoutPage.tsx`** - Updated to use API
   - Integrated `submitOrder()` service
   - Added error handling and display
   - Shows order ID on success
   - Clears cart after successful order

## Testing the Integration

### 1. Start your backend server
```bash
# Make sure your API is running at http://localhost:4000
```

### 2. Test the flow
1. Add products to cart from shop page
2. Click shopping cart icon
3. Click "Proceed to Checkout"
4. Fill in all form fields
5. Click "Complete Purchase"
6. Order will be submitted to API
7. Success screen shows order ID

### 3. Check backend logs
Your backend should receive the POST request with the order data.

## Error Handling

The checkout page handles these scenarios:

- **Network errors**: Shows "Failed to process your order"
- **API errors**: Displays error message from backend
- **Validation errors**: Shows field-specific errors
- **Empty cart**: Redirects to shop page

## Next Steps

### Backend Requirements

Your backend API should:

1. **Accept POST requests** at `/api/orders`
2. **Validate** the incoming order data
3. **Generate** a unique order ID
4. **Store** the order in database
5. **Return** success response with order ID
6. **Handle errors** gracefully

### Example Backend Response Handler (Node.js/Express)

```javascript
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    
    // Add metadata
    const order = {
      ...orderData,
      orderId,
      orderDate: new Date(),
    };
    
    // Save to database
    await db.orders.insert(order);
    
    // Send success response
    res.status(200).json({
      success: true,
      orderId: order.orderId,
      message: 'Order created successfully',
      order: order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
});
```

## Additional API Endpoints (Optional)

The service layer also includes:

- **GET** `/api/orders/:orderId` - Get order by ID
- **GET** `/api/orders?email=user@example.com` - Get orders by email

Implement these on your backend for order tracking features.
