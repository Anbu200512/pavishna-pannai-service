import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import "../styles/admin.css";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-container">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="admin-main">
        <Topbar setIsOpen={setIsOpen} />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      {isOpen && (
        <div
          className="admin-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default AdminLayout;
