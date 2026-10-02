import { Container, Row, Col } from "react-bootstrap";
import { FiAward, FiShield, FiTruck, FiHeadphones } from "react-icons/fi";

const features = [
  { id: 1, icon: <FiAward />, title: "High Quality", text: "Crafted from top materials" },
  { id: 2, icon: <FiShield />, title: "Warranty Protection", text: "Over 2 years" },
  { id: 3, icon: <FiTruck />, title: "Free Shipping", text: "Order over $150" },
  { id: 4, icon: <FiHeadphones />, title: "24 / 7 Support", text: "Dedicated support" },
];

export default function Features() {
  return (
    <section className="features">
      <Container>
        <Row className="g-4">
          {features.map((f) => (
            <Col key={f.id} xs={12} sm={6} lg={3} className="d-flex align-items-center gap-3">
              <span className="fs-1">{f.icon}</span>
              <div>
                <h5 className="mb-0 fw-semibold">{f.title}</h5>
                <small className="text-secondary">{f.text}</small>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}