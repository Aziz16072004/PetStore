# 🐾 Pet Store - E-Commerce Application

A modern, full-featured e-commerce pet store application built with React, TypeScript, and Vite. This application provides a seamless shopping experience for pet owners with features like product browsing, wishlist management, shopping cart, and more.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse products by categories, pet types, brands, and tags
- **Advanced Filtering**: Filter products by price range, categories, brands, and tags
- **Search Functionality**: Quick product search with real-time results
- **Product Details**: Detailed product pages with images, descriptions, and stock information
- **Stock Management**: Real-time stock tracking with visual indicators (In Stock, Low Stock, Out of Stock)

### 🛒 Cart & Wishlist
- **Shopping Cart**: Add products to cart with quantity management
- **Wishlist**: Save favorite products for later
- **LocalStorage Persistence**: Cart and wishlist data persists across sessions
- **Stock Validation**: Prevents adding out-of-stock items to cart

### 📱 User Interface
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Modern UI**: Beautiful gradient designs with smooth animations
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Horizontal Scrolling**: Smooth scrolling for category and pet type sections
- **Dynamic Navigation**: Active page indicators and smooth navigation

### 📊 Product Categories
- **Browse by Category**: Food, Toys, Accessories, Bowls, and more
- **Shop by Pet Type**: Cat, Dog, Hamster, Parrot, Rabbit, Turtle
- **Featured Products**: Curated selection of featured items
- **Best Selling Products**: Top-selling products from the API

### 🗺️ Additional Pages
- **About Us**: Company information and mission
- **Contact Us**: Contact form with location map (Leaflet integration)
- **Checkout**: Complete checkout process

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.2** - Build tool and dev server
- **React Router DOM 7.9.3** - Client-side routing
- **Tailwind CSS 3.4.1** - Utility-first CSS framework

### UI Components & Icons
- **Lucide React** - Modern icon library
- **Framer Motion** - Animation library
- **React Leaflet** - Interactive maps

### State Management
- **React Context API** - Cart and Wishlist management
- **LocalStorage** - Data persistence

### Backend Integration
- **REST API** - Backend API integration
- **Supabase** - Backend services (optional)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Steps

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd pet-store
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure API endpoint**
   
   Update the API base URL in `src/config/api.ts`:
```typescript
export const API_BASE_URL = 'http://localhost:4000/api';
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
pet-store/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and media files
│   ├── components/        # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartSidebar.tsx
│   │   └── ...
│   ├── context/           # React Context providers
│   │   ├── CartContext.tsx
│   │   └── WishlistContext.tsx
│   ├── pages/             # Page components
│   │   ├── HomePage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── data/              # Static data and types
│   │   └── products.ts
│   ├── config/            # Configuration files
│   │   └── api.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🌐 API Endpoints

The application expects the following API endpoints:

### Products
- `GET /api/items` - Get all products
- `GET /api/items/:id` - Get product by ID
- `GET /api/items/featured/list` - Get featured products
- `GET /api/items/best-selling/list?limit=10` - Get best-selling products

### Categories
- `GET /api/categories/product-categories` - Get product categories
- `GET /api/categories/pet-categories` - Get pet type categories

### Blog
- `GET /api/blog` - Get blog posts

## 🎨 Key Features Implementation

### LocalStorage Persistence
Cart and wishlist data are automatically saved to localStorage:
- Cart: `petstore_cart`
- Wishlist: `petstore_wishlist`

### Stock Management
Products display stock status with color-coded badges:
- 🔴 **Out of Stock** - Product unavailable
- 🟠 **Low Stock** - 10 or fewer items remaining
- 🟢 **In Stock** - Product available

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces for mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

**Mouhamed Aziz Chaabani**
- Email: mouhamedazizchaabani@gmail.com
- Phone: +216 50-551-663
- Location: Oued Guriena, Manouba, Tunis

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Maps by [Leaflet](https://leafletjs.com/)
- UI inspiration from modern e-commerce platforms

---

Made with ❤️ for pet lovers
