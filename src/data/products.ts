export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  brand: string;
  tags: string[];
  petType: string;
  rating?: number;
  description?: string;
};

export const allProducts: Product[] = [
  // Food Category
  { id: '1', name: 'Premium Dog Food', price: 19.99, image: 'https://i5.walmartimages.com/seo/Pedigree-Puppy-Growth-Protection-Dry-Dog-Food-Chicken-Vegetable-Flavor-14-Lb-Bag_10197295-b191-4bcd-b9d6-e29071cfbffe.771c34523263802ee7aadaca8c982b78.jpeg', category: 'Food', brand: 'Natural food', tags: ['Dog food', 'Natural'], petType: 'Dog', rating: 4.5 },
  { id: '2', name: 'Premium Cat Food', price: 18.99, image: 'https://m.media-amazon.com/images/I/61HeH0iNzEL._AC_SL1500_.jpg', category: 'Food', brand: 'Pelt-care', tags: ['Cat food', 'Natural'], petType: 'Cat', rating: 4.3 },
  { id: '3', name: 'Premium Dog Food', price: 19.99, image: 'https://m.media-amazon.com/images/I/71npxoIRwLL._AC_SL1500_.jpg', category: 'Food', brand: 'Dogs friend', tags: ['Dog food', 'Premium'], petType: 'Dog', rating: 4.7 },
  { id: '4', name: 'Cat Food Deluxe', price: 24.99, image: 'https://m.media-amazon.com/images/I/61HeH0iNzEL._AC_SL1500_.jpg', category: 'Food', brand: 'Pet food', tags: ['Cat food', 'Premium'], petType: 'Cat', rating: 4.6 },
  { id: '5', name: 'Parrot Seed Mix', price: 12.99, image: 'https://m.media-amazon.com/images/I/71npxoIRwLL._AC_SL1500_.jpg', category: 'Food', brand: 'Favorite pet', tags: ['Parrot', 'Natural'], petType: 'Parrot', rating: 4.2 },
  
  // Bowls Category
  { id: '6', name: 'Cat Bowl', price: 19.99, image: '/products/cat-bowl.jpg', category: 'Bowls', brand: 'Green line', tags: ['Cat', 'Bowl'], petType: 'Cat', rating: 4.4 },
  { id: '7', name: 'Cat Bowl Premium', price: 29.99, image: '/products/cat-bowl-2.jpg', category: 'Bowls', brand: 'Pelt-care', tags: ['Cat', 'Premium'], petType: 'Cat', rating: 4.8 },
  { id: '8', name: 'Dog Bowl', price: 14.99, image: '/products/dog-bowl.jpg', category: 'Bowls', brand: 'Dogs friend', tags: ['Dog', 'Bowl'], petType: 'Dog', rating: 4.3 },
  { id: '9', name: 'Dog Bowl Deluxe', price: 24.99, image: '/products/dog-bowl.jpg', category: 'Bowls', brand: 'Natural food', tags: ['Dog', 'Premium'], petType: 'Dog', rating: 4.7 },
  
  // Toys Category
  { id: '10', name: 'Dog Leash', price: 9.99, image: '/products/dog-leash.jpg', category: 'Toys', brand: 'Dogs friend', tags: ['Dog', 'Leash'], petType: 'Dog', rating: 4.1 },
  { id: '11', name: 'Premium Dog Toy', price: 20.99, image: '/products/dog-toy.jpg', category: 'Toys', brand: 'Favorite pet', tags: ['Dog', 'Toy'], petType: 'Dog', rating: 4.5 },
  { id: '12', name: 'Cat Toy Set', price: 15.99, image: '/products/cat-toy.jpg', category: 'Toys', brand: 'Pelt-care', tags: ['Cat', 'Toy'], petType: 'Cat', rating: 4.2 },
  { id: '13', name: 'Hamster Wheel', price: 12.99, image: '/products/hamster-wheel.jpg', category: 'Toys', brand: 'Green line', tags: ['Hamster', 'Wheel'], petType: 'Hamster', rating: 4.0 },
  
  // Furniture Category
  { id: '14', name: 'Cat Bed', price: 49.99, image: '/products/cat-bed.jpg', category: 'Furniture', brand: 'Pelt-care', tags: ['Cat', 'Bed'], petType: 'Cat', rating: 4.6 },
  { id: '15', name: 'Dog Bed', price: 49.99, image: '/products/dog-bed.jpg', category: 'Furniture', brand: 'Dogs friend', tags: ['Dog', 'Bed'], petType: 'Dog', rating: 4.5 },
  { id: '16', name: 'Pet Carrier', price: 29.99, image: '/products/pet-carrier.jpg', category: 'Furniture', brand: 'Natural food', tags: ['Carrier', 'Travel'], petType: 'All', rating: 4.3 },
  { id: '17', name: 'Cat Tree', price: 89.99, image: '/products/cat-tree.jpg', category: 'Furniture', brand: 'Favorite pet', tags: ['Cat', 'Tree'], petType: 'Cat', rating: 4.8 },
  
  // Clothing Category
  { id: '18', name: 'Dog Sweater', price: 19.99, image: '/products/dog-sweater.jpg', category: 'Clothing', brand: 'Dogs friend', tags: ['Dog', 'Sweater'], petType: 'Dog', rating: 4.2 },
  { id: '19', name: 'Cat Collar', price: 7.99, image: '/products/cat-collar.jpg', category: 'Clothing', brand: 'Pelt-care', tags: ['Cat', 'Collar'], petType: 'Cat', rating: 4.0 },
  { id: '20', name: 'Dog Coat', price: 34.99, image: '/products/dog-coat.jpg', category: 'Clothing', brand: 'Natural food', tags: ['Dog', 'Coat'], petType: 'Dog', rating: 4.4 },
  
  // Additional products for variety
  { id: '21', name: 'Rabbit Food', price: 16.99, image: '/products/rabbit-food.jpg', category: 'Food', brand: 'Green line', tags: ['Rabbit', 'Natural'], petType: 'Rabbit', rating: 4.1 },
  { id: '22', name: 'Fish Food', price: 8.99, image: '/products/fish-food.jpg', category: 'Food', brand: 'Pet food', tags: ['Fish', 'Natural'], petType: 'Fish', rating: 4.0 },
  { id: '23', name: 'Hamster Bed', price: 22.99, image: '/products/hamster-bed.jpg', category: 'Furniture', brand: 'Green line', tags: ['Hamster', 'Bed'], petType: 'Hamster', rating: 4.3 },
  { id: '24', name: 'Dog Treats', price: 11.99, image: '/products/dog-treats.jpg', category: 'Food', brand: 'Dogs friend', tags: ['Dog food', 'Treats'], petType: 'Dog', rating: 4.5 },
];

// Legacy exports for backward compatibility
export const featuredProducts: Product[] = allProducts.slice(0, 3);
export const bestSellingRow1: Product[] = allProducts.slice(3, 7);
export const bestSellingRow2: Product[] = allProducts.slice(7, 11);


