import React, { useState } from 'react';

const Navbar = () => {
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileOrderOpen, setIsMobileOrderOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img 
                src="/logo.png" 
                alt="India Restaurant Logo" 
                className="h-12 sm:h-16 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {/* Home */}
            <a 
              href="/" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 text-sm xl:text-base"
            >
              Home
            </a>

            {/* Menu */}
            <a 
              href="/menu" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 text-sm xl:text-base"
            >
              Menu
            </a>

            {/* Order with Dropdown */}
            <div 
              className="relative group"
            >
              <button 
                onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
                onMouseEnter={() => setIsOrderDropdownOpen(true)}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center text-sm xl:text-base focus:outline-none py-2"
              >
                Order
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOrderDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isOrderDropdownOpen && (
                <div 
                  className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                  onMouseEnter={() => setIsOrderDropdownOpen(true)}
                  onMouseLeave={() => setIsOrderDropdownOpen(false)}
                >
                  <a 
                    href="/order" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
                  >
                    Order Page
                  </a>
                  <a 
                    href="/order-tracking" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
                  >
                    Order Tracking
                  </a>
                </div>
              )}
            </div>

            {/* Gallery */}
            <a 
              href="/gallery" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 text-sm xl:text-base"
            >
              Gallery
            </a>

            {/* Contact Us */}
            <a 
              href="/contact" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 text-sm xl:text-base"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              className="text-gray-700 hover:text-orange-500 focus:outline-none p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-gray-100">
            <a 
              href="/" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            
            <a 
              href="/menu" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menu
            </a>
            
            {/* Mobile Order Dropdown */}
            <div>
              <button 
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-200 flex items-center justify-between"
                onClick={() => setIsMobileOrderOpen(!isMobileOrderOpen)}
              >
                Order
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isMobileOrderOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMobileOrderOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  <a 
                    href="/order" 
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Order Page
                  </a>
                  <a 
                    href="/order-tracking" 
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Order Tracking
                  </a>
                </div>
              )}
            </div>
            
            <a 
              href="/gallery" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </a>
            
            <a 
              href="/contact" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;