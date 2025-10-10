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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Browse by category</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
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
              <div className="rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <img src={item.img} alt={item.title} className="w-full h-48 object-contain" />
                <div className="bg-white p-4">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.count}</p>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured products</h2>
        
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FE8F90] rounded-full transform scale-90 opacity-80"></div>
            <div className="relative z-10 flex items-center justify-center">
              
                <img src={petsImg} alt="Hero" className="w-full h-full object-contain" />
               
               
              
            </div>
          </div>

          <div>
            <div className="text-primary font-medium mb-4">Why choose us</div>
            <h2 className="text-4xl font-bold mb-6">The smarter way to shop for your pet</h2>
            <p className="text-gray-600 mb-8">
              At et vehicula sodales est proin turpis pellentesque situlla a aliquam amet. Semper quis neque pederantesque nec et facilisis neque predenteresque similia a dinguam tempor sociis oquet eget
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Fish className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Dog className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Best selling products</h2>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Shop by pet</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">News & Blog</h2>
        
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div 
                key={post._id} 
                className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedBlogPost(post);
                  setIsBlogModalOpen(true);
                }}
              >
                <div className="h-64 relative">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback gradient if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-orange-400', 'via-red-400', 'to-pink-500');
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' })}
                  </span>
                </div>
                <div className="bg-white p-6">
                  <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
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
