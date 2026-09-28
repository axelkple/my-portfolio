import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="project">
      <h3>{project.name}</h3>
      <p>{project.text}</p>
      <ul className="tags">
        {project.stack.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <Link to={`/projects/${project.slug}`}>View details</Link>
    </article>
  );
}
