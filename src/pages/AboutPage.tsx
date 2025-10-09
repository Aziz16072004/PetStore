import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import headerImg from '../assets/vecteezy_adorable-fluffy-kitten-high-quality-transparent-for-pet-lovers_58289536.png';
import bgHero from '../assets/HomePageImage.png';
import nesr from '../assets/nesr.png';
export default function AboutPage() {
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold mb-8">About our store</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-gray-600 mb-6">
              At et vehicula sodales est proin turpis pellentesque similia a aliquam amet rhoncus quisque eget et. Facilisis socisolis faucilisestib et amet, velit id vestibulum duis sed a. Vitae, nibh at eget sit arcelentos sollens
            </p>
            <p className="text-gray-600">
              Vulputate consequat tempor sodales acilla et suspendisse sed diamreco erat porttitor nisi. Semper et congue intemp pultinice sit at in vestibulum nunc, tincidunt lorem.
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              Aliquam ultricies nunc arcu gravida. Faucibus sodales congue in magna euismod molestie augue. Semis lacus quisque at aliquiat quisque placerat egestas. Viverra aulia fermentum dictue urna ultrula enim ornare estebidum prellentrisque aulla. Nulls pede commodo et ut lectus quis tortor id sed at nec...
            </p>
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
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden h-96 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>

          <div>
            <h2 className="text-4xl font-bold mb-6">Taylor Joshua</h2>
            <p className="text-gray-600 mb-4">Founder</p>
            <p className="text-gray-600 mb-6">
              Nam nunc vitae Integer rhoncus ultricies eget in pnellentesque ert. Scelerisque masta pellentesque aliquet placerat. Fugler etiam rum volatum at enim massa neque magna sapien.
            </p>
            <p className="text-gray-600 mb-6">
              Ex proin nonnummy molestie sit at tempus leo Itaque tempus aliquam aliquet. Nless arcu gravida. Faucibus sodales congue or a magna magna euismod steloque semis aliquet eraque eraque cursus at amet, velit nunc amus cursus vel arius. Nises arcu sdales Curabitur vel erit...
            </p>
            <div className="mt-8">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='50' viewBox='0 0 120 50'%3E%3Ctext x='10' y='35' font-family='Brush Script MT, cursive' font-size='30' fill='%23000'%3EJoshua%3C/text%3E%3C/svg%3E"
                alt="Signature"
                className="h-12"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="rounded-2xl overflow-hidden mb-6 h-80 bg-gradient-to-br from-yellow-300 via-orange-300 to-orange-400"></div>
            <h3 className="text-xl font-bold mb-2">Caroline Washington</h3>
            <p className="text-gray-600">Sales</p>
          </div>
          <div className="text-center">
            <div className="rounded-2xl overflow-hidden mb-6 h-80 bg-gradient-to-br from-teal-300 via-cyan-400 to-blue-400"></div>
            <h3 className="text-xl font-bold mb-2">Gerald Ferguson</h3>
            <p className="text-gray-600">Admin</p>
          </div>
          <div className="text-center">
            <div className="rounded-2xl overflow-hidden mb-6 h-80 bg-gradient-to-br from-pink-300 via-red-400 to-pink-500"></div>
            <h3 className="text-xl font-bold mb-2">Axeel Maddox</h3>
            <p className="text-gray-600">Sales</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-primary font-medium mb-4">Testimonials</div>
            <h2 className="text-4xl font-bold mb-8">What people say about us</h2>
            <p className="text-gray-600 mb-6">
              Morbi viverra vehicula in eros amet et le leo tellus. Nunc porta condimentum diam eget ut mauris et vitae interdum eget nam. Pulvinar condimentum ultricies tellus a arcu pellentesque pede pellentesque. Aliquam et massa ut massa vitella tellula denim ac enim. Praesent adipiscing cursus...
            </p>
            <div className="mb-6">
              <p className="font-bold mb-1">Gerald Ferguson</p>
              <p className="text-gray-600 text-sm">Customer</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full transform scale-90 opacity-80"></div>
            <div className="relative z-10 flex items-center justify-center h-96"></div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-2xl overflow-hidden h-96 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 flex items-center justify-center">
          <button className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
            <Play className="w-8 h-8 ml-1" fill="white" />
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Follow our instagram</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-lg bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400"></div>
          <div className="aspect-square rounded-lg bg-gradient-to-br from-green-400 via-teal-400 to-green-600"></div>
          <div className="aspect-square rounded-lg bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400"></div>
          <div className="aspect-square rounded-lg bg-gradient-to-br from-green-300 via-teal-300 to-gray-400"></div>
        </div>
      </section>
    </div>
  );
}
