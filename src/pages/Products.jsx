import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import { fetchFurniture } from "../data/products";

// Simple "all products" listing page
export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFurniture().then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header title="Products" />
      <Container className="py-5">
        {loading ? <div className="text-center"><Spinner animation="border" variant="warning" /></div>
          : <ProductGrid products={products} onAdd={addToCart} />}
      </Container>
    </>
  );
}
