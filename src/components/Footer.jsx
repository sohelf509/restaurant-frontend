import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                NextGen
              </h2>
              <p className="text-orange-500 text-xs sm:text-sm tracking-widest uppercase">
                Restaurant
              </p>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-4 sm:mb-6">
              Experience authentic Indian flavors crafted with passion and tradition. We bring you the finest culinary journey that celebrates the rich heritage of Indian cuisine.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              <a 
                href="#" 
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-orange-500 rounded flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="#" 
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-orange-500 rounded flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a 
                href="#" 
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-orange-500 rounded flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Our Addresses */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Our Addresses</h3>
            <div className="space-y-4 sm:space-y-6 text-sm">
              <div>
                <p className="text-gray-400 leading-relaxed">
                  123, Park Street, Central Area,<br />
                  Mumbai - 400001
                </p>
              </div>
              <div>
                <p className="text-gray-400 leading-relaxed">
                  456, MG Road, Business District,<br />
                  Delhi - 110002
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Business Hours</h3>
            <div className="space-y-1.5 sm:space-y-2 text-sm">
              <p className="text-gray-400">Mon: 11:00 AM – 11:00 PM</p>
              <p className="text-gray-400">Tue: 11:00 AM – 11:00 PM</p>
              <p className="text-gray-400">Wed: 11:00 AM – 11:00 PM</p>
              <p className="text-gray-400">Thu: 11:00 AM – 11:00 PM</p>
              <p className="text-gray-400">Fri: 11:00 AM – 11:00 PM</p>
              <p className="text-gray-400">Sat: 11:00 AM – 11:00 PM</p>
              <p className="text-gray-400">Sun: 11:00 AM – 11:00 PM</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contact Details</h3>
            <div className="space-y-4 sm:space-y-6">
              {/* Location 1 */}
              <div>
                <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Mumbai</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400 flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="break-all">+91 9876543210</span>
                  </p>
                  <p className="text-gray-400 flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="break-all">+91 9876543211</span>
                  </p>
                </div>
              </div>

              {/* Location 2 */}
              <div>
                <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Delhi</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400 flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="break-all">+91 8765432109</span>
                  </p>
                  <p className="text-gray-400 flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="break-all">+91 8765432108</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Decorative fork and knife icon */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
            </svg>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-3 sm:mb-4 text-xs sm:text-sm">
            <a href="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</a>
            <a href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a>
            <a href="/menu" className="text-gray-400 hover:text-orange-500 transition-colors">Menu</a>
            <a href="/gallery" className="text-gray-400 hover:text-orange-500 transition-colors">Gallery</a>
            <a href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact Us</a>
          </nav>

          {/* Copyright */}
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © 2025 Next Restaurant. | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;