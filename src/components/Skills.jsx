import { skills } from "../data/portfolio";

export default function Skills() {
  return (
    <section className="section">
      <h2>Skills</h2>
      <div className="skills-grid">
        {Object.entries(skills).map(([group, items]) => (
          <div className="skill-group" key={group}>
            <h3>{group}</h3>
            <ul>
              {items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
