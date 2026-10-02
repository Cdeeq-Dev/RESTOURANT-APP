import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { FoodDetailPage } from './pages/FoodDetailPage.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { ReservationsPage } from './pages/ReservationsPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { OrderTrackingPage } from './pages/OrderTrackingPage.tsx';
import { CartProvider } from './context/CartContext.tsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="menu/:slug" element={<FoodDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="order/:orderNumber" element={<OrderTrackingPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
