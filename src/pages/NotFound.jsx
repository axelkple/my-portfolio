import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section page-top">
      <h2>Page not found</h2>
      <p className="lead">This address doesn't exist. Check the link or go back to the home page.</p>
      <Link className="btn btn-primary" to="/">Go to home</Link>
    </section>
  );
}
