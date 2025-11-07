import React from 'react';

const OurSpeciality = () => {
  const specialities = [
    {
      id: 1,
      name: 'Mughlai',
      image: '/images/mughlai.jpg',
      alt: 'Mughlai Biryani'
    },
    {
      id: 2,
      name: 'Indian',
      image: '/images/indian.jpg',
      alt: 'Indian Curry'
    },
    {
      id: 3,
      name: 'Chinese',
      image: '/images/chinese.jpg',
      alt: 'Chinese Chilli'
    }
  ];

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-3 sm:mb-4 px-4">
            Our Speciality
          </h2>
          <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-400"></div>
          </div>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
            We provide a wide range of cuisines and dishes to choose from so that every foodie in town has their best experience with us.
          </p>
        </div>

        {/* Speciality Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {specialities.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300"></div>
              
              {/* Text - appears on hover on desktop, always visible on mobile */}
              <div className="absolute inset-0 flex items-end justify-center pb-6 sm:pb-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif drop-shadow-lg">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSpeciality;