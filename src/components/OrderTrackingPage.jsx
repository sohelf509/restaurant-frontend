import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchOrder();
    
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchOrder, 10000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [orderId, autoRefresh]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        label: 'Order Received',
        icon: '📋',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600',
        bgLight: 'bg-yellow-50',
        description: 'Your order has been received and is waiting to be prepared'
      },
      preparing: {
        label: 'Being Prepared',
        icon: '👨‍🍳',
        color: 'bg-blue-500',
        textColor: 'text-blue-600',
        bgLight: 'bg-blue-50',
        description: 'Your order is being prepared by our kitchen staff'
      },
      served: {
        label: 'Served',
        icon: '🍽️',
        color: 'bg-green-500',
        textColor: 'text-green-600',
        bgLight: 'bg-green-50',
        description: 'Your order has been served'
      },
      completed: {
        label: 'Completed',
        icon: '✅',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        bgLight: 'bg-emerald-50',
        description: 'Your order is complete. Thank you!'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  const getStatusSteps = () => {
    return ['pending', 'preparing', 'served', 'completed'];
  };

  const getCurrentStepIndex = (status) => {
    return getStatusSteps().indexOf(status);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white"></div>
        <p className="mt-4 text-white text-xl">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-4">
        <h2 className="text-5xl mb-4">⚠️</h2>
        <h2 className="text-3xl font-bold mb-4">{error ? 'Error' : 'Order Not Found'}</h2>
        <p className="text-xl mb-8">{error || "The order you're looking for doesn't exist."}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const currentStep = getCurrentStepIndex(order.status);
  
  // Handle both _id and id fields
  const orderDisplayId = order._id || order.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 pb-8">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-white hover:text-white/80 font-semibold flex items-center gap-2"
          >
            <span className="text-xl">←</span> Back
          </button>
          <h1 className="text-2xl font-bold text-white">Track Your Order</h1>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-5 h-5 rounded"
            />
            <span className="text-sm">Auto-refresh</span>
          </label>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Section */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`${statusInfo.bgLight} border-4 ${statusInfo.textColor} rounded-3xl p-8 text-center shadow-2xl animate-fade-in`}>
              <div className={`${statusInfo.color} w-32 h-32 rounded-full flex items-center justify-center text-6xl mx-auto mb-6 animate-pulse-slow shadow-xl`}>
                {statusInfo.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{statusInfo.label}</h2>
              <p className="text-gray-700 text-lg">{statusInfo.description}</p>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                {getStatusSteps().map((step, index) => {
                  const stepInfo = getStatusInfo(step);
                  const isActive = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <div key={step} className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-500 ${
                        isActive ? stepInfo.color : 'bg-gray-200'
                      } ${isCurrent ? 'scale-110 ring-4 ring-offset-2 ring-indigo-300' : ''}`}>
                        {stepInfo.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                          {stepInfo.label}
                        </h3>
                      </div>
                      {isActive && (
                        <div className="text-green-500 text-2xl">✓</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Order Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Order ID:</span>
                  <span className="text-gray-900 font-mono text-sm">{orderDisplayId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Table Number:</span>
                  <span className="text-indigo-600 font-bold text-xl">Table {order.tableNumber}</span>
                </div>
                {order.customerName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Customer Name:</span>
                    <span className="text-gray-900">{order.customerName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Order Type:</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {order.orderType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Order Time:</span>
                  <span className="text-gray-900 text-sm">{formatDate(order.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Order Items</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {order.items.map((item, index) => {
                  // Handle both _id and id for item keys
                  const itemKey = item._id || item.id || index;
                  
                  return (
                    <div key={itemKey} className="flex gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      {item.menuItem?.imageUrl && (
                        <img 
                          src={item.menuItem.imageUrl} 
                          alt={item.menuItem?.name} 
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{item.menuItem?.name || 'Item'}</h4>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                        <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-indigo-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t mt-6 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-700">Total Amount:</span>
                  <span className="text-4xl font-bold text-indigo-600">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={fetchOrder}
                className="bg-white text-indigo-600 border-2 border-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
              >
                🔄 Refresh Status
              </button>
              {order.status === 'completed' && (
                <button 
                  onClick={() => navigate(`/order?table=${order.tableNumber}`)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Place New Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-white/10 backdrop-blur-md text-white text-center py-6 px-4 rounded-2xl">
          <p className="text-lg">Need assistance? Please call our staff or scan the QR code at your table.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;