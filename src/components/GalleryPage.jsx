import React from 'react'

const GalleryPage = () => {
  // Replace these paths with your actual image imports or URLs
  const galleryItems = [
    {
      id: 1,
      image: '/images/slide-1.jpg', // Replace with your image path
      alt: 'Fried Chicken'
    },
    {
      id: 2,
      image: '/images/slide-2.jpg',
      alt: 'Paneer Curry'
    },
    {
      id: 3,
      image: '/images/slide-3.jpg',
      alt: 'Chicken Tikka'
    },
    {
      id: 4,
      image: '/images/slide-4.jpg',
      alt: 'Wrap Roll'
    },
    {
      id: 5,
      image: '/images/slide-5.jpg',
      alt: 'Biryani'
    },
    {
      id: 6,
      image: '/images/chinese.jpg',
      alt: 'Curry Bowl'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[500px] w-full overflow-hidden">
        <img
          src="/images/indian.jpg" // Replace with your hero image path
          alt="Gallery Hero"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-3 md:mb-4 text-center">
            Our Gallery
          </h1>
          <div className="flex items-center gap-2 text-white text-sm md:text-base">
            <span className="hover:underline cursor-pointer">Home</span>
            <span>›</span>
            <span>Gallery</span>
          </div>
        </div>
      </div>

      {/* Gallery Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-100"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryPage