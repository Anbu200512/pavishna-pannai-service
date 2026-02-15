import { useLocation, useNavigate } from "react-router-dom";

function Topbar({ setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const getTitle = () => {
    const path = location.pathname;

    if (path === "/admin") return "Dashboard";
    if (path.includes("manage-products")) return "Products";
    if (path.includes("add-product")) return "Add Product";
    if (path.includes("services")) return "Services";
    if (path.includes("messages")) return "Messages";

    return "Admin Panel";
  };

  return (
    <div className="admin-topbar">

  <div className="topbar-left">
    <h3>Pavishna Pannai Service</h3>
  </div>

  <div className="admin-user">
    <button className="menu-btn-logout" onClick={handleLogout}>Logout</button>
    <button className="menu-btn" onClick={() => setIsOpen(true)}>
      ☰
    </button>
  </div>

</div>

  );
}

export default Topbar;
