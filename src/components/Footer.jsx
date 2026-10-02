import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const columns = [
  { title: "Links", items: [["Home", "/"], ["Shop", "/shop"], ["About", "/blog"], ["Contact", "/contact"]] },
  { title: "Help", items: [["Payment Options", "/checkout"], ["Returns", "/cart"], ["Privacy Policies", "/contact"]] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  };

  return (
    <footer className="bg-white border-top pt-5 mt-5">
      <Container>
        <Row className="g-4 pb-4">
          <Col lg={4}>
            <h4 className="fw-bold mb-3">Furniro.</h4>
            <p className="text-secondary">400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
          </Col>
          {columns.map((c) => (
            <Col key={c.title} xs={6} lg={2}>
              <p className="text-secondary mb-4">{c.title}</p>
              <ul className="list-unstyled d-grid gap-3 fw-medium">
                {c.items.map(([label, to]) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </Col>
          ))}
          <Col lg={4}>
            <p className="text-secondary mb-4">Newsletter</p>
            <form onSubmit={subscribe} className="d-flex gap-3 flex-wrap">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address" className="border-0 border-bottom flex-grow-1 py-1" required />
              <button className="border-0 border-bottom bg-white fw-semibold">SUBSCRIBE</button>
            </form>
            {done && <small className="text-success">Thanks for subscribing!</small>}
          </Col>
        </Row>
        <hr />
        <p className="py-3 mb-0">2023 furino. All rights reverved</p>
      </Container>
    </footer>
  );
}