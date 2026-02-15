import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { useEffect, useState } from "react";

function Footer() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/contact-settings")
      .then((res) => res.json())
      .then((data) => setContact(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company */}
        <div className="footer-section">
          <h3>Pavishna Pannai Service</h3>
          <p>
            Providing quality agricultural products and professional farming
            solutions to support sustainable and modern agriculture.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/services">Services</Link>
          <Link to="/faq">FAQ</Link>

          <Link to="/contact">Contact</Link>
        </div>

        {/* Contact */}

        <div className="footer-section">
          <h4>Contact</h4>

          {contact && (
            <>
              <p>
                <FaPhoneAlt />
                {contact.phone}
              </p>
              <p>
                <FaEnvelope />
                {contact.email}
              </p>
              <p>
                <FaMapMarkerAlt />
                {contact.address}
              </p>
            </>
          )}
        </div>

        {/* Social */}
  {/* Social */}
<div className="footer-section">
  <h4>Connect</h4>

  {contact?.phone && (
    <a
      href={`https://wa.me/${contact.phone}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp /> Chat on WhatsApp
    </a>
  )}

</div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Pavishna Pannai Service. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
