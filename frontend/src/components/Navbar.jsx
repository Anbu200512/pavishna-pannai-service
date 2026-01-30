import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">🌾 Pavishna Pannai Service</div>

      <div className="menu-icon" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <nav className={open ? "nav-links open" : "nav-links"}>
  <Link to="/" onClick={() => setOpen(false)}>Home</Link>
  <Link to="/about" onClick={() => setOpen(false)}>About</Link>
  <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
  <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
  <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
</nav>

    </header>
  );
}

export default Navbar;
