import { ArrowLeft, ArrowRight, Loader2, Instagram, Facebook, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import headerImg from '../assets/vecteezy_adorable-fluffy-kitten-high-quality-transparent-for-pet-lovers_58289536.png';
import bgHero from '../assets/HomePageImage.png';
import nesr from '../assets/nesr.png';
import { API_BASE_URL } from '../config/api';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  img: string;
  description: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Testimonial {
  _id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [errorTestimonials, setErrorTestimonials] = useState<string | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/team`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch team members: ${response.status}`);
        }
        
        const data = await response.json();
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load team members');
        console.error('Error fetching team members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        setErrorTestimonials(null);
        const response = await fetch(`${API_BASE_URL}/testimonials`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`);
        }
        
        const data = await response.json();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (err) {
        setErrorTestimonials(err instanceof Error ? err.message : 'Failed to load testimonials');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Navigate testimonials
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div>
      <div className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="absolute top-10 left-80 w-40 h-40 bg-gradient-to-bl from-[#F87537] to-[#FBA81F] rounded-full opacity-60 wavebox"></div>
        <div className="absolute bottom-20 left-40 w-24 h-24 bg-orange-400 rounded-full opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-36 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-primary font-medium mb-4">Pet Shop</div>
              <img src={nesr} className="absolute top-30 right-0  "/>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 relative z-10">
                If animals could talk,<br />they'd talk about us!
              </h1>
              <p className="text-gray-600 mb-8 text-lg relative z-10" >
                At et vehicula sodales est proin turpis pellentesque similia a aliquam amet rhoncus quisque eget et
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Shop Now
              </button>
            </div>

            <div className="relative">
            <div className="heroImage">
              <img src={bgHero} alt='heroBg' className='bgHero absolute [top:20px] inset-0 z-10 transform [scale:1.1] lg:[scale:1.1]' />
              <img src={headerImg} alt="Hero" className=" object-contain heroDog"  />
            </div>
          </div>
          </div>
        </div>
      </div>

      <section className="relative py-20 bg-gradient-to-br from-white via-orange-50 to-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              About our store
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Description Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Our pet shop website is an online platform designed to make pet care easier and more convenient for everyone. It offers a wide range of pet products, including food, accessories, toys, and grooming supplies for various animals such as dogs, cats, birds, fish, and small pets. The website provides a user-friendly shopping experience with detailed product descriptions, images, and secure checkout options.
              </p>
            </div>

            {/* Purpose Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h3>
              <p className="text-gray-600 leading-relaxed">
                The main purpose of this website is to connect pet owners with high-quality products in one place, saving them time and effort. It aims to support responsible pet ownership by making essential supplies easily accessible online.
              </p>
            </div>

            {/* Goals Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Goals</h3>
              <ul className="text-gray-600 leading-relaxed space-y-3">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <span>Provide a seamless and enjoyable online shopping experience for pet lovers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <span>Promote the well-being and happiness of pets through trusted and affordable products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <span>Help local pet shops expand their reach through digital presence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <span>Build a community of passionate pet owners who value quality care and comfort for their animals</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">2k+</div>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">72</div>
            <p className="text-gray-600">Brands</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1.8k+</div>
            <p className="text-gray-600">Products</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">28</div>
            <p className="text-gray-600">Years in business</p>
          </div>
        </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div 
                key={member._id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23fed7aa" width="400" height="400"/%3E%3Ctext fill="%23f97316" font-family="sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-3">{member.role}</p>
                  {member.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{member.description}</p>
                  )}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    {member.instagram && (
                      <a 
                        href={member.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                        title="Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {member.facebook && (
                      <a 
                        href={member.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-2 rounded-lg bg-blue-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                        title="Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {member.whatsapp && (
                      <a 
                        href={member.whatsapp} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-2 rounded-lg bg-green-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                        title="WhatsApp"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No team members found.</p>
          </div>
        )}
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50">
        {/* Decorative background elements */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-yellow-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="text-primary font-semibold mb-3 uppercase tracking-wider text-sm">Testimonials</div>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              What people say about us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>

          {loadingTestimonials ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
          ) : errorTestimonials ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{errorTestimonials}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
                {/* Quote icon */}
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                {/* Star rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < testimonials[currentTestimonialIndex].rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-700 text-xl md:text-2xl leading-relaxed text-center mb-8 font-light italic">
                  "{testimonials[currentTestimonialIndex].text}"
                </p>

                {/* Customer info */}
                <div className="flex items-center justify-center gap-4 pb-4 border-b border-gray-100">
                  {testimonials[currentTestimonialIndex].avatar ? (
                    <img
                      src={testimonials[currentTestimonialIndex].avatar}
                      alt={testimonials[currentTestimonialIndex].name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-orange-100"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle fill="%23fed7aa" cx="50" cy="50" r="50"/%3E%3Ctext fill="%23f97316" font-family="sans-serif" font-size="40" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dy=".35em"%3E' + testimonials[currentTestimonialIndex].name.charAt(0) + '%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-orange-100">
                      {testimonials[currentTestimonialIndex].name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonialIndex].name}</p>
                    <p className="text-orange-600 text-sm font-medium">Verified Customer</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button 
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={testimonials.length <= 1}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  
                  {testimonials.length > 1 && (
                    <div className="flex gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonialIndex(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === currentTestimonialIndex
                              ? 'bg-orange-500 w-8'
                              : 'bg-gray-300 hover:bg-orange-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={testimonials.length <= 1}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {testimonials.length > 1 && (
                  <p className="text-center text-gray-500 text-sm mt-4">
                    {currentTestimonialIndex + 1} of {testimonials.length} reviews
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No testimonials available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
