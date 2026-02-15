import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import FAQ from "./pages/FAQ";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminManageProducts from "./pages/admin/AdminManageProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminServices from "./pages/admin/AdminServices";
import AdminContact from "./pages/admin/AdminContact";

function AppRoutes() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      return <Navigate to="/admin-login" />;
    }
    return children;
  };

  return (
    <div className="app-container">
      {!isAdminPage && <Navbar />}

      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Admin Login */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="manage-products" element={<AdminManageProducts />} />
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="contact" element={<AdminContact />} />
          </Route>
        </Routes>
      </div>

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default AppRoutes;
