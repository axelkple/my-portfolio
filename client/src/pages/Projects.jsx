import { useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects, projectFilters } from "../data/portfolio";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = projects.filter((p) => filter === "All" || p.type === filter);

  return (
    <section className="section page-top">
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
        {visible.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  );
}
