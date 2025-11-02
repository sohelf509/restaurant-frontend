import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const tableNumber = searchParams.get('table');
  
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('dine-in');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('📦 Loaded cart from localStorage:', savedCart);
    
    // Normalize cart items - ensure they all have _id field
    const normalizedCart = savedCart.map(item => {
      const itemId = item._id || item.id;
      if (!itemId) {
        console.error('❌ Item missing ID:', item);
        return null;
      }
      return {
        ...item,
        _id: itemId // Ensure _id exists
      };
    }).filter(Boolean); // Remove any null items
    
    // Check for invalid items
    const invalidItems = normalizedCart.filter(item => !item._id);
    if (invalidItems.length > 0) {
      console.error('❌ Invalid items found:', invalidItems);
      setError('Your cart contains invalid items. Please clear it and try again.');
    }
    
    // Update cart if it was normalized
    if (normalizedCart.length !== savedCart.length || 
        JSON.stringify(normalizedCart) !== JSON.stringify(savedCart)) {
      console.log('🔄 Normalizing cart...');
      localStorage.setItem('cart', JSON.stringify(normalizedCart));
    }
    
    setCart(normalizedCart);
    
    // Fetch menu items
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      console.log('🔍 Fetching menu from:', `${API_URL}/menu`);
      const response = await axios.get(`${API_URL}/menu`);
      if (response.data.success) {
        setMenuItems(response.data.data.filter(item => item.isAvailable));
      }
    } catch (err) {
      setError('Failed to load menu items');
      console.error('❌ Menu fetch error:', err);
    }
  };

  const categories = ['all', ...new Set(menuItems.map(item => item.category).filter(Boolean))];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(cartItem => 
        cartItem._id === item._id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('✅ Item added to cart:', item.name);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      const updatedCart = cart.filter(item => item._id !== itemId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return;
    }
    
    const updatedCart = cart.map(item => 
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
      localStorage.removeItem('cart');
      setError(null);
      console.log('🗑️ Cart cleared');
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    console.log('🛒 Submitting order...');
    console.log('Cart:', cart);
    console.log('Table:', tableNumber);
    
    if (cart.length === 0) {
      setError('Please add items to your order');
      return;
    }

    if (!tableNumber) {
      setError('Table number is required');
      return;
    }

    // Validate all cart items have _id
    const invalidItems = cart.filter(item => !item._id);
    if (invalidItems.length > 0) {
      console.error('❌ Invalid items in cart:', invalidItems);
      setError('Some items in your cart are corrupted. Please clear your cart and add items again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        tableNumber: parseInt(tableNumber),
        customerName: customerName || 'Guest',
        orderType,
        items: cart.map(item => ({
          menuItem: item._id,
          quantity: item.quantity
        }))
      };

      console.log('📤 Sending order data:', orderData);
      console.log('🌐 To URL:', `${API_URL}/orders`);

      const response = await axios.post(`${API_URL}/orders`, orderData);
      
      console.log('✅ Order response:', response.data);
      
      if (response.data.success) {
        const orderId = response.data.data._id;
        localStorage.removeItem('cart');
        navigate(`/track-order/${orderId}`);
      }
    } catch (err) {
      console.error('❌ Order submission error:', err);
      console.error('❌ Error details:', err.response?.data);
      console.error('❌ Status code:', err.response?.status);
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          `Failed to place order (${err.response?.status || 'Network Error'})`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate(tableNumber ? `/?table=${tableNumber}` : '/')}
            className="text-white hover:text-gray-200 text-2xl"
          >
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {tableNumber ? `Order for Table ${tableNumber}` : 'Your Cart'}
            </h1>
            <p className="text-indigo-100">
              {tableNumber ? 'Review and place your order' : 'Add items and select table'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-red-700 font-semibold">{error}</p>
                {error.includes('corrupted') || error.includes('invalid') ? (
                  <button 
                    onClick={clearCart}
                    className="mt-2 text-red-600 underline hover:text-red-800 text-sm"
                  >
                    Clear Cart & Start Fresh
                  </button>
                ) : null}
              </div>
              <button onClick={() => setError(null)} className="text-red-700 font-bold text-xl ml-4">✕</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section - Browse & Add More Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add More Items</h2>
              
              {/* Category Filter */}
              <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Menu Items */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredItems.map(item => (
                  <div key={item._id} className="flex gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors group">
                    {item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        {item.category && (
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                        )}
                        <span className="text-xl font-bold text-indigo-600">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="self-center w-10 h-10 bg-indigo-600 text-white rounded-full text-2xl font-bold hover:bg-indigo-700 transition-all hover:scale-110 shadow-md"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>
              
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                {/* Table Number Input (if not from QR) */}
                {!tableNumber && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Table Number *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      placeholder="Enter table number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      onChange={(e) => {
                        const url = new URL(window.location);
                        url.searchParams.set('table', e.target.value);
                        window.history.pushState({}, '', url);
                      }}
                    />
                  </div>
                )}

                {/* Customer Name */}
                <div>
                  <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                {/* Order Type */}
                <div>
                  <label htmlFor="orderType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Order Type
                  </label>
                  <select
                    id="orderType"
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  >
                    <option value="dine-in">Dine In</option>
                    <option value="takeaway">Takeaway</option>
                  </select>
                </div>

                {/* Cart Items */}
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-3">🛒</div>
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-1">Add items from the menu</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item._id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900 flex-1">{item.name}</h4>
                            <button 
                              type="button"
                              onClick={() => removeFromCart(item._id)}
                              className="text-red-500 hover:text-red-700 text-lg ml-2"
                            >
                              🗑️
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="w-7 h-7 bg-white border border-gray-300 rounded font-bold hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="w-7 h-7 bg-white border border-gray-300 rounded font-bold hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-indigo-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-700">Total:</span>
                        <span className="text-3xl font-bold text-indigo-600">${getTotalAmount()}</span>
                      </div>

                      {cart.length > 0 && (
                        <button 
                          type="button"
                          onClick={clearCart}
                          className="w-full mb-3 bg-white border-2 border-red-400 text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-semibold"
                        >
                          Clear Cart
                        </button>
                      )}

                      <button 
                        type="submit" 
                        disabled={loading || cart.length === 0}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {loading ? 'Placing Order...' : 'Place Order'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;