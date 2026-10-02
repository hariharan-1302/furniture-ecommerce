import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Features from "../components/Features";
import { fetchFurniture } from "../data/products";

const rows = [
  ["Price", (p) => `$ ${p.price}`],
  ["Brand", (p) => p.brand || "Furniro"],
  ["Category", (p) => p.category.replace("-", " ")],
  ["Rating", (p) => `${p.rating} / 5`],
  ["Stock", (p) => p.stock],
  ["Warranty", (p) => p.warrantyInformation || "—"],
  ["Weight", (p) => (p.weight ? `${p.weight} kg` : "—")],
  ["Width", (p) => p.dimensions?.width ?? "—"],
  ["Height", (p) => p.dimensions?.height ?? "—"],
  ["Depth", (p) => p.dimensions?.depth ?? "—"],
];

export default function Comparison() {
  const [products, setProducts] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);

  useEffect(() => {
    fetchFurniture().then(setProducts).catch(console.error);
  }, []);
  const pa = products[a];
  const pb = products[b];

  return (
    <>
      <Header title="Product Comparison" />
      <Container className="py-5">
        <Row className="g-4 align-items-end mb-4">
          <Col md={4}>
            <h3 className="fw-semibold">Go to Product page for more Products</h3>
          </Col>
          {[[pa, a, setA], [pb, b, setB]].map(([p, val, set], i) => (
            <Col key={i} md={4}>
              {p && <img src={p.thumbnail} alt={p.title} className="w-100 bg-soft rounded mb-3" style={{ height: 200, objectFit: "contain" }} />}
              <select className="form-select" value={val} onChange={(e) => set(Number(e.target.value))}>
                {products.map((x, idx) => <option key={x.id} value={idx}>{x.title}</option>)}
              </select>
            </Col>
          ))}
        </Row>

        {pa && pb && (
          <div className="table-responsive">
            <table className="table align-middle">
              <tbody>
                {rows.map(([label, get]) => (
                  <tr key={label}>
                    <th className="w-25 fw-medium">{label}</th>
                    <td className="text-capitalize w-25">{get(pa)}</td>
                    <td className="text-capitalize w-25">{get(pb)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
      <Features />
    </>
  );
}