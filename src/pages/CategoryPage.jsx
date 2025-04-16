import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import categories from '../data/categories.json';
import "./css/categoryPage.css"

function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]); // Ініціалізація стану для зберігання продуктів
  const [category, setCategory] = useState(null); // Ініціалізація стану для зберігання категорії
  const [loading, setLoading] = useState(true); // Ініціалізація стану завантаження
  const [error, setError] = useState(null); // Ініціалізація стану помилки

  const foundCategory = categories.find(
    (cat) => cat.name === categoryName
  );

  useEffect(() => {
    if (!foundCategory) {
      setError("Помилка, неіснуюча категорія"); // Встановлення стану помилки, якщо категорія не знайдена
      setLoading(false); // Зняття стану завантаження
      return;
    }
    const path = `/data/${categoryName}.json`;

    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка завантаження даних"); // Обробка помилки при завантаженні даних
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); // Встановлення стану продуктів
        setCategory(foundCategory); // Встановлення стану категорії
        setLoading(false); // Зняття стану завантаження
      })
      .catch((err) => {
        setError(err.message); // Встановлення стану помилки
        setLoading(false); // Зняття стану завантаження
      });
  }, [categoryName]);

  if (loading) return <div>Завантаження...</div>; // Показ стану завантаження
  if (error) return <div>{error}</div>; // Показ повідомлення про помилку

  return (
    <div className='category-wrapper'>
      <h2>{category.name}</h2> {/* Показ назви категорії */}
      <p>{category.description}</p> {/* Показ опису категорії */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <img src={`../img/${category.name}.jpg`}/> {/* Показ зображення продукту */}
              <h3>{product.name}</h3> {/* Показ назви продукту */}
              <p>Бренд: {product.brand}</p> {/* Показ бренду продукту */}
              <p>Ціна: ${product.price}</p> {/* Показ ціни продукту */}
              <Link to={`/${categoryName}/${product.id}`}>
                <button>Перейти</button> {/* Кнопка для переходу до сторінки продукту */}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
