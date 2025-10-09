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
    <div className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="absolute top-10 left-80 w-40 h-40 bg-gradient-to-bl from-[#F87537] to-[#FBA81F] rounded-full opacity-60 wavebox"></div>

      <div className="absolute bottom-20 left-40 w-24 h-24 bg-orange-400 rounded-full opacity-60"></div>
      <div className="absolute top-1/4 left-1/3 w-32 h-32 opacity-30">
        <svg viewBox="0 0 100 100" className="text-gray-400">
          <path d="M50 10 L60 30 L50 50 L40 30 Z" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            {smallTitle && (
              <div className="text-orange-500 font-medium mb-4">{smallTitle}</div>
            )}
                  <img src={nesr} className="absolute top-30 right-0  "/>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb -6 relative z-10">
              {title}
              {subtitle && <><br />{subtitle}</>}
            </h1>
            <p className="text-gray-600 mb-8 text-lg max-w-md relative z-10">
              {description}
            </p>
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                {buttonText}
              </button>
            )}
          </div>

          <div className="relative">
            <div className="heroImage">
              <img src={bgHero} alt='heroBg' className='bgHero absolute [top:50px] inset-0 z-10 transform [scale:1.1] lg:[scale:1.3]' />
              <img src={headerImg} alt="Hero" className="w-full h-full object-contain heroDog"  />
            </div>
          </div>
           
        </div>
      </div>
    </div>
  );
}
