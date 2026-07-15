import RollingText from './RollingText';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div>
        <div className="section-title-small">Get In Touch</div>
        <h2>LET'S BUILD SOMETHING EXTRAORDINARY.</h2>
        <p>Currently accepting select freelance projects and full-time opportunities. If you have an idea that needs a world-class digital execution, let's talk.</p>
      </div>
      
      <form className="contact-form glass-panel" style={{ padding: '40px' }} onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <input type="text" placeholder="YOUR NAME" required />
        </div>
        <div className="input-group">
          <input type="email" placeholder="YOUR EMAIL" required />
        </div>
        <div className="input-group">
          <textarea placeholder="PROJECT DETAILS" rows="4" required></textarea>
        </div>
        <button type="submit" className="submit-btn" data-magnetic><RollingText text="SEND MESSAGE" /></button>
      </form>
    </section>
  );
}
