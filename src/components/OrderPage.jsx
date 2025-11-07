// src/pages/OrderPage.jsx
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
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('📦 Loaded cart from localStorage:', savedCart);
    
    // Normalize cart items - ensure they all have id field
    const normalizedCart = savedCart.map(item => {
      const itemId = item.id || item._id;
      if (!itemId) {
        console.error('❌ Item missing ID:', item);
        return null;
      }
      return {
        ...item,
        id: itemId
      };
    }).filter(Boolean);
    
    // Check for invalid items
    const invalidItems = normalizedCart.filter(item => !item.id);
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
    const itemId = item.id || item._id;
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { 
        ...item, 
        id: itemId,
        quantity: 1 
      }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('✅ Item added to cart:', item.name);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      const updatedCart = cart.filter(item => item.id !== itemId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return;
    }
    
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
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

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return orderType === 'home-delivery' ? 5.00 : 0;
  };

  const getTotalAmount = () => {
    return (getSubtotal() + getDeliveryFee()).toFixed(2);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    console.log('🛒 Submitting order...');
    console.log('Cart:', cart);
    console.log('Order Type:', orderType);
    
    if (cart.length === 0) {
      setError('Please add items to your order');
      return;
    }

    // Validation based on order type
    if (orderType === 'dine-in' && !tableNumber) {
      setError('Table number is required for dine-in orders');
      return;
    }

    if (orderType === 'home-delivery') {
      if (!deliveryAddress || !phoneNumber) {
        setError('Delivery address and phone number are required');
        return;
      }
      if (!customerName) {
        setError('Your name is required for home delivery');
        return;
      }
    }

    // Validate all cart items have id
    const invalidItems = cart.filter(item => !item.id);
    if (invalidItems.length > 0) {
      console.error('❌ Invalid items in cart:', invalidItems);
      setError('Some items in your cart are corrupted. Please clear your cart and add items again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        customerName: customerName || 'Guest',
        orderType,
        items: cart.map(item => ({
          menuItem: item.id,
          quantity: item.quantity
        }))
      };

      // Add dine-in specific fields
      if (orderType === 'dine-in') {
        orderData.tableNumber = parseInt(tableNumber);
      }

      // Add delivery specific fields
      if (orderType === 'home-delivery') {
        orderData.deliveryAddress = deliveryAddress;
        orderData.phoneNumber = phoneNumber;
        orderData.paymentMethod = paymentMethod;
      }

      console.log('📤 Sending order data:', orderData);
      console.log('🌐 To URL:', `${API_URL}/orders`);

      const response = await axios.post(`${API_URL}/orders`, orderData);
      
      console.log('✅ Order response:', response.data);
      
      if (response.data.success) {
        const orderId = response.data.data._id || response.data.data.id;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Image Section */}
      <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=600&fit=crop')",
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/85 to-indigo-900/90">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                {orderType === 'home-delivery' ? (
                  <>
                    <span className="inline-block animate-bounce">🏠</span> Home Delivery
                  </>
                ) : (
                  <>
                    <span className="inline-block">🍽️</span> Table {tableNumber || 'Service'}
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-indigo-100 drop-shadow-md max-w-2xl mx-auto">
                {orderType === 'home-delivery' 
                  ? 'Fresh, delicious food delivered right to your doorstep' 
                  : 'Browse our exquisite menu and place your order'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-5 rounded-lg shadow-sm animate-shake">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="text-red-800 font-semibold text-sm sm:text-base">{error}</p>
                    {error.includes('corrupted') || error.includes('invalid') ? (
                      <button 
                        onClick={clearCart}
                        className="mt-2 text-red-600 underline hover:text-red-800 text-sm font-medium hover:no-underline transition-all"
                      >
                        Clear Cart & Start Fresh →
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setError(null)} 
                className="text-red-700 hover:text-red-900 font-bold text-xl hover:scale-110 transition-transform flex-shrink-0"
                aria-label="Close error"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Menu Section - Browse & Add More Items */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Browse Menu</h2>
                  <p className="text-gray-500 text-sm">Add items to your order</p>
                </div>
                <div className="text-3xl sm:text-4xl">🍴</div>
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-2 px-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 text-sm sm:text-base ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {category === 'all' ? '🍽️ All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Menu Items */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-gray-500 text-lg">No items available in this category</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {filteredItems.map(item => (
                    <div key={item.id || item._id} className="flex gap-3 sm:gap-4 bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-200 group border border-gray-100 hover:border-indigo-200">
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-md"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate">{item.name}</h3>
                        {item.description && (
                          <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
                        )}
                        <div className="flex items-center gap-2 sm:gap-3 mt-2 flex-wrap">
                          {item.category && (
                            <span className="bg-indigo-50 text-indigo-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-indigo-100">
                              {item.category}
                            </span>
                          )}
                          <span className="text-lg sm:text-xl font-bold text-indigo-600">₹{item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => addToCart(item)}
                        className="self-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full text-xl sm:text-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-110 shadow-lg hover:shadow-xl flex-shrink-0"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 sticky top-4 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Order</h2>
                <div className="text-2xl sm:text-3xl">🛒</div>
              </div>
              
              <form onSubmit={handleSubmitOrder} className="space-y-4 sm:space-y-5">
                {/* Order Type Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Order Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white font-medium text-gray-700 hover:border-indigo-300"
                  >
                    <option value="dine-in">🍽️ Dine In</option>
                    <option value="home-delivery">🏠 Home Delivery</option>
                  </select>
                </div>

                {/* Conditional Fields for Dine-In */}
                {orderType === 'dine-in' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Table Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={tableNumber || ''}
                        onChange={(e) => {
                          const url = new URL(window.location);
                          url.searchParams.set('table', e.target.value);
                          window.history.pushState({}, '', url);
                        }}
                        placeholder="Enter table number"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Your Name <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300"
                      />
                    </div>
                  </div>
                )}

                {/* Conditional Fields for Home Delivery */}
                {orderType === 'home-delivery' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Enter your full delivery address"
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none hover:border-indigo-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Payment Method <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white font-medium text-gray-700 hover:border-indigo-300"
                      >
                        <option value="cash-on-delivery">💵 Cash on Delivery</option>
                        <option value="online-payment">💳 Online Payment</option>
                      </select>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">ℹ️</span>
                        <p className="text-sm text-blue-900 font-semibold">
                          Delivery Fee: <span className="text-indigo-600">₹5.00</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t-2 border-gray-100 pt-4 sm:pt-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Cart Items</h3>
                  
                  {/* Cart Items */}
                  {cart.length === 0 ? (
                    <div className="text-center py-8 sm:py-10">
                      <div className="text-5xl sm:text-6xl mb-3">🛒</div>
                      <p className="text-gray-500 font-medium">Your cart is empty</p>
                      <p className="text-gray-400 text-sm mt-1">Add items from the menu</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-48 sm:max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-4">
                        {cart.map(item => (
                          <div key={item.id || item._id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100 hover:border-indigo-200 transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-900 flex-1 text-sm sm:text-base pr-2">{item.name}</h4>
                              <button 
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 text-lg hover:scale-110 transition-transform flex-shrink-0"
                                aria-label={`Remove ${item.name}`}
                              >
                                🗑️
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button 
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg font-bold hover:bg-indigo-50 hover:border-indigo-400 transition-all"
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="font-bold w-8 text-center text-gray-900">{item.quantity}</span>
                                <button 
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg font-bold hover:bg-indigo-50 hover:border-indigo-400 transition-all"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                              <span className="font-bold text-indigo-600 text-sm sm:text-base text-center">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="border-t-2 border-gray-100 pt-4 space-y-3">
                        <div className="flex justify-between items-center text-gray-700">
                          <span className="font-medium">Subtotal:</span>
                          <span className="font-bold text-lg text-center">₹{getSubtotal().toFixed(2)}</span>
                        </div>
                        
                        {orderType === 'home-delivery' && (
                          <div className="flex justify-between items-center text-gray-700">
                            <span className="font-medium">Delivery Fee:</span>
                            <span className="font-bold text-lg text-center">₹{getDeliveryFee().toFixed(2)}</span>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
                          <span className="text-xl font-bold text-gray-900">Total:</span>
                          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
                            ₹{getTotalAmount()}
                          </span>
                        </div>

                        {cart.length > 0 && (
                          <button 
                            type="button"
                            onClick={clearCart}
                            className="w-full mb-3 bg-white border-2 border-red-300 text-red-600 py-2.5 rounded-xl hover:bg-red-50 transition-all text-sm font-bold hover:border-red-400 hover:scale-105"
                          >
                            🗑️ Clear Cart
                          </button>
                        )}

                        <button 
                          type="submit" 
                          disabled={loading || cart.length === 0}
                          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg bg-size-200 bg-pos-0 hover:bg-pos-100"
                        >
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="animate-spin">⏳</span> Placing Order...
                            </span>
                          ) : (
                            orderType === 'home-delivery' ? '🚚 Place Delivery Order' : '🍽️ Place Order Now'
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .bg-size-200 {
          background-size: 200% auto;
        }

        .bg-pos-0 {
          background-position: 0% center;
        }

        .bg-pos-100:hover {
          background-position: 100% center;
          transition: 0.5s;
        }

        @media (max-width: 640px) {
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderPage;