import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section className="section">
      <h2>Experience</h2>
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.role + job.company}>
            <span className="period">{job.period}</span>
            <h3>{job.role}, {job.company}</h3>
            <p>{job.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
