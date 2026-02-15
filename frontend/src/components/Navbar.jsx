import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="logo">🌱 Pavishna Pannai Service</div>

      {/* Menu Icon (Mobile) */}
      <div className="menu-icon" onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${open ? "active" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
        <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        
      </div>
    </div>
  );
}

export default Navbar;
