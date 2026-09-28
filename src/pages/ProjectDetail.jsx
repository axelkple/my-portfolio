import { Link, useParams } from "react-router-dom";
import { projects } from "../data/portfolio";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <NotFound />;

  return (
    <article className="section page-top detail">
      <Link to="/projects" className="back">Back to projects</Link>
      <h2>{project.name}</h2>
      <p className="period">{project.type} project</p>
      <p className="lead">{project.details}</p>
      <h3>Results</h3>
      <ul className="highlights">
        {project.highlights.map((h) => <li key={h}>{h}</li>)}
      </ul>
      <h3>Built with</h3>
      <ul className="tags">
        {project.stack.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <p>
        <a className="btn btn-primary" href={project.link}>Open project</a>
      </p>
    </article>
  );
}
