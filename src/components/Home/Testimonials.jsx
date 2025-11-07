import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Quality food with best ambience and a good taste of Mughals food. Note for vegetarians. Best place for family dinner and lunch.",
      name: "Sandeep Farma",
      avatar: "/images/avatar1.jpg"
    },
    {
      id: 2,
      rating: 4,
      text: "The best biryani. Excellent taste.",
      name: "Aaquid Nasim",
      avatar: "/images/avatar2.jpg"
    },
    {
      id: 3,
      rating: 4,
      text: "We've been there last year during puja after lockdown. Their biriyani is like mouthwatering. Perfect in quality and quantity.",
      name: "Arindam Goswami",
      avatar: "/images/avatar3.jpg"
    }
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="text-yellow-400 text-base sm:text-lg md:text-xl">
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/testimonial-bg.jpg')`
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-70"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <p className="text-orange-400 text-xs sm:text-sm md:text-base font-medium mb-2">
            People Talk
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-3 sm:mb-4 px-4">
            Our Testimonial
          </h2>
          <div className="flex justify-center">
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-400"></div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Border decoration */}
              <div className="border-2 border-orange-300 rounded-lg p-4 sm:p-5 md:p-6">
                {/* Stars */}
                <div className="flex justify-center mb-3 sm:mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 text-center text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6 min-h-[100px] sm:min-h-[110px] md:min-h-[120px]">
                  "{testimonial.text}"
                </p>

                {/* Avatar with ribbon */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-2 sm:mb-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-orange-400"
                    />
                    {/* Ribbon decoration */}
                    <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2">
                      <svg width="24" height="12" viewBox="0 0 30 15" fill="none" className="sm:w-[28px] sm:h-[14px] md:w-[30px] md:h-[15px]">
                        <path d="M0 0 L15 10 L30 0 L25 15 L15 12 L5 15 Z" fill="#f59e0b"/>
                      </svg>
                    </div>
                  </div>

                  {/* Name */}
                  <h4 className="text-gray-800 font-semibold text-base sm:text-lg md:text-lg">
                    {testimonial.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-2 sm:space-x-3">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-orange-500 w-6 sm:w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-80 w-2 sm:w-3'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;