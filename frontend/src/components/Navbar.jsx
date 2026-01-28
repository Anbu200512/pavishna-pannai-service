import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">🌾 Pavishana Pannai</div>

      <div className="menu-icon" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <nav className={open ? "nav-links open" : "nav-links"}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
    </header>
  );
}

export default Navbar;
