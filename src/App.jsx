import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import HomePage from './components/Home/HomePage.jsx';
import MenuPage from './components/MenuPage';
import OrderPage from './components/OrderPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import GalleryPage from './components/GalleryPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar will appear on all pages */}
        <Navbar />
        
        {/* Add padding top to account for fixed navbar */}
        <div className="pt-16 sm:pt-20">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Menu Page */}
            <Route path="/menu" element={<MenuPage />} />
            
            {/* Order Page (accessed via QR code or menu) */}
            <Route path="/order" element={<OrderPage />} />
            
            {/* Order Tracking Page */}
            <Route path="/order-tracking" element={<OrderTrackingPage />} />
            <Route path="/track-order/:orderId" element={<OrderTrackingPage />} />
            
            {/* Gallery Page */}
            <Route path="/gallery" element={<GalleryPage />} />
            
            {/* Contact Page */}
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Fallback 404 route */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 text-white px-4">
                <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
                <p className="text-2xl md:text-3xl mb-4 font-semibold">Page Not Found</p>
                <p className="text-base md:text-lg mb-8 opacity-90 text-center max-w-md">
                  Oops! The page you're looking for doesn't exist.
                </p>
                <a 
                  href="/" 
                  className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Back to Home
                </a>
              </div>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;