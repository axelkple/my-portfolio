import { Link } from "react-router-dom";
import Experience from "../components/Experience.jsx";
import { profile } from "../data/portfolio";

export default function About() {
  return (
    <>
      <section className="section page-top about-intro">
        <div className="about-photo">
        
          <img
            src="/profile.jpeg"
            alt={profile.name}
            onError={(e) => e.target.classList.add("broken")}
          />
        </div>
        <div className="about-text">
          <h2>About me</h2>
          <p className="lead">
            Over 6 years experience developing and shipping APIs for startups and software teams with a strong background 
            of web applications. Currently, enrolled in an advance diploma program at Centennial College studying software 
            engineering specializing in Artificial Intelligence
          </p>
          <Link className="btn" to="/contact">Get in touch</Link>
        </div>
      </section>
      <Experience />
    </>
  );
}
