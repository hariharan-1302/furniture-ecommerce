import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";

const info = [
  { id: 1, icon: <FiMapPin />, title: "Address", lines: ["236 5th SE Avenue, New York NY10000, United States"] },
  { id: 2, icon: <FiPhone />, title: "Phone", lines: ["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"] },
  { id: 3, icon: <FiClock />, title: "Working Time", lines: ["Monday-Friday: 9:00 - 22:00", "Saturday-Sunday: 9:00 - 21:00"] },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Header title="Contact" />
      <Container className="py-5 text-center">
        <h2 className="fw-semibold">Get In Touch With Us</h2>
        <p className="text-secondary mx-auto" style={{ maxWidth: 600 }}>
          For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out.
        </p>

        <Row className="g-5 mt-2 text-start">
          <Col lg={5}>
            {info.map((i) => (
              <div key={i.id} className="d-flex gap-3 mb-4">
                <span className="fs-3 mt-1">{i.icon}</span>
                <div>
                  <h5 className="fw-semibold">{i.title}</h5>
                  {i.lines.map((l) => <p key={l} className="mb-1">{l}</p>)}
                </div>
              </div>
            ))}
          </Col>
          <Col lg={7}>
            {sent && <div className="alert alert-success">Message sent. We'll be in touch soon!</div>}
            <Form onSubmit={submit} className="d-grid gap-3">
              <div><Form.Label>Your name</Form.Label><Form.Control name="name" placeholder="Abc" value={form.name} onChange={change} required /></div>
              <div><Form.Label>Email address</Form.Label><Form.Control type="email" name="email" placeholder="Abc@def.com" value={form.email} onChange={change} required /></div>
              <div><Form.Label>Subject</Form.Label><Form.Control name="subject" placeholder="This is optional" value={form.subject} onChange={change} /></div>
              <div><Form.Label>Message</Form.Label><Form.Control as="textarea" rows={4} name="message" placeholder="Hi! I'd like to ask about" value={form.message} onChange={change} required /></div>
              <div><button className="btn btn-gold px-5">Submit</button></div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Features />
    </>
  );
}