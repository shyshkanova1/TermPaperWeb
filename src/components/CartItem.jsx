function CartItem({ item, onRemove }) {
    return (
      <li>
        {item.product.name} (x{item.quantity}) — ${item.product.price * item.quantity}
        <button onClick={onRemove}>
          Видалити
        </button>
      </li>
    );
  }
  
  export default CartItem;