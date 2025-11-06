import { MapPin, Mail, Phone, Clock, Send, CheckCircle, AlertCircle, Loader2, Package } from 'lucide-react';
import { useState } from 'react';
import headerImg from '../assets/vecteezy_hamster-with_24704812.png';
import bgHero from '../assets/HomePageImage.png';
import contactMapImage from '../assets/image.png';
import nesr from '../assets/nesr.png';
import { API_BASE_URL } from '../config/api';

interface FormData {
  subject: string;
  message: string;
  customerEmail: string;
  customerName: string;
  orderId: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

interface FormErrors {
  subject?: string;
  message?: string;
  customerEmail?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    message: '',
    customerEmail: '',
    customerName: '',
    orderId: '',
    priority: 'normal'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showOrderId, setShowOrderId] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const requestBody: any = {
        subject: formData.subject,
        message: formData.message,
        customerEmail: formData.customerEmail,
        priority: formData.priority
      };

      // Add optional fields only if they have values
      if (formData.customerName.trim()) {
        requestBody.customerName = formData.customerName;
      }
      if (formData.orderId.trim()) {
        requestBody.orderId = formData.orderId;
      }

      const response = await fetch(`${API_BASE_URL}/support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          subject: '',
          message: '',
          customerEmail: '',
          customerName: '',
          orderId: '',
          priority: 'normal'
        });
        setMessageLength(0);
        setShowOrderId(false);
        setErrors({});
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, message: value });
    setMessageLength(value.length);
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
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Contact Support</h2>
              <p className="text-gray-600">
                Have a question or need assistance? Send us a message and our support team will get back to you.
              </p>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">Message sent successfully!</p>
                  <p className="text-green-700 text-sm">We'll respond within 24 hours.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">Failed to send message</p>
                  <p className="text-red-700 text-sm">Please try again or contact us directly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Subject */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.subject 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-primary focus:ring-orange-200'
                  }`}
                  maxLength={200}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Your Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary focus:ring-orange-200"
                />
              </div>

              {/* Email Address */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.customerEmail 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-primary focus:ring-orange-200'
                  }`}
                />
                {errors.customerEmail && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.customerEmail}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as FormData['priority'] })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary focus:ring-orange-200"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Order ID Toggle */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOrderId}
                    onChange={(e) => setShowOrderId(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Related to an order?
                  </span>
                </label>
              </div>

              {/* Order ID (conditional) */}
              {showOrderId && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Order ID</label>
                  <input
                    type="text"
                    placeholder="ORD-12345"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary focus:ring-orange-200"
                  />
                </div>
              )}

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Please describe your issue or question in detail..."
                  value={formData.message}
                  onChange={handleMessageChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-colors ${
                    errors.message 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-primary focus:ring-orange-200'
                  }`}
                  maxLength={2000}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Minimum 10 characters</p>
                  )}
                  <p className={`text-sm ${messageLength > 2000 ? 'text-red-600' : 'text-gray-500'}`}>
                    {messageLength}/2000
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-8">Feel free to contact us</h2>
            <p className="text-gray-600 mb-8">
              At et vehicula sodales est proin turpis pellentesque similia a aliquam amet rhoncus quisque eget et. Socilis blendit at pellentesque aliquat et quisque tortor laculia nullam
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">4421 oued guriena , Manouba , Tunis</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">mouhamedazizchaabani@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">+216 50-551-663</p>
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

            {/* FAQ Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">How long does shipping take?</h4>
                  <p className="text-sm text-gray-600">Standard shipping takes 3-5 business days.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What is your return policy?</h4>
                  <p className="text-sm text-gray-600">We accept returns within 30 days of purchase.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Do you ship internationally?</h4>
                  <p className="text-sm text-gray-600">Yes, we ship to most countries worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={contactMapImage} 
            alt="Our location" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href="https://maps.app.goo.gl/LPSs63GWSbvspWTu5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open location in Google Maps"
              className="group"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg animate-bounce transition-transform group-hover:scale-110">
                <MapPin className="w-6 h-6" />
              </div>
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
}
