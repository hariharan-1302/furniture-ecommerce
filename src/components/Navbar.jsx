import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FiUser, FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ cartCount, onCartClick }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white sticky-top shadow-sm">
      <Container className="d-flex align-items-center justify-content-between py-3 furniro-nav">
        <Link to="/" className="d-flex align-items-center gap-2">
          <span className="fs-2 text-gold">&#9830;</span>
          <span className="brand-text">Furniro</span>
        </Link>

        <nav className="d-none d-lg-flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="d-flex align-items-center">
          <Link to="/comparison" className="icon-btn d-none d-sm-inline"><FiUser /></Link>
          <button className="icon-btn d-none d-sm-inline" aria-label="search"><FiSearch /></button>
          <button className="icon-btn d-none d-sm-inline" aria-label="wishlist"><FiHeart /></button>
          <button className="icon-btn" aria-label="cart" onClick={onCartClick}>
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button className="icon-btn d-lg-none" aria-label="menu" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="d-lg-none bg-white border-top">
          <Container className="d-flex flex-column py-2 furniro-nav">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end onClick={() => setOpen(false)}
                className={({ isActive }) => "nav-link py-2" + (isActive ? " active" : "")}>
                {l.label}
              </NavLink>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}