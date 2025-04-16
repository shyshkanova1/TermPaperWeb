import { Link } from 'react-router';

function SuccessPage() {
  return (
    <div className="success-page">
      <h2>Дякуємо за замовлення!</h2>
      <p>Ваше замовлення успішно сформоване.</p>
      <Link to="/">
        <button>Повернутися на головну</button>
      </Link>
    </div>
  );
}

export default SuccessPage;