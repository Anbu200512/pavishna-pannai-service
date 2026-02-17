import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlus,
  FaTools,
  FaEnvelope,
  FaSignOutAlt,
  FaPhoneAlt ,
  FaTimes
} from "react-icons/fa";

function Sidebar({ isOpen, setIsOpen }) {
  return (
  
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src="/full-logo.png" alt="Pavishna Pannai Service Logo" loading="lazy" />

          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav>
          <NavLink to="/admin" end onClick={() => setIsOpen(false)}>
            <FaTachometerAlt /> Dashboard
          </NavLink>

                    <NavLink to="/admin/add-product" onClick={() => setIsOpen(false)}>
            <FaPlus /> Add Product
          </NavLink>

          <NavLink to="/admin/manage-products" onClick={() => setIsOpen(false)}>
            <FaBoxOpen /> Products
          </NavLink>



          <NavLink to="/admin/services" onClick={() => setIsOpen(false)}>
            <FaTools /> Services
          </NavLink>

          <NavLink to="/admin/contact" onClick={() => setIsOpen(false)}>
            <FaPhoneAlt /> Contact
          </NavLink>

          <NavLink to="/admin/messages" onClick={() => setIsOpen(false)}>
            <FaEnvelope /> Messages
          </NavLink>
        </nav>


      </aside>
    
  );
}

export default Sidebar;
