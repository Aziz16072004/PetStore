import headerImg from '../assets/Untitled_design__2_-removebg-preview.png';
import bgHero from '../assets/HomePageImage.png';
import nesr from '../assets/nesr.png';
interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  smallTitle?: string;
}

export default function Hero({ title, subtitle, description, buttonText, onButtonClick, smallTitle }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-orange-50/30 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-80 w-40 h-40 bg-gradient-to-bl from-[#F87537] to-[#FBA81F] rounded-full opacity-60 wavebox animate-float"></div>
      <div className="absolute bottom-20 left-40 w-24 h-24 bg-orange-400 rounded-full opacity-60 animate-bounce-slow"></div>
      <div className="absolute top-1/4 right-20 w-32 h-32 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-orange-300 rounded-full opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="animate-slide-up">
            {smallTitle && (
              <div className="inline-block text-orange-500 font-semibold mb-4 px-4 py-2 bg-orange-100 rounded-full text-sm">
                {smallTitle}
              </div>
            )}
            <img
              src={nesr}
              className="absolute top-30 right-0 opacity-20 lg:opacity-30"
              alt="decoration"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 30vw, 20vw"
            />

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6 relative z-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {title}
              {subtitle && <><br /><span className="text-primary">{subtitle}</span></>}
            </h1>
            <p className="text-gray-600 mb-8 text-base sm:text-lg max-w-md relative z-10 leading-relaxed">
              {description}
            </p>
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="group bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl hover:shadow-glow transition-all duration-300 font-semibold text-lg transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
              >
                {buttonText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            )}
          </div>

          <div className="relative animate-fade-in">
            <div className="heroImage relative">
              {/* Decorative glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl scale-75"></div>
              <img
                src={bgHero}
                alt='heroBg'
                className='bgHero absolute [top:50px] inset-0 z-10 transform [scale:1.1] lg:[scale:1.3] animate-float'
                loading="eager"
                decoding="async"
                sizes="100vw"
              />
              <img
                src={headerImg}
                alt="Hero"
                className="w-full h-full object-contain heroDog relative z-20 drop-shadow-2xl"
                loading="eager"
                decoding="async"
                sizes="(max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
