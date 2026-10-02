import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaStar, FaRegStar, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import ProductGrid from "../components/ProductGrid";
import { API_ONE, fetchFurniture } from "../data/products";

const colors = ["#816dfa", "#000000", "#b88e2f"];
const sizes = ["L", "XL", "XS"];
const tabs = ["Description", "Additional Information", "Reviews"];

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState("L");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Description");

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    setQty(1);
    Promise.all([fetch(`${API_ONE}/${id}`).then((r) => r.json()), fetchFurniture()])
      .then(([p, all]) => {
        setProduct(p);
        setRelated(all.filter((x) => x.id !== p.id).slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="warning" /></div>;
  if (!product || product.message) return <p className="text-center py-5">Product not found.</p>;

  const images = product.images?.length ? product.images : [product.thumbnail];
  const rating = Math.round(product.rating);

  return (
    <>
      <div className="bg-soft py-3">
        <Container className="d-flex gap-2 align-items-center">
          <Link to="/" className="text-secondary">Home</Link> &gt;
          <Link to="/shop" className="text-secondary">Shop</Link> &gt;
          <span className="border-start ps-3">{product.title}</span>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-5">
          <Col md={6}>
            <Row className="g-3">
              <Col xs={3} className="d-flex flex-column gap-3">
                {images.slice(0, 4).map((src, i) => (
                  <img key={i} src={src} alt="" className={"thumb" + (activeImg === i ? " active" : "")} onClick={() => setActiveImg(i)} />
                ))}
              </Col>
              <Col xs={9}><img src={images[activeImg]} alt={product.title} className="main-img" /></Col>
            </Row>
          </Col>

          <Col md={6}>
            <h2 className="fw-normal">{product.title}</h2>
            <h4 className="text-secondary fw-medium">$ {product.price}</h4>
            <div className="d-flex align-items-center gap-2 mb-3 text-warning">
              {[1, 2, 3, 4, 5].map((n) => (n <= rating ? <FaStar key={n} /> : <FaRegStar key={n} />))}
              <span className="text-secondary small border-start ps-2">{product.reviews?.length || 0} Customer Review</span>
            </div>
            <p style={{ maxWidth: 420 }}>{product.description}</p>

            <p className="text-secondary mb-1">Size</p>
            <div className="d-flex gap-2 mb-3">
              {sizes.map((s) => (
                <button key={s} className={"size-btn" + (size === s ? " active" : "")} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>

            <p className="text-secondary mb-1">Color</p>
            <div className="d-flex gap-3 mb-4">
              {colors.map((c) => (
                <span key={c} className={"color-dot" + (color === c ? " active" : "")} style={{ background: c }} onClick={() => setColor(c)} />
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="qty-box">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span className="px-2">{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="btn btn-outline-dark rounded-3 px-4" onClick={() => addToCart(product, qty)}>Add To Cart</button>
              <Link to="/comparison" className="btn btn-outline-dark rounded-3 px-4">+ Compare</Link>
            </div>

            <hr />
            <table className="small text-secondary">
              <tbody>
                <tr><td className="pe-4 py-1">SKU</td><td>: SS{String(product.id).padStart(3, "0")}</td></tr>
                <tr><td className="pe-4 py-1">Category</td><td className="text-capitalize">: {product.category.replace("-", " ")}</td></tr>
                <tr><td className="pe-4 py-1">Tags</td><td>: Sofa, Chair, Home, Shop</td></tr>
                <tr><td className="pe-4 py-1">Share</td><td>: <FaFacebook className="mx-1" /><FaLinkedin className="mx-1" /><FaTwitter className="mx-1" /></td></tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>

      <Container className="border-top py-5">
        <div className="d-flex justify-content-center flex-wrap mb-4">
          {tabs.map((t) => (
            <button key={t} className={"tab-btn" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="text-secondary mx-auto" style={{ maxWidth: 900 }}>
          {tab === "Description" && <p>{product.description}</p>}
          {tab === "Additional Information" && (
            <ul className="list-unstyled">
              <li>Brand: {product.brand || "Furniro"}</li>
              <li>Stock: {product.stock}</li>
              <li>Warranty: {product.warrantyInformation}</li>
              <li>Shipping: {product.shippingInformation}</li>
              {product.dimensions && <li>Dimensions (W×H×D): {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth}</li>}
            </ul>
          )}
          {tab === "Reviews" && (product.reviews?.length ? product.reviews.map((r, i) => (
            <div key={i} className="mb-3">
              <strong className="text-dark">{r.reviewerName}</strong> — {r.rating}/5
              <p className="mb-0">{r.comment}</p>
            </div>
          )) : <p>No reviews yet.</p>)}
        </div>
      </Container>

      <Container className="py-4">
        <h3 className="section-title mb-4">Related Products</h3>
        <ProductGrid products={related} onAdd={addToCart} />
        <div className="text-center mt-5"><Link to="/shop" className="btn btn-outline-gold">Show More</Link></div>
      </Container>
    </>
  );
}