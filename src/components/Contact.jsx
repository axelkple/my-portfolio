import { useState } from "react";
import { profile } from "../data/portfolio";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nReply to: ${data.get("email")}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p className="contact-text">
        Have a project or a role in mind? Send me a message and I'll reply within two days.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name<input name="name" type="text" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Message<textarea name="message" rows="5" required /></label>
        <button className="btn btn-primary" type="submit">Send message</button>
        {sent && <p className="notice" role="status">Your email app should open with the message ready to send.</p>}
      </form>
    </section>
  );
}
