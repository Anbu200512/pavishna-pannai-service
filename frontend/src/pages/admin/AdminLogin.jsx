import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/login",
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
          <img src="/logo.png" alt="Logo" />
          <h2>Pavishna Pannai</h2>
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
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button className="admin-login-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
