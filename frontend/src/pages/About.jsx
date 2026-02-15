import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSeedling, FaHandshake, FaShieldAlt, FaUsers } from "react-icons/fa";

function About() {
  useEffect(() => {
    document.title = "About Us | Pavishna Pannai Service";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Learn about Pavishna Pannai Service, our mission, values, and commitment to supporting farmers.",
      );
    }
  }, []);

  return (
    <>
      {/* ===== ABOUT HERO ===== */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Pavishna Pannai Service</h1>
          <p>
            Supporting farmers with trusted agricultural products and dependable
            services.
          </p>
        </div>
      </section>

      {/* ===== COMPANY INTRO ===== */}
      <section className="about-intro">
        <div className="about-container">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              Pavishna Pannai Service is a dedicated agricultural service
              provider committed to supporting farmers with quality products,
              expert guidance, and reliable delivery.
            </p>
            <p>
              With years of experience in the agriculture field, we understand
              the real challenges faced by farmers and provide practical,
              effective solutions.
            </p>
          </div>

          <div className="about-image">
            <img src="/home-about.png" alt="Farm Support" />
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="about-mission">
        <div className="about-container center">
          <div className="mission-box">
            <h3>Our Mission</h3>
            <p>
              To empower farmers with high-quality agricultural products and
              dependable support that improves productivity and sustainability.
            </p>
          </div>

          <div className="mission-box">
            <h3>Our Vision</h3>
            <p>
              To become a trusted agricultural partner known for quality,
              integrity, and long-term farmer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="about-values">
        <h2>Our Core Values</h2>

        <div className="values-grid">
          <div className="value-card">
            <FaSeedling />
            <h4>Quality First</h4>
            <p>We never compromise on product quality.</p>
          </div>

          <div className="value-card">
            <FaHandshake />
            <h4>Trust & Transparency</h4>
            <p>Building long-term farmer relationships.</p>
          </div>

          <div className="value-card">
            <FaShieldAlt />
            <h4>Reliable Service</h4>
            <p>Timely delivery and dependable support.</p>
          </div>

          <div className="value-card">
            <FaUsers />
            <h4>Farmer Focused</h4>
            <p>Solutions designed for real farming challenges.</p>
          </div>
        </div>
      </section>

      {/* ===== OWNER MESSAGE ===== */}
      <section className="about-owner">
        <div className="owner-content">
          <h2>Message From the Owner</h2>
          <p>
            "Our goal is simple — to stand beside every farmer and provide
            reliable support for their agricultural growth. We believe that when
            farmers succeed, our community grows stronger."
          </p>
          <span>— Pavishna Pannai Service</span>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="about-cta">
        <h2>Let’s Grow Together</h2>
        <Link to="/contact" className="btn">
          Contact Us Today
        </Link>
      </section>
    </>
  );
}

export default About;
