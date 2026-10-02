import { Link } from "react-router-dom";
import { FiX, FiXCircle } from "react-icons/fi";

export default function CardSidebar({ open, onClose, cart, removeItem }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      {open && <div className="cart-backdrop" onClick={onClose} />}
      <aside className={"cart-side" + (open ? " open" : "")}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <h4 className="fw-semibold mb-0">Shopping Cart</h4>
          <button className="icon-btn" onClick={onClose} aria-label="close"><FiX /></button>
        </div>

        <div className="flex-grow-1 overflow-auto">
          {cart.length === 0 && <p className="text-secondary">Your cart is empty.</p>}
          {cart.map((item) => (
            <div key={item.id} className="d-flex align-items-center gap-3 mb-4">
              <img src={item.thumbnail} alt={item.title} width="80" height="80" className="rounded bg-light-grey" style={{ objectFit: "contain" }} />
              <div className="flex-grow-1">
                <p className="mb-1">{item.title}</p>
                <small>{item.qty} × <span className="text-gold fw-medium">$ {item.price}</span></small>
              </div>
              <button className="icon-btn text-secondary" onClick={() => removeItem(item.id)}><FiXCircle /></button>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between border-top pt-3 mb-3">
          <span>Subtotal</span>
          <strong className="text-gold">$ {subtotal.toFixed(2)}</strong>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/cart" onClick={onClose} className="btn btn-outline-dark rounded-pill px-3">Cart</Link>
          <Link to="/checkout" onClick={onClose} className="btn btn-outline-dark rounded-pill px-3">Checkout</Link>
          <Link to="/comparison" onClick={onClose} className="btn btn-outline-dark rounded-pill px-3">Comparison</Link>
        </div>
      </aside>
    </>
  );
}