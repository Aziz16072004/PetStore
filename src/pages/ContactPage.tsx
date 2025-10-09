import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import headerImg from '../assets/vecteezy_hamster-with_24704812.png';
import bgHero from '../assets/HomePageImage.png';
import MapView from '../components/MapView.tsx';
import useGeolocation from "./hooks/useGeolocation";
import nesr from '../assets/nesr.png';
export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Latitude:", pos.coords.latitude);
        console.log("Longitude:", pos.coords.longitude);
      },
      (err) => console.error(err)
    );
  }, []);
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
              <p className="text-gray-600 mb-8 text-lg relative z-10">
                At et vehicula sodales est proin turpis pellentesque similia a aliquam amet rhoncus quisque eget et
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Shop Now
              </button>
            </div>

            <div className="relative">
            <div className="heroImage">
              <img src={bgHero} alt='heroBg' className='bgHero absolute [top:20px] inset-0 z-10 transform [scale:1.0]' />
              <img src={headerImg} alt="Hero" className="[scale:.6] object-contain heroDog "  />
            </div>
          </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="E-mail address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-8">Feel free to contact us</h2>
            <p className="text-gray-600 mb-8">
              At et vehicula sodales est proin turpis pellentesque similia a aliquam amet rhoncus quisque eget et. Socilis blendit at pellentesque aliquat et quisque tortor laculia nullam
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">8592 Fairground St.Tallahassee, FL 32303</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">rgarton@outlook.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">+775 378-6348</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">Mon - Fri: 10AM - 10PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MapView/>
      
    </div>
  );
}
