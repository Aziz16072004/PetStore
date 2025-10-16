import { ArrowLeft, ArrowRight, Dog, Fish, Award, Heart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { bestSellingRow1, bestSellingRow2, Product } from '../data/products';
import TiltedCard from '../components/TiltedCard';
import furnitureImg from '../assets/Furniture.jpeg';
import petsImg from '../assets/cute-pet.png';
import bagsImg from '../assets/dogsBags2.jpeg';
import foodImg from '../assets/foodCategory.jpeg';
import coloredVector from '../assets/coloredVector.png';
// import catImg from '../assets/catImage.png';
import accessoriesImg from '../assets/petsAccessories.jpeg';
import uncoloredVector from '../assets/uncoloredVector.png';
import { API_BASE_URL } from '../config/api';

import { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
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
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-glow transition-all duration-300 transform hover:scale-110">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-glow transition-all duration-300 transform hover:scale-110">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{
            img: accessoriesImg,
            title: 'Accessories',
            count: '94 products'
          }, {
            img: foodImg,
            title: 'Food',
            count: '94 products'
          }, {
            img: furnitureImg,
            title: 'Furniture',
            count: '23 products'
          }, {
            img: bagsImg,
            title: 'Bags',
            count: '19 products'
          }].map((item, idx) => (
            <TiltedCard
              key={idx}
              containerHeight="auto"
              containerWidth="100%"
              imageHeight="auto"
              imageWidth="auto"
              scaleOnHover={1.1}
              rotateAmplitude={30}
              showMobileWarning={false}
              showTooltip={false}
              captionText={item.title}
              onClick={() => handleCategoryClick(item.title)}
            >
              <div className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-card transition-all duration-300 border border-gray-100 hover:border-primary/30 group">
                <div className="overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img src={item.img} alt={item.title} className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="bg-white p-5">
                  <h3 className="font-bold mb-1 text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.count}</p>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>
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
              <ProductCard key={p.id} id={p.id} name={p.name} image={p.image} price={p.price} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {bestSellingRow1.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellingRow2.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Shop by pet</h2>
            <p className="text-gray-600">Find products for your specific pet</p>
          </div>
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-glow transition-all duration-300 transform hover:scale-110">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-glow transition-all duration-300 transform hover:scale-110">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {[
            { name: 'Cat', color: 'from-primary to-secondary' ,image:'https://i.imgur.com/iZJngp1.png' },
            { name: 'Hamster', color: 'from-gray-300 to-gray-400' , image:'https://i.imgur.com/IP5khxF.png' },
            { name: 'Dog', color: 'from-gray-300 to-gray-400' ,image:'https://i.imgur.com/m5N6FF5.png'},
            { name: 'Parrot', color: 'from-gray-300 to-gray-400' ,image:'https://i.imgur.com/MgvcYEX.png'},
            { name: 'Rabbit', color: 'from-gray-300 to-gray-400' ,image:'https://i.imgur.com/BD9Av47.png' },
            { name: 'Turtle', color: 'from-gray-300 to-gray-400' ,image:'https://pngimg.com/uploads/turtle/turtle_PNG68.png' },
          ].map((pet, index) => (
            <TiltedCard
              key={index}
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
                <img src={pet.image} className="vectorBoxImg" alt={pet.name} />
              </div>
            </TiltedCard>
          ))}

        </div>
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
