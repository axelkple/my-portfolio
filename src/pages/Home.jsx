import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Skills from "../components/Skills.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/portfolio";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <section className="section">
        <div className="section-head">
          <h2>Recent projects</h2>
          <Link to="/projects">All projects</Link>
        </div>
        <div className="projects-grid">
          {projects.slice(0, 2).map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>
    </>
  );
}
