import { Link } from 'react-router';
import "./css/homePage.css";

const HomePage = ({ categories }) => {
  return (
    <div className="home-page">
      <div className="head-text">
        <div className="image-logo"></div>
        <h1>Ласкаво просимо до магазину домашніх улюбленців!</h1>
      </div>
      <div className="categories-preview">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={`../img/${category.name}.jpg`}/> {/* Знаходимо зображення за категорією */}
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <Link to={`/${category.name}`}> {/* Навігація відповідно до обраної категорії, використовуємо модуль "react-router" */}
              <button>Перейти до категорії</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;