import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

export default function Header({ title }) {
  return (
    <section className="page-header text-center">
      <h1>{title}</h1>
      <div className="d-flex align-items-center gap-2">
        <Link to="/" className="fw-medium">Home</Link>
        <FiChevronRight />
        <span>{title}</span>
      </div>
    </section>
  );
}