import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {
  if (!products.length) return <p className="text-center text-secondary py-5">No products found.</p>;
  return (
    <Row className="g-4">
      {products.map((p) => (
        <Col key={p.id} xs={12} sm={6} lg={3}>
          <ProductCard product={p} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
}