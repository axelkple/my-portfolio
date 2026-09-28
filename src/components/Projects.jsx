import { useState } from "react";
import { projects, projectFilters } from "../data/portfolio";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = projects.filter((p) => filter === "All" || p.type === filter);

  return (
    <section id="projects" className="section">
      <div className="section-head">
        <h2>Projects</h2>
        <div className="filters" role="group" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button
              key={f}
              className={f === filter ? "chip active" : "chip"}
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="projects-grid">
        {visible.map((p) => (
          <article className="project" key={p.name}>
            <h3>{p.name}</h3>
            <p>{p.text}</p>
            <ul className="tags">
              {p.stack.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <a href={p.link}>View project</a>
          </article>
        ))}
      </div>
    </section>
  );
}
