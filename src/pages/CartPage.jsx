import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import "./css/cartPage.css";

function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []); // Отримання із локального середовища браузера інформації про товар

  useEffect(() => { // Відслідковування змін стану кошика
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const total = cart?.reduce( // Розрахунок фінальної ціни
    (sum, item) => sum + item.product.price * item.quantity,
    0
  ) || 0;

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Видалення інформації про кошик із локального середовища браузера
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className="cart-page">
      <h2>Кошик</h2>
      {cart?.length === 0 && <p>Кошик пустий</p>} {/* Вивід повідомлення, якщо кошик пустий */}
      <ul>
        {cart?.map((item) => ( 
            <CartItem item={item} onRemove={() => removeItem(item.product.id)} key={item.product.id} />
          ))} {/* Проходження по усім елементам кошика за допомогою функції map, та вивід кожного елемента */}
      </ul>
      <p>До сплати: ${total.toFixed(2)}</p>
      {cart?.length !== 0 && <>
        <button onClick={clearCart}>Очистити кошик</button>
        <Link to="/success">
          <button onClick={clearCart}>Оформити замовлення</button>
        </Link>
      </>}
    </div>
  );
}

export default CartPage;
