import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileOrderOpen, setIsMobileOrderOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileOrderOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className={`bg-white fixed w-full top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-2xl' : 'shadow-md'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo - Responsive sizing */}
          <Link to="/" className="shrink-0 z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src="/logo.png" 
              alt="India Restaurant Logo" 
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-all duration-300" 
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <Link 
              to="/" 
              className={`px-3 py-2 text-gray-700 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 ${
                isActivePath('/') ? 'text-orange-500 bg-orange-50' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`px-3 py-2 text-gray-700 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 ${
                isActivePath('/menu') ? 'text-orange-500 bg-orange-50' : ''
              }`}
            >
              Menu
            </Link>

            {/* Desktop Order Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsOrderDropdownOpen(true)}
              onMouseLeave={() => setIsOrderDropdownOpen(false)}
            >
              <button 
                className={`px-3 py-2 text-gray-700 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 flex items-center gap-1 ${
                  isActivePath('/order') || isActivePath('/order-tracking') ? 'text-orange-500 bg-orange-50' : ''
                }`}
                aria-expanded={isOrderDropdownOpen}
                aria-haspopup="menu"
                onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
              >
                Order
                <svg 
                  className={`size-4 transition-transform duration-200 ${isOrderDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu with padding bridge to prevent gaps */}
              <div 
                className={`absolute start-0 mt-1 w-48 transition-all duration-200 ${
                  isOrderDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                {/* Invisible bridge to prevent hover gaps */}
                <div className="h-1 -mt-1" />
                
                <div className="bg-white rounded-lg shadow-xl ring-1 ring-black/5 overflow-hidden">
                  <Link 
                    to="/order" 
                    className={`block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150 ${
                      isActivePath('/order') ? 'bg-orange-50 text-orange-500' : ''
                    }`}
                    onClick={() => setIsOrderDropdownOpen(false)}
                  >
                    Order Page
                  </Link>
                  <Link 
                    to="/order-tracking" 
                    className={`block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150 ${
                      isActivePath('/order-tracking') ? 'bg-orange-50 text-orange-500' : ''
                    }`}
                    onClick={() => setIsOrderDropdownOpen(false)}
                  >
                    Order Tracking
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              to="/gallery" 
              className={`px-3 py-2 text-gray-700 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 ${
                isActivePath('/gallery') ? 'text-orange-500 bg-orange-50' : ''
              }`}
            >
              Gallery
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 text-gray-700 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 ${
                isActivePath('/contact') ? 'text-orange-500 bg-orange-50' : ''
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button - Larger touch target */}
          <button 
            className="lg:hidden text-gray-700 hover:text-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-lg p-2 transition-colors duration-200 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="size-6 sm:size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-6 sm:size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu - Full screen overlay on small devices */}
        <div 
          className={`lg:hidden fixed inset-0 bg-white transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'top-14 sm:top-16 md:top-20 opacity-100' 
              : 'top-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain pb-20">
            <div className="px-4 py-6 space-y-2">
              <Link 
                to="/" 
                className={`block px-4 py-3 min-h-12 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-all duration-200 flex items-center ${
                  isActivePath('/') ? 'bg-orange-50 text-orange-500 border-s-4 border-orange-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                to="/menu" 
                className={`block px-4 py-3 min-h-12 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-all duration-200 flex items-center ${
                  isActivePath('/menu') ? 'bg-orange-50 text-orange-500 border-s-4 border-orange-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>

              {/* Mobile Order Dropdown */}
              <div>
                <button
                  className={`w-full block px-4 py-3 min-h-12 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-all duration-200 flex justify-between items-center ${
                    (isActivePath('/order') || isActivePath('/order-tracking')) && !isMobileOrderOpen
                      ? 'bg-orange-50 text-orange-500 border-s-4 border-orange-500' 
                      : ''
                  }`}
                  onClick={() => setIsMobileOrderOpen(!isMobileOrderOpen)}
                >
                  <span>Order</span>
                  <svg 
                    className={`size-5 transition-transform duration-200 ${isMobileOrderOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mobile Submenu with smooth transition */}
                <div 
                  className={`grid transition-all duration-300 ${
                    isMobileOrderOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ms-4 mt-2 space-y-2">
                      <Link 
                        to="/order" 
                        className={`block px-4 py-3 min-h-11 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors duration-150 ${
                          isActivePath('/order') ? 'bg-orange-50 text-orange-500' : ''
                        }`}
                        onClick={() => {
                          setIsMobileOrderOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Order Page
                      </Link>
                      <Link 
                        to="/order-tracking" 
                        className={`block px-4 py-3 min-h-11 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors duration-150 ${
                          isActivePath('/order-tracking') ? 'bg-orange-50 text-orange-500' : ''
                        }`}
                        onClick={() => {
                          setIsMobileOrderOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Order Tracking
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link 
                to="/gallery" 
                className={`block px-4 py-3 min-h-12 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-all duration-200 flex items-center ${
                  isActivePath('/gallery') ? 'bg-orange-50 text-orange-500 border-s-4 border-orange-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              
              <Link 
                to="/contact" 
                className={`block px-4 py-3 min-h-12 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-all duration-200 flex items-center ${
                  isActivePath('/contact') ? 'bg-orange-50 text-orange-500 border-s-4 border-orange-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 top-14 sm:top-16 md:top-20"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;