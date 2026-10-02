import { Link } from "react-router-dom";
import { FiShare2, FiHeart, FiRepeat } from "react-icons/fi";

export default function ProductCard({ product, onAdd }) {
  const { id, title, price, discountPercentage, thumbnail, category } = product;
  const isSale = discountPercentage >= 10;
  const isNew = !isSale && id % 4 === 0;
  const oldPrice = isSale ? (price / (1 - discountPercentage / 100)).toFixed(2) : null;

  return (
    <div className="p-card">
      {isSale && <span className="p-badge badge-sale">-{Math.round(discountPercentage)}%</span>}
      {isNew && <span className="p-badge badge-new">New</span>}

      <Link to={`/product/${id}`}><img src={thumbnail} alt={title} loading="lazy" /></Link>

      <div className="p-body">
        <h5 className="fw-semibold text-truncate">{title}</h5>
        <p className="text-secondary mb-2 text-capitalize">{category.replace("-", " ")}</p>
        <div className="d-flex align-items-baseline">
          <strong className="fs-5">$ {price}</strong>
          {oldPrice && <span className="old-price">$ {oldPrice}</span>}
        </div>
      </div>

      <div className="overlay">
        <button className="btn btn-light text-gold fw-semibold rounded-0 px-5 py-2" onClick={() => onAdd(product)}>
          Add to cart
        </button>
        <div className="d-flex gap-3">
          <span className="overlay-link d-flex align-items-center gap-1"><FiShare2 /> Share</span>
          <Link to="/comparison" className="overlay-link d-flex align-items-center gap-1"><FiRepeat /> Compare</Link>
          <span className="overlay-link d-flex align-items-center gap-1"><FiHeart /> Like</span>
        </div>
      </div>
    </div>
  );
}