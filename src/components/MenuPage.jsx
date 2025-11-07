import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const tableNumber = searchParams.get('table');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchMenuItems();
    updateCartCount();
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching menu from:', `${API_URL}/menu`);
      const response = await axios.get(`${API_URL}/menu`);
      if (response.data.success) {
        const items = response.data.data;
        console.log('✅ Menu items loaded:', items);
        
        // Debug first item structure
        if (items.length > 0) {
          console.log('🔍 First item:', items[0]);
          console.log('🔍 First item keys:', Object.keys(items[0]));
          console.log('🔍 id value:', items[0].id);
          console.log('🔍 id type:', typeof items[0].id);
        }
        
        setMenuItems(items);
      }
    } catch (err) {
      setError('Failed to load menu items');
      console.error('❌ Menu fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(menuItems.map(item => item.category).filter(Boolean))];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems.filter(item => item.isAvailable)
    : menuItems.filter(item => item.category === selectedCategory && item.isAvailable);

  const handleAddToCart = (item) => {
    console.log('➕ Adding item to cart:', item);
    console.log('Full item object:', JSON.stringify(item, null, 2));
    
    // API returns 'id' field, not '_id'
    const itemId = item.id || item._id;
    console.log('Item ID:', itemId);
    
    // Validate item has an ID
    if (!itemId) {
      console.error('❌ Item missing ID:', item);
      console.error('Available keys:', Object.keys(item));
      alert('Error: Cannot add item without ID. Check console for details.');
      return;
    }
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('Current cart:', existingCart);
    
    // Use 'id' consistently since that's what the API returns
    const existingItem = existingCart.find(cartItem => cartItem.id === itemId);
    let updatedCart;
    
    if (existingItem) {
      // Update quantity of existing item
      updatedCart = existingCart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      console.log('📦 Updated existing item quantity');
    } else {
      // Add new item with all necessary fields - use 'id' field
      const cartItem = {
        id: itemId, // Use 'id' to match API response
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        imageUrl: item.imageUrl,
        quantity: 1
      };
      updatedCart = [...existingCart, cartItem];
      console.log('✅ Added new item to cart:', cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('💾 Cart saved:', updatedCart);
    
    // Update cart count
    updateCartCount();
    
    // Redirect to order page with table number
    if (tableNumber) {
      navigate(`/order?table=${tableNumber}`);
    } else {
      navigate('/order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button 
          onClick={fetchMenuItems}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Hero Image Banner Section */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop" 
          alt="Restaurant food banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex flex-col items-center justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Our Menu
          </h1>
          <div className="flex items-center gap-3 text-white text-base sm:text-lg">
            <span className="hover:text-gray-200 transition-colors cursor-pointer">Home</span>
            <span className="text-xl">›</span>
            <span className="font-semibold text-gray-200">Menu</span>
          </div>
        </div>
      </div>

      {/* Header with Cart Button */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {tableNumber && (
              <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full">
                <span className="text-xs sm:text-sm text-indigo-600 font-semibold">Table {tableNumber}</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => navigate(tableNumber ? `/order?table=${tableNumber}` : '/order')}
            className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative text-lg sm:text-xl animate-bounce">🛒</span>
            <span className="relative font-bold text-sm sm:text-base tracking-wide">View Cart</span>
            {cartCount > 0 && (
              <div className="relative ml-1 bg-white text-orange-600 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold shadow-md animate-pulse">
                {cartCount}
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-300 snap-start flex-shrink-0 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg scale-105 ring-2 ring-purple-300'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id || item._id} 
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100"
            >
              {item.imageUrl && (
                <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {item.category && (
                    <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/95 backdrop-blur-sm text-gray-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold shadow-md uppercase tracking-wide">
                      {item.category}
                    </span>
                  )}
                </div>
              )}
              <div className="p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-1">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="text-6xl sm:text-7xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg sm:text-xl font-medium">No items available in this category</p>
            <p className="text-gray-400 text-sm mt-2">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;