import { BrowserRouter, Route, Routes } from 'react-router';
import { CartProvider } from './components/CartContext';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SuccessPage from './pages/SuccessPage';
import categories from './data/categories.json';

function App() {
  return (
    <CartProvider>
      <BrowserRouter> {/* Обгортка для навігації за допомогою "react-router" */}
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage categories={categories} />} /> {/* Рути, або встановленні елементи посилання, на які в подальшому можна перейти */}
          <Route path="/:categoryName" element={<CategoryPage />} /> 
          <Route path="/:categoryName/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;