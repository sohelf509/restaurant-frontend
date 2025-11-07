import React from 'react';

const Hero = () => {
  return (
    <div 
      className="relative"
      style={{
        backgroundImage: `url('/images/food-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Main Hero Section with White Background Overlay */}
      <div className="relative min-h-screen bg-white flex items-center py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Text Content - Slides from Left */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center lg:text-left order-2 lg:order-1 animate-slide-in-left">
              <div className="inline-block">
                <p className="text-orange-500 font-semibold text-base sm:text-lg md:text-xl mb-2">Welcome To</p>
                <div className="flex justify-center lg:justify-start">
                  <div className="w-12 sm:w-14 md:w-16 h-0.5 bg-orange-400"></div>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 leading-tight px-2 sm:px-0">
                NextGen Restaurant
              </h1>
              
              <div className="flex justify-center lg:justify-start">
                <div className="w-20 sm:w-24 md:w-28 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
              </div>
              
              <div className="space-y-3 sm:space-y-4 text-gray-600 leading-relaxed px-2 sm:px-0">
                <p className="text-sm sm:text-base md:text-lg">
                  Experience the rich heritage of Indian cuisine in every bite. Our restaurant brings together traditional recipes passed down through generations with modern culinary techniques to create unforgettable dining moments.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg">
                  From aromatic biryanis to perfectly spiced curries, each dish is carefully crafted using the finest ingredients and authentic spices imported directly from India.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                  Whether you're craving classic North Indian delicacies or exploring regional specialties, our diverse menu offers something special for every palate. Join us for an authentic taste journey you won't forget.
                </p>
              </div>
            </div>
            
            {/* Image - Slides from Right */}
            <div className="order-1 lg:order-2 animate-slide-in-right px-2 sm:px-0">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl hover:scale-105 transition-transform duration-500">
                <img 
                  src="/Hero.jpg" 
                  alt="India Restaurant Interior" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Eat Good Feel Good Section - Reveals Background */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-opacity-60"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-light mb-2 sm:mb-3">
            We Create Delicious Memories
          </p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold px-4">
            Eat Good Feel Good
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;