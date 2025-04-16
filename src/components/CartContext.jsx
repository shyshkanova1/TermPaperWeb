import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Ініціалізуємо стан кошика з локального сховища, або починаємо з порожнього масиву, якщо збережений кошик відсутній
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Оновлюємо локальне сховище кожного разу, коли змінюється стан кошика
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Функція для додавання продукту до кошика з параметром кількості за замовчуванням
  const addProductToCart = (product, quantity = 1) => {
    // Перевіряємо, чи продукт вже є в кошику
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      // Якщо продукт існує, оновлюємо кількість продукту
      setCart(prev => prev.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      // Якщо продукт відсутній, додаємо його до кошика з заданою кількістю
      setCart(prev => [...prev, { product, quantity }]);
    }
  };

  // Функція для видалення продукту з кошика за його ID
  const removeProductFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Функція для очищення всього кошика
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addProductToCart, removeProductFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
