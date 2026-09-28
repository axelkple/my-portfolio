import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
