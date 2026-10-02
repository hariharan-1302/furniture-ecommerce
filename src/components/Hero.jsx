import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Hero() {
  return (
    <section className="hero">
      <Container>
        <div className="hero-card">
          <p className="fw-semibold mb-2" style={{ letterSpacing: 3 }}>New Arrival</p>
          <h1>Discover Our New Collection</h1>
          <p className="my-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <Link to="/shop" className="btn btn-gold text-uppercase">Buy Now</Link>
        </div>
      </Container>
    </section>
  );
}