import { NavLink, Link } from "react-router-dom";
import { profile } from "../data/portfolio";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
];

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">{profile.name}</Link>
      <nav aria-label="Main">
        {links.map(([label, to]) => (
          <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>
        ))}
        
        <a className="btn btn-sm" href="/axel_resume.pdf" download>
         Download my Resume
        </a>
      </nav>
    </header>
  );
}
