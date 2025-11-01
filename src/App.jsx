import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import OrderPage from './components/OrderPage';
import OrderTrackingPage from './components/OrderTrackingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Menu Display Page */}
        <Route path="/" element={<MenuPage />} />
        
        {/* Table-specific Order Page (accessed via QR code) */}
        <Route path="/order" element={<OrderPage />} />
        
        {/* Order Tracking Page */}
        <Route path="/track-order/:orderId" element={<OrderTrackingPage />} />
        
        {/* Fallback route */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <p className="text-lg mb-8 opacity-90">The page you're looking for doesn't exist.</p>
            <a 
              href="/" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Go to Menu
            </a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;