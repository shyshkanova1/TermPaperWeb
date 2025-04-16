import { Link } from 'react-router';
import "./css/navigationBar.css";

function NavigationBar() {
  return (
    <nav> {/* Головна навігація сайту */}
      <Link to="/">Головна</Link>
      <Link to="/cart">Кошик</Link>
    </nav>
  );
}

export default NavigationBar;