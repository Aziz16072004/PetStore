import { ArrowLeft, ArrowRight, Dog, Fish, Award, Heart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { Product } from '../data/products';
import TiltedCard from '../components/TiltedCard';
import petsImg from '../assets/cute-pet.png';
import coloredVector from '../assets/coloredVector.png';
import accessoriesImg from '../assets/petsAccessories.jpeg';
import uncoloredVector from '../assets/uncoloredVector.png';
import { API_BASE_URL } from '../config/api';

import { useState, useEffect, useRef } from 'react';
import BlogModal from '../components/BlogModal';

interface BlogPost {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage: string;
  author?: string;
  date: string;
  category?: string;
  tags?: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PetCategory {
  _id: string;
  name: string;
  image: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductCategory {
  _id: string;
  name: string;
  image: string;
  description?: string;
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [errorBlogs, setErrorBlogs] = useState<string | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [petCategories, setPetCategories] = useState<PetCategory[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [errorPets, setErrorPets] = useState<string | null>(null);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [loadingProductCategories, setLoadingProductCategories] = useState(true);
  const [errorProductCategories, setErrorProductCategories] = useState<string | null>(null);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [loadingBestSelling, setLoadingBestSelling] = useState(true);
  const [errorBestSelling, setErrorBestSelling] = useState<string | null>(null);
  const navigate = useNavigate();
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const petScrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? categoryScrollRef.current.scrollLeft - scrollAmount
        : categoryScrollRef.current.scrollLeft + scrollAmount;
      
      categoryScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
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

  // Fetch featured products from API
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoadingFeatured(true);
        setErrorFeatured(null);
        const response = await fetch(`${API_BASE_URL}/items/featured/list`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch featured products: ${response.status}`);
        }
        
        const data = await response.json();
        // Normalize product IDs
        const normalizedProducts = data.map((product: any) => ({
          ...product,
          id: product.id || product._id || product.productId
        }));
        setFeaturedProducts(normalizedProducts);
      } catch (err) {
        setErrorFeatured(err instanceof Error ? err.message : 'Failed to load featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoadingBlogs(true);
        setErrorBlogs(null);
        const response = await fetch(`${API_BASE_URL}/blog/posts`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        // Get only the first 3 posts for home page
        const posts = Array.isArray(data) ? data.slice(0, 3) : data.posts?.slice(0, 3) || [];
        setBlogPosts(posts);
      } catch (err) {
        setErrorBlogs(err instanceof Error ? err.message : 'Failed to load blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogPosts();
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

  // Fetch product categories from API
  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        setLoadingProductCategories(true);
        setErrorProductCategories(null);
        const response = await fetch(`${API_BASE_URL}/categories/product-categories`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product categories: ${response.status}`);
        }
        
        const data = await response.json();
        setProductCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setErrorProductCategories(err instanceof Error ? err.message : 'Failed to load product categories');
        console.error('Error fetching product categories:', err);
      } finally {
        setLoadingProductCategories(false);
      }
    };

    fetchProductCategories();
  }, []);

  // Fetch best-selling products from API
  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        setLoadingBestSelling(true);
        setErrorBestSelling(null);
        
        const response = await fetch(`${API_BASE_URL}/items/best-selling/list?limit=10`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch best-selling products: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Best-selling products response:', data);
        
        // Handle both array and object responses
        const products = Array.isArray(data) ? data : data.products || data.items || [];
        
        // Normalize product IDs and limit to 10
        const normalizedProducts = products.slice(0, 10).map((product: any) => ({
          ...product,
          id: product.id || product._id || product.productId
        }));
        
        setBestSellingProducts(normalizedProducts);
      } catch (err) {
        setErrorBestSelling(err instanceof Error ? err.message : 'Failed to load best-selling products');
        console.error('Error fetching best-selling products:', err);
      } finally {
        setLoadingBestSelling(false);
      }
    };

    fetchBestSellingProducts();
  }, []);

  return (
    <div>
      <Hero
        title="A pet store with"
        subtitle="everything you need"
        description="Semis ipsum et parturient eget aliquet et tortor lectus. Tellus, fuisee neque scelerisque non et masa."
        buttonText="Shop Now"
        onButtonClick={() => window.location.href = '/shop'}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Browse by category</h2>
            <p className="text-gray-600">Find everything your pet needs</p>
          </div>
          {productCategories.length > 4 && (
            <div className="flex gap-3">
              <button 
                onClick={() => scrollCategories('left')}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-glow transition-all duration-300 transform hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollCategories('right')}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-glow transition-all duration-300 transform hover:scale-110"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {loadingProductCategories ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : errorProductCategories ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{errorProductCategories}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : productCategories.length > 0 ? (
          <div 
            ref={categoryScrollRef}
            className={`${
              productCategories.length > 4 
                ? 'flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth' 
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
            }`}
            style={productCategories.length > 4 ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
          >
            {productCategories.map((category) => (
              <div 
                key={category._id}
                className={productCategories.length > 4 ? 'flex-shrink-0 w-72' : ''}
              >
                <TiltedCard
                  containerHeight="auto"
                  containerWidth="100%"
                  imageHeight="auto"
                  imageWidth="auto"
                  scaleOnHover={1.1}
                  rotateAmplitude={30}
                  showMobileWarning={false}
                  showTooltip={false}
                  captionText={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-card transition-all duration-300 border border-gray-100 hover:border-primary/30 group">
                    <div className="overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = accessoriesImg;
                        }}
                      />
                    </div>
                    <div className="bg-white p-5">
                      <h3 className="font-bold mb-1 text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-sm text-gray-500">
                        {category.productCount ? `${category.productCount} products` : 'View products'}
                      </p>
                    </div>
                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No product categories available at the moment.</p>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Featured products</h2>
          <p className="text-gray-600 text-lg">Handpicked favorites for your furry friends</p>
        </div>
        
        {loadingFeatured ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : errorFeatured ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{errorFeatured}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} image={p.image} price={p.price} stock={p.stock} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-orange-50/50 to-transparent rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FE8F90] to-[#FBA81F] rounded-full transform scale-90 opacity-60 blur-2xl animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-center">
              
                <img src={petsImg} alt="Hero" className="w-full h-full object-contain drop-shadow-2xl animate-float" />
               
               
              
            </div>
          </div>

          <div className="animate-slide-up">
            <div className="inline-block text-primary font-semibold mb-4 px-4 py-2 bg-orange-100 rounded-full text-sm">Why choose us</div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">The smarter way to shop for your pet</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              At et vehicula sodales est proin turpis pellentesque situlla a aliquam amet. Semper quis neque pederantesque nec et facilisis neque predenteresque similia a dinguam tempor sociis oquet eget
            </p>
            <button className="group bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105 flex items-center gap-2">
              Learn More
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-16">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
              <Fish className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
              <Dog className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
              <Award className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Best selling products</h2>
          <p className="text-gray-600 text-lg">Customer favorites that pets love</p>
        </div>
        
        {loadingBestSelling ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : errorBestSelling ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{errorBestSelling}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : bestSellingProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {bestSellingProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id} 
                name={product.name} 
                price={product.price}
                image={product.image}
                stock={product.stock}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No best-selling products available at the moment.</p>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Shop by pet</h2>
            <p className="text-gray-600">Find products for your specific pet</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => scrollPets('left')}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-glow transition-all duration-300 transform hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollPets('right')}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-glow transition-all duration-300 transform hover:scale-110"
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
                  onClick={() => navigate(`/shop?petType=${encodeURIComponent(pet.name)}`)}
                >
                  <div
                    className="vectorBox cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  >
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">News & Blog</h2>
          <p className="text-gray-600 text-lg">Latest tips and stories for pet lovers</p>
        </div>
        
        {loadingBlogs ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : errorBlogs ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{errorBlogs}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post._id} 
                className="rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer border border-gray-100 hover:border-primary/20 transform hover:-translate-y-2 group"
                onClick={() => {
                  setSelectedBlogPost(post);
                  setIsBlogModalOpen(true);
                }}
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback gradient if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-orange-400', 'via-red-400', 'to-pink-500');
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                    {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' })}
                  </span>
                </div>
                <div className="bg-white p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts available at the moment.</p>
          </div>
        )}
      </section>

      {/* Blog Modal */}
      <BlogModal 
        post={selectedBlogPost}
        isOpen={isBlogModalOpen}
        onClose={() => {
          setIsBlogModalOpen(false);
          setSelectedBlogPost(null);
        }}
      />
    </div>
  );
}
