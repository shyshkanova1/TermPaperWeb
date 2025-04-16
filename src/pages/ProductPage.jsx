import { useParams } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext';
import "./css/productPage.css";

function ProductPage() {
  const { categoryName, id } = useParams();
  const [product, setProduct] = useState(null); // Ініціалізація стану продукту
  const [loading, setLoading] = useState(true); // Ініціалізація стану завантаження
  const [error, setError] = useState(null); // Ініціалізація стану помилки
  const { addProductToCart } = useContext(CartContext); // Використання контексту для додавання продукту до кошика
  const [showNotification, setShowNotification] = useState(false); // Ініціалізація стану для показу повідомлення

  useEffect(() => {
    const path = `/data/${categoryName}.json`;

    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка завантаження даних"); // Обробка помилки при завантаженні даних
        }
        return response.json();
      })
      .then((data) => {
        const foundProduct = data.find(p => p.id === parseInt(id)); // Пошук продукту за його id
        if (!foundProduct) {
          throw new Error("Данні не знайдено"); // Обробка помилки, якщо дані не знайдено
        }
        setProduct(foundProduct); // Встановлення стану продукту
        setLoading(false); // Зняття стану завантаження
      })
      .catch((err) => {
        setError(err.message); // Встановлення стану помилки
        setLoading(false); // Зняття стану завантаження
      });
  }, [categoryName, id]);

  const handleAddToCart = (product) => {
    addProductToCart(product); // Додавання продукту до кошика
    setShowNotification(true); // Показ повідомлення про успішне додавання
    setTimeout(() => {
      setShowNotification(false); // Приховування повідомлення через 2 секунди
    }, 2000);
  };

  if (loading) return <div>Завантаження...</div>; // Показ стану завантаження
  if (error) return <div>{error}</div>; // Показ повідомлення про помилку

  return (
    <div className='product-wrapper'>
      <img src={`../img/${categoryName}.jpg`}/> {/* Показ зображення продукту */}
      <div className="info-wrapper">
        <h1>{product.name}</h1> {/* Показ назви продукту */}
        <p>Бренд: {product.brand}</p> {/* Показ бренду продукту */}
        <p>Ціна: ${product.price}</p> {/* Показ ціни продукту */}
        <button onClick={() => handleAddToCart(product)}>Додати до кошика</button> {/* Кнопка для додавання продукту до кошика */}
      </div>
      {showNotification && <div className="notification">Товар успішно додано до кошика!</div>} {/* Показ повідомлення про успішне додавання */}
    </div>
  );
}

export default ProductPage;
