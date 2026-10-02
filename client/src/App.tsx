import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { FoodDetailPage } from './pages/FoodDetailPage';
import { CartPage } from './pages/CartPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { ContactPage } from './pages/ContactPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="menu/:slug" element={<FoodDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="order/:orderNumber" element={<OrderTrackingPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
