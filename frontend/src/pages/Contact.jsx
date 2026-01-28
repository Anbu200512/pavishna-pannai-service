function Contact() {
  return (
    <section className="page">
      <h2>Contact Us</h2>

      <p>📞 Phone: +91 9XXXXXXXXX</p>
      <p>📧 Email: pavishnapannai@gmail.com</p>
      <p>📍 Location: Tamil Nadu, India</p>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="4"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
