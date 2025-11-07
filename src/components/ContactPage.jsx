import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&h=400&fit=crop')",
      }}>
        <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-serif text-white mb-4">Contact Us</h1>
          <p className="text-white text-lg">
            <span className="hover:underline cursor-pointer">Home</span> <span className="mx-2">›</span> <span>Contact Us</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Section - Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">NextGen Restaurant</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience authentic Indian flavors crafted with passion and tradition. We bring you the finest culinary journey that celebrates the rich heritage of Indian cuisine.
            </p>

            {/* Addresses */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Addresses</h3>
              <div className="space-y-3 text-gray-600">
                <p>123, Park Street, Central Area,<br />Mumbai - 400001</p>
                <p>456, MG Road, Business District,<br />Delhi - 110002</p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Mumbai</h4>
                <div className="space-y-1 text-gray-600">
                  <p>📞 +91 9876543210</p>
                  <p>📞 +91 9876543211</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Delhi</h4>
                <div className="space-y-1 text-gray-600">
                  <p>📞 +91 8765432109</p>
                  <p>📞 +91 8765432108</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Opening Times */}
          <div>
            <div className="bg-gray-900 text-white p-8 border-4 border-amber-600 rounded-lg">
              <h2 className="text-3xl font-serif text-center mb-8 border-b-2 border-amber-600 pb-4">
                Opening Times
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  { day: 'Mon:', time: '11:00 AM – 11:00 PM' },
                  { day: 'Tue:', time: '11:00 AM – 11:00 PM' },
                  { day: 'Wed:', time: '11:00 AM – 11:00 PM' },
                  { day: 'Thu:', time: '11:00 AM – 11:00 PM' },
                  { day: 'Fri:', time: '11:00 AM – 11:00 PM' },
                  { day: 'Sat:', time: '11:00 AM – 11:00 PM' },
                  { day: 'Sun:', time: '11:00 AM – 11:00 PM' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span className="text-gray-400">{item.day}</span>
                    <span className="text-white">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="text-center border-t-2 border-amber-600 pt-6">
                <p className="text-gray-400 text-sm mb-2">Call Us Now</p>
                <a href="tel:9876543210" className="text-3xl font-bold hover:text-amber-500 transition-colors">
                  9876543210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.0!2d72.83!3d18.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU1JzQ4LjAiTiA3MsKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NextGen Restaurant Location - Mumbai"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">NextGen Restaurant - Mumbai</h3>
            <p className="text-gray-600">123, Park Street, Central Area, Mumbai - 400001</p>
            <p className="text-gray-500 mt-2">⭐ Authentic Indian Cuisine</p>
            <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-amber-600 hover:text-amber-700 font-semibold">
              View larger map →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;