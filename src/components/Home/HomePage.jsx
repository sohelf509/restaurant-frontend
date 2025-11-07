import React, { useState, useEffect } from 'react';
import Hero from './Hero.jsx';
import OurSpeciality from './OurSpeciality.jsx';
import Testimonials from './Testimonials.jsx';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { 
      id: 1, 
      image: '/images/slide-1.jpg',
      subtitle: 'When Flavours meet Passion, Magic happens.',
      title: 'Come Join Us For A Magical Experience.'
    },
    { 
      id: 2, 
      image: '/images/slide-2.jpg',
      subtitle: 'Experience Authentic Indian Cuisine',
      title: 'Taste The Traditional Flavors.'
    },
    { 
      id: 3, 
      image: '/images/slide-3.jpg',
      subtitle: 'Fresh Ingredients Daily',
      title: 'Quality You Can Taste.'
    },
    { 
      id: 4, 
      image: '/images/slide-4.jpg',
      subtitle: 'Perfect For Any Occasion',
      title: 'Dine With Us Today.'
    },
    { 
      id: 5, 
      image: '/images/slide-5.jpg',
      subtitle: 'Fast & Convenient',
      title: 'Order Online For Delivery.'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <>
      {/* Slider Section */}
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-screen">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-opacity-40" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 md:mb-4 font-light max-w-3xl">
                  {slide.subtitle}
                </p>
                <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 max-w-5xl leading-tight">
                  {slide.title}
                </h1>
                <a 
                  href="/menu" 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-medium transition-colors shadow-lg rounded"
                >
                  View Menu
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl font-thin hover:text-orange-500 transition-colors z-10 focus:outline-none"
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl font-thin hover:text-orange-500 transition-colors z-10 focus:outline-none"
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 sm:h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-orange-600 w-6 sm:w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-80 w-2.5 sm:w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Our Speciality Section */}
      <OurSpeciality />
      
      {/* Testimonials Section */}
      <Testimonials />

    </>
  );
};

export default HomePage;