import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const tableNumber = searchParams.get('table');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchMenuItems();
  }, []);

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
          console.log('🔍 _id value:', items[0]._id);
          console.log('🔍 _id type:', typeof items[0]._id);
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
    
    // Handle both _id and id fields (MongoDB ObjectId vs regular id)
    const itemId = item._id || item.id;
    console.log('Item ID:', itemId);
    console.log('Item _id:', item._id);
    console.log('Item id:', item.id);
    
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
    
    const existingItem = existingCart.find(cartItem => cartItem._id === itemId);
    let updatedCart;
    
    if (existingItem) {
      // Update quantity of existing item
      updatedCart = existingCart.map(cartItem => 
        cartItem._id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      console.log('📦 Updated existing item quantity');
    } else {
      // Add new item with all necessary fields
      const cartItem = {
        _id: itemId, // Use the ID we found (either _id or id)
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
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
            {tableNumber && (
              <p className="text-sm text-indigo-600 font-semibold mt-1">Table {tableNumber}</p>
            )}
          </div>
          <button 
            onClick={() => navigate(tableNumber ? `/order?table=${tableNumber}` : '/order')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-xl">🛒</span>
            <span className="font-semibold">View Cart</span>
          </button>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item._id} 
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {item.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.category && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  )}
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${item.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No items available in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;