import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Contact() {
  const [settings, setSettings] = useState(null);
  const location = useLocation();
  const serviceName = location.state?.serviceName || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  useEffect(() => {
    document.title = "Contact Us | Pavishna Pannai Service";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Contact Pavishna Pannai Service for agricultural products, farm services, and expert farming support.",
      );
    }
  }, []);

  /* LOAD CONTACT SETTINGS */
  useEffect(() => {
    fetch("https://pavishna-pannai-service-backend.onrender.com/api/contact-settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  /* 🔥 AUTO FILL MESSAGE IF COMING FROM SERVICES */
  useEffect(() => {
    if (serviceName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({
        ...prev,
        message: serviceName,
      }));
    }
  }, [serviceName]);

  /* HANDLE INPUT */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* SUBMIT MESSAGE */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://pavishna-pannai-service-backend.onrender.com/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Message sending failed");
      return;
    }

    setSuccess("Your message has been sent successfully.");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="contact-section">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We are here to support your agricultural needs.</p>
      </div>

      <div className="contact-container">
        {/* CONTACT INFO */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          {settings && (
            <div className="contact-info-list">
              <div className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <div>
                  <span>Phone</span>
                  <p>{settings.phone}</p>
                </div>
              </div>

              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <span>Email</span>
                  <p>{settings.email}</p>
                </div>
              </div>

              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <span>Address</span>
                  <p>{settings.address}</p>
                </div>
              </div>

              {settings.workingHours && (
                <div className="contact-item">
                  <FaClock className="contact-icon" />
                  <div>
                    <span>Working Hours</span>
                    <p>{settings.workingHours}</p>
                  </div>
                </div>
              )}

              {settings.whatsapp && (
                <div className="contact-item">
                  <FaWhatsapp className="contact-icon whatsapp" />
                  <div>
                    <span>WhatsApp</span>
                    <a
                      href={`https://wa.me/${settings.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat Now
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form">
          <h2>Send a Message</h2>

          {success && <p className="success-msg">{success}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* GOOGLE MAP */}
      {settings && settings.mapEmbedLink && (
        <div className="contact-map">
          <iframe
            src={settings.mapEmbedLink}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Contact;
