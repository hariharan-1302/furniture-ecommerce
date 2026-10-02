import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { fetchFurniture, categories, inspirationSlides, galleryImages } from "../data/products";

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(8);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    fetchFurniture()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const current = inspirationSlides[slide];
  const next = () => setSlide((s) => (s + 1) % inspirationSlides.length);
  const prev = () => setSlide((s) => (s - 1 + inspirationSlides.length) % inspirationSlides.length);

  return (
    <>
      <Hero />

      <Container className="py-5 my-4">
        <h2 className="section-title">Browse The Range</h2>
        <p className="section-sub mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Row className="g-4">
          {categories.map((c) => (
            <Col key={c.id} xs={12} md={4} className="text-center">
              <Link to="/shop">
                <img src={c.img} alt={c.name} className="range-img" />
                <h5 className="mt-3 fw-semibold">{c.name}</h5>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-4">
        <h2 className="section-title mb-4">Our Products</h2>
        {loading && <div className="text-center py-5"><Spinner animation="border" variant="warning" /></div>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && <ProductGrid products={products.slice(0, visible)} onAdd={addToCart} />}
        {!loading && visible < products.length && (
          <div className="text-center mt-5">
            <button className="btn btn-outline-gold" onClick={() => setVisible((v) => v + 4)}>Show More</button>
          </div>
        )}
      </Container>

      <section className="bg-soft py-5 my-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={4}>
              <h2 className="fw-bold">50+ Beautiful rooms inspiration</h2>
              <p className="text-secondary">Our designer already made a lot of beautiful prototypes of rooms that inspire you.</p>
              <Link to="/shop" className="btn btn-gold">Explore More</Link>
            </Col>
            <Col lg={5}>
              <div className="position-relative">
                <img src={current.img} alt={current.title} className="inspire-img" />
                <div className="position-absolute bottom-0 start-0 m-3 bg-white bg-opacity-75 p-3">
                  <small className="text-secondary">{current.room}</small>
                  <h5 className="mb-0 fw-semibold">{current.title}</h5>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <img src={inspirationSlides[(slide + 1) % inspirationSlides.length].img} alt="next" className="inspire-img" style={{ height: 300, opacity: 0.6 }} />
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-gold px-3" onClick={prev} aria-label="previous"><FiArrowLeft /></button>
                <button className="btn btn-gold px-3" onClick={next} aria-label="next"><FiArrowRight /></button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="text-center">
        <p className="text-secondary mb-0">Share your setup with</p>
        <h2 className="section-title mb-4">#FuniroFurniture</h2>
        <Row className="g-3 gallery">
          {galleryImages.map((src, i) => (
            <Col key={i} xs={6} md={3}><img src={src} alt={`setup ${i + 1}`} /></Col>
          ))}
        </Row>
      </Container>
    </>
  );
}