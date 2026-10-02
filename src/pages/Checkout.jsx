import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../components/Header";
import Features from "../components/Features";

const empty = { first: "", last: "", company: "", country: "Sri Lanka", street: "", town: "", province: "Western", zip: "", phone: "", email: "", notes: "" };

export default function Checkout({ cart, clearCart }) {
  const [form, setForm] = useState(empty);
  const [payment, setPayment] = useState("bank");
  const [placed, setPlaced] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
    setForm(empty);
  };

  return (
    <>
      <Header title="Checkout" />
      <Container className="py-5">
        {placed && <div className="alert alert-success">Thank you! Your order has been placed.</div>}
        <Form onSubmit={submit}>
          <Row className="g-5">
            <Col lg={6}>
              <h2 className="fw-semibold mb-4">Billing details</h2>
              <Row className="g-3">
                <Col sm={6}><Form.Label>First Name</Form.Label><Form.Control name="first" value={form.first} onChange={change} required /></Col>
                <Col sm={6}><Form.Label>Last Name</Form.Label><Form.Control name="last" value={form.last} onChange={change} required /></Col>
                <Col xs={12}><Form.Label>Company Name (Optional)</Form.Label><Form.Control name="company" value={form.company} onChange={change} /></Col>
                <Col xs={12}>
                  <Form.Label>Country / Region</Form.Label>
                  <Form.Select name="country" value={form.country} onChange={change}>
                    <option>Sri Lanka</option><option>India</option><option>United States</option><option>United Kingdom</option>
                  </Form.Select>
                </Col>
                <Col xs={12}><Form.Label>Street address</Form.Label><Form.Control name="street" value={form.street} onChange={change} required /></Col>
                <Col xs={12}><Form.Label>Town / City</Form.Label><Form.Control name="town" value={form.town} onChange={change} required /></Col>
                <Col xs={12}>
                  <Form.Label>Province</Form.Label>
                  <Form.Select name="province" value={form.province} onChange={change}>
                    <option>Western</option><option>Central</option><option>Southern</option>
                  </Form.Select>
                </Col>
                <Col xs={12}><Form.Label>ZIP code</Form.Label><Form.Control name="zip" value={form.zip} onChange={change} /></Col>
                <Col xs={12}><Form.Label>Phone</Form.Label><Form.Control name="phone" value={form.phone} onChange={change} required /></Col>
                <Col xs={12}><Form.Label>Email address</Form.Label><Form.Control type="email" name="email" value={form.email} onChange={change} required /></Col>
                <Col xs={12}><Form.Control as="textarea" rows={3} name="notes" placeholder="Additional information" value={form.notes} onChange={change} /></Col>
              </Row>
            </Col>

            <Col lg={6}>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <h4 className="fw-semibold">Product</h4><h4 className="fw-semibold">Subtotal</h4>
              </div>
              {cart.map((i) => (
                <div key={i.id} className="d-flex justify-content-between mb-2">
                  <span><span className="text-secondary">{i.title}</span> × {i.qty}</span>
                  <span>$ {(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="d-flex justify-content-between my-3"><span>Subtotal</span><span>$ {subtotal.toFixed(2)}</span></div>
              <div className="d-flex justify-content-between mb-4"><span>Total</span><strong className="text-gold fs-4">$ {subtotal.toFixed(2)}</strong></div>
              <hr />

              {[
                ["bank", "Direct Bank Transfer", "Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared."],
                ["cod", "Cash On Delivery", "Pay with cash upon delivery."],
              ].map(([val, label, desc]) => (
                <div key={val} className="mb-3">
                  <Form.Check type="radio" id={val} name="payment" label={label} checked={payment === val} onChange={() => setPayment(val)} />
                  {payment === val && <p className="text-secondary small ms-4 mt-1">{desc}</p>}
                </div>
              ))}
              <p className="small">Your personal data will be used to support your experience throughout this website.</p>
              <div className="text-center">
                <button type="submit" className="btn btn-outline-dark rounded-3 px-5 py-2" disabled={!cart.length}>Place order</button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
      <Features />
    </>
  );
}