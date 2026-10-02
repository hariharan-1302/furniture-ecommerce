import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";

export default function Cart({ cart, updateQty, removeItem }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <Header title="Cart" />
      <Container className="py-5">
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <h4>Your cart is empty</h4>
            <Link to="/shop" className="btn btn-gold mt-3">Go to Shop</Link>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              <div className="table-responsive">
                <table className="table cart-table align-middle">
                  <thead>
                    <tr><th></th><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th></tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td><img src={item.thumbnail} alt={item.title} width="90" height="90" className="bg-soft rounded" style={{ objectFit: "contain" }} /></td>
                        <td className="text-secondary">{item.title}</td>
                        <td className="text-secondary">$ {item.price}</td>
                        <td>
                          <input type="number" min="1" value={item.qty} className="form-control" style={{ width: 70 }}
                            onChange={(e) => updateQty(item.id, Number(e.target.value))} />
                        </td>
                        <td>$ {(item.price * item.qty).toFixed(2)}</td>
                        <td><button className="icon-btn text-gold" onClick={() => removeItem(item.id)}><FiTrash2 /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
            <Col lg={4}>
              <div className="totals text-center">
                <h3 className="fw-semibold mb-4">Cart Totals</h3>
                <div className="d-flex justify-content-between mb-3"><span>Subtotal</span><span className="text-secondary">$ {subtotal.toFixed(2)}</span></div>
                <div className="d-flex justify-content-between mb-4"><span>Total</span><strong className="text-gold fs-5">$ {subtotal.toFixed(2)}</strong></div>
                <Link to="/checkout" className="btn btn-outline-dark rounded-3 px-4">Check Out</Link>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <Features />
    </>
  );
}