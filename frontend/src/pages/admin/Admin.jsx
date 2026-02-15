import { useState } from "react";
import AdminAddProduct from "./AdminAddProduct";
import AdminManageProducts from "./AdminManageProducts";
import AdminServices from "./AdminServices";
import AdminContact from "./AdminContact";
import AdminMessages from "./AdminMessages";

function Admin() {
  const [activeView, setActiveView] = useState("add");
  const [editProduct, setEditProduct] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin-login";
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>

      <div className="admin-actions">
        <button onClick={() => setActiveView("add")}>➕ Add Product</button>
        <button onClick={() => setActiveView("manage")}>📦 Manage Products</button>
        <button onClick={() => setActiveView("services")}>🧰 Services</button>
        <button onClick={() => setActiveView("contact")}>📞 Contact</button>
        <button onClick={() => setActiveView("messages")}>💬 Messages</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {activeView === "add" && (
        <AdminAddProduct
          setActiveView={setActiveView}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      )}

      {activeView === "manage" && (
        <AdminManageProducts
          setActiveView={setActiveView}
          setEditProduct={setEditProduct}
        />
      )}

      {activeView === "services" && <AdminServices />}
      {activeView === "contact" && <AdminContact />}
      {activeView === "messages" && <AdminMessages />}
    </div>
  );
}

export default Admin;
