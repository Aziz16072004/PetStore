import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../data/products';
import TiltedCard from '../components/TiltedCard';
import coloredVector from '../assets/coloredVector.png';
import uncoloredVector from '../assets/uncoloredVector.png';
import headerImg from '../assets/header.png';
import bgHero from '../assets/HomePageImage.png';
import nesr from '../assets/nesr.png';
import petsImg from '../assets/cute-pet.png';
import { API_BASE_URL } from '../config/api';

interface PetCategory {
  _id: string;
  name: string;
  image: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([5, 399]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPetType, setSelectedPetType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [activeIndex, setActiveIndex] = useState(0);
  const [petCategories, setPetCategories] = useState<PetCategory[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [errorPets, setErrorPets] = useState<string | null>(null);
  const petScrollRef = useRef<HTMLDivElement>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/items`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        console.log('First product:', data[0]);
        
        // Check if products have _id instead of id and normalize
        const normalizedProducts = data.map((product: any) => ({
          ...product,
          id: product.id || product._id || product.productId
        }));
        
        console.log('Normalized first product:', normalizedProducts[0]);
        setAllProducts(normalizedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch pet categories from API
  useEffect(() => {
    const fetchPetCategories = async () => {
      try {
        setLoadingPets(true);
        setErrorPets(null);
        const response = await fetch(`${API_BASE_URL}/categories/pet-categories`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch pet categories: ${response.status}`);
        }
        
        const data = await response.json();
        setPetCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setErrorPets(err instanceof Error ? err.message : 'Failed to load pet categories');
        console.error('Error fetching pet categories:', err);
      } finally {
        setLoadingPets(false);
      }
    };

    fetchPetCategories();
  }, []);

  // Apply category and pet type filters from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    const petTypeParam = searchParams.get('petType');
    if (petTypeParam) {
      setSelectedPetType(petTypeParam);
      // Find the index of the pet type to set the active index
      const petIndex = petCategories.findIndex(pet => pet.name === petTypeParam);
      if (petIndex !== -1) {
        setActiveIndex(petIndex);
      }
    }
  }, [searchParams, petCategories]);

  // Get unique categories with counts
  const categories = useMemo(() => {
    const categoryCounts = allProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count
    }));
  }, [allProducts]);

  // Get unique brands with counts
  const brands = useMemo(() => {
    const brandCounts = allProducts.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(brandCounts).map(([name, count]) => ({
      name,
      count
    }));
  }, [allProducts]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allProducts.forEach(product => {
      product.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [allProducts]);

  // Get popular products (top rated)
  const popularProducts = useMemo(() => {
    return allProducts
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5)
      .map(product => ({
        name: product.name,
        price: `$${product.price.toFixed(2)}`
      }));
  }, [allProducts]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Pet type filter
      if (selectedPetType && product.petType !== selectedPetType && product.petType !== 'All') {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Tag filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => product.tags.includes(tag))) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'latest':
      default:
        // Keep original order (latest first)
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, priceRange, selectedPetType, selectedCategories, selectedBrands, selectedTags, sortBy]);

  // Handle category selection
  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryName]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    }
  };

  // Handle brand selection
  const handleBrandChange = (brandName: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandName]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brandName));
    }
  };

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedTags([]);
    setSelectedPetType(null);
    setActiveIndex(0);
    setSearchQuery('');
    setPriceRange([5, 399]);
  };

  const scrollPets = (direction: 'left' | 'right') => {
    if (petScrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left'
        ? petScrollRef.current.scrollLeft - scrollAmount
        : petScrollRef.current.scrollLeft + scrollAmount;
      
      petScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Products</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
          <p className="text-sm text-gray-500">Make sure the API server is running at {API_BASE_URL.replace('/api', '')}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="absolute top-10 left-80 w-40 h-40 bg-gradient-to-bl from-[#F87537] to-[#FBA81F] rounded-full opacity-60 wavebox"></div>
      <div className="absolute bottom-20 left-40 w-24 h-24 bg-orange-400 rounded-full opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-36 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src={nesr} className="absolute top-30 right-0  "/>
              <div className="text-orange-500 font-medium mb-4">Pet Shop</div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 relative z-10">
                The friendly and<br />caring small pet store
              </h1>
              <p className="text-gray-600 text-lg relative z-10">
                At et vehicula sodales est proin turpis pellentesque similia a aliquam amet rhoncus quisque eget et
              </p>
            </div>

            <div className="relative">
            <div className="heroImage">
              <img src={bgHero} alt='heroBg' className='bgHero absolute [top:50px] inset-0 z-10 transform [scale:1.1] ' />
              <img src={headerImg} alt="Hero" className="[scale:.9] object-contain heroDog"  />
            </div>
          </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Shop by pet</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollPets('left')}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollPets('right')}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loadingPets ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : errorPets ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{errorPets}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : petCategories.length > 0 ? (
          <div 
            ref={petScrollRef}
            className="flex overflow-x-auto gap-6 pb-4 pt-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {petCategories.map((pet, index) => (
              <div key={pet._id} className="flex-shrink-0 w-40">
                <TiltedCard
                  containerHeight="auto"
                  containerWidth="100%"
                  imageHeight="auto"
                  imageWidth="auto"
                  scaleOnHover={1.1}
                  rotateAmplitude={30}
                  showMobileWarning={false}
                  showTooltip={false}
                  captionText={`Shop ${pet.name}`}
                  onClick={() => {
                    setActiveIndex(index);
                    setSelectedPetType(selectedPetType === pet.name ? null : pet.name);
                  }}
                >
                  <div className="vectorBox cursor-pointer">
                    <img
                      src={index === activeIndex ? coloredVector : uncoloredVector}
                      alt={pet.name}
                    />
                    <img 
                      src={pet.image} 
                      className="vectorBoxImg" 
                      alt={pet.name}
                      onError={(e) => {
                        e.currentTarget.src = petsImg;
                      }}
                    />
                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No pet categories available at the moment.</p>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="text-gray-600">
              Showing {filteredAndSortedProducts.length} results
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
          >
            <option value="latest">Sort by latest</option>
            <option value="price-low">Sort by price: low to high</option>
            <option value="price-high">Sort by price: high to low</option>
            <option value="popularity">Sort by popularity</option>
            <option value="name">Sort by name</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Filter by categories</h3>
                {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedTags.length > 0 || selectedPetType || searchQuery || priceRange[0] !== 5 || priceRange[1] !== 399) && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category.name} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4 accent-orange-500"
                        checked={selectedCategories.includes(category.name)}
                        onChange={(e) => handleCategoryChange(category.name, e.target.checked)}
                      />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-orange-500 text-sm">{category.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="font-bold mb-4">Filter by Price</h3>
              <div className="mb-4">
                <input
                  type="range"
                  min="5"
                  max="399"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-orange-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Price: ${priceRange[0]} — ${priceRange[1]}</span>
                <div className="text-xs text-gray-500">
                  {filteredAndSortedProducts.length} products
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="font-bold mb-4">Filter by brands</h3>
              <div className="space-y-3">
                {brands.map((brand) => (
                  <label key={brand.name} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-3 w-4 h-4 accent-orange-500"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={(e) => handleBrandChange(brand.name, e.target.checked)}
                      />
                      <span>{brand.name}</span>
                    </div>
                    <span className="text-orange-500 text-sm">{brand.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="font-bold mb-4">Filter by tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-gray-300 hover:border-orange-500 hover:text-orange-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-4">Popular products</h3>
              <div className="space-y-4">
                {popularProducts.map((product, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                      <p className="text-orange-500 font-bold text-sm">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    id={product.id}
                    stock={product.stock}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded bg-orange-500 text-white flex items-center justify-center font-medium">
                  1
                </button>
                <button className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:border-orange-500">
                  2
                </button>
              </div>
              <button className="px-6 py-2 border border-gray-300 rounded hover:border-orange-500">
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 rounded-lg bg-gradient-to-br from-cyan-300 via-teal-300 to-blue-400"></div>
          <div className="h-64 rounded-lg bg-gradient-to-br from-purple-300 via-pink-300 to-purple-400"></div>
        </div>
      </section>
    </div>
  );
}
