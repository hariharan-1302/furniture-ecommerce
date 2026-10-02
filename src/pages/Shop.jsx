import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FiFilter, FiGrid, FiList, FiSearch } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";
import ProductGrid from "../components/ProductGrid";
import { fetchFurniture } from "../data/products";

export default function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchFurniture()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, sort, category, perPage]);

  const categories = useMemo(() => ["all", ...new Set(products.map((p) => p.category))], [products]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" || p.category === category)
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, search, sort, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  return (
    <>
      <Header title="Shop" />

      <section className="bg-soft py-3">
        <Container>
          <Row className="align-items-center g-3">
            <Col lg={5} className="d-flex align-items-center gap-3">
              <button className="btn p-0 d-flex align-items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
                <FiFilter /> Filter
              </button>
              <FiGrid /> <FiList />
              <span className="border-start ps-3 small">
                Showing {filtered.length ? start + 1 : 0}–{Math.min(start + perPage, filtered.length)} of {filtered.length} results
              </span>
            </Col>
            <Col lg={7} className="d-flex flex-wrap justify-content-lg-end gap-3 align-items-center">
              <label className="d-flex align-items-center gap-2">
                Show
                <select className="form-select form-select-sm" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                  {[4, 8, 12, 16].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label className="d-flex align-items-center gap-2">
                Sort by
                <select className="form-select form-select-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="az">Name: A–Z</option>
                </select>
              </label>
            </Col>
          </Row>

          {showFilters && (
            <Row className="g-3 pt-3">
              <Col md={6}>
                <div className="input-group">
                  <span className="input-group-text bg-white"><FiSearch /></span>
                  <input className="form-control" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </Col>
              <Col md={6}>
                <select className="form-select text-capitalize" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => <option key={c} value={c}>{c.replace("-", " ")}</option>)}
                </select>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Container className="py-5">
        {loading && <div className="text-center py-5"><Spinner animation="border" variant="warning" /></div>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && <ProductGrid products={pageItems} onAdd={addToCart} />}

        <div className="d-flex justify-content-center mt-5 flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={"page-pill" + (page === n ? " active" : "")} onClick={() => setPage(n)}>{n}</button>
          ))}
          {page < totalPages && (
            <button className="page-pill px-3 w-auto" onClick={() => setPage(page + 1)}>Next</button>
          )}
        </div>
      </Container>

      <Features />
    </>
  );
}