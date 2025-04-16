const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Бренд: {product.brand}</p>
      <p>Цена: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductCard;