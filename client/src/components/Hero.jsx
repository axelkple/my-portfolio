import { Link } from "react-router-dom";
import { profile } from "../data/portfolio";

export default function Hero() {
  return (
    <section className="hero">
      <h1>{profile.title}</h1>
      <p className="hero-text">{profile.intro}</p>
      <div className="hero-actions">
        <Link className="btn btn-primary" to="/projects">See my work</Link>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}
