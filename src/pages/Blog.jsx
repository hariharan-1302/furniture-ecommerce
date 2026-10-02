import { useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiUser, FiCalendar, FiTag, FiSearch } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";
import { blogPosts } from "../data/products";

const PER_PAGE = 3;

export default function Blog() {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const cats = useMemo(() => {
    const counts = {};
    blogPosts.forEach((p) => (counts[p.cat] = (counts[p.cat] || 0) + 1));
    return counts;
  }, []);

  const filtered = blogPosts.filter(
    (p) => (cat === "All" || p.cat === cat) && p.title.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const items = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const pick = (c) => { setCat(c); setPage(1); };

  return (
    <>
      <Header title="Blog" />
      <Container className="py-5">
        <Row className="g-5">
          <Col lg={8}>
            {items.map((p) => (
              <article key={p.id} className="mb-5">
                <img src={p.img} alt={p.title} className="blog-img" />
                <div className="d-flex flex-wrap gap-4 text-secondary small my-3">
                  <span className="d-flex align-items-center gap-1"><FiUser /> {p.author}</span>
                  <span className="d-flex align-items-center gap-1"><FiCalendar /> {p.date}</span>
                  <span className="d-flex align-items-center gap-1"><FiTag /> {p.cat}</span>
                </div>
                <h3 className="fw-medium">{p.title}</h3>
                <p className="text-secondary">{p.text}</p>
                <button className="btn btn-link text-dark p-0 border-bottom rounded-0">Read more</button>
              </article>
            ))}
            {!items.length && <p className="text-secondary">No posts found.</p>}

            <div className="d-flex mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} className={"page-pill" + (page === n ? " active" : "")} onClick={() => setPage(n)}>{n}</button>
              ))}
            </div>
          </Col>

          <Col lg={4}>
            <div className="input-group mb-4">
              <input className="form-control" placeholder="Search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
              <span className="input-group-text bg-white"><FiSearch /></span>
            </div>

            <h4 className="fw-semibold mb-3">Categories</h4>
            <ul className="list-unstyled mb-5">
              <li className="d-flex justify-content-between mb-2" role="button" onClick={() => pick("All")}>
                <span className={cat === "All" ? "text-gold" : "text-secondary"}>All</span><span className="text-secondary">{blogPosts.length}</span>
              </li>
              {Object.entries(cats).map(([c, n]) => (
                <li key={c} className="d-flex justify-content-between mb-2" role="button" onClick={() => pick(c)}>
                  <span className={cat === c ? "text-gold" : "text-secondary"}>{c}</span><span className="text-secondary">{n}</span>
                </li>
              ))}
            </ul>

            <h4 className="fw-semibold mb-3">Recent Posts</h4>
            {blogPosts.slice(0, 5).map((p) => (
              <div key={p.id} className="d-flex gap-3 mb-3">
                <img src={p.img} alt="" width="80" height="80" className="rounded" style={{ objectFit: "cover" }} />
                <div>
                  <p className="mb-0 small">{p.title}</p>
                  <small className="text-secondary">{p.date}</small>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <Features />
    </>
  );
}