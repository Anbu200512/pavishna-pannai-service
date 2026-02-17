import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://pavishna-pannai-service-backend.onrender.com/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">

        {/* 🌾 Logo */}
        <div className="logo-section">
          <img src="/Pavishna-pannai-service-bglogo1.png" alt="Pavishna Pannai service Logo" loading="lazy" />
          <h2>Pavishna Pannai Service</h2>
        </div>

        <p>Admin Panel Access</p>

        <form onSubmit={handleLogin}>
          {/* 📧 Email */}
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 🔐 Password */}
          <div className="input-group">
            <span className="icon">🔐</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}

            </span>
          </div>

          <button className="admin-login-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
