import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "../../components/admin/DashboardCard";
import { FaBoxOpen, FaTools, FaEnvelope } from "react-icons/fa";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    messages: 0,
  });

  const [latestMessages, setLatestMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const fetchData = async () => {
      try {
        const statsRes = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const msgRes = await axios.get(
          "http://localhost:5000/api/admin/latest-messages",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(statsRes.data);
        setLatestMessages(msgRes.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.error("Error loading dashboard data");
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h2>Welcome Admin 👋</h2>

      {/* Stats Cards */}
      <div className="dashboard-grid">
  <DashboardCard
    title="Total Products"
    value={stats.products}
    icon={<FaBoxOpen />}
    color="#2e7d32"
  />

  <DashboardCard
    title="Total Services"
    value={stats.services}
    icon={<FaTools />}
    color="#1565c0"
  />

  <DashboardCard
    title="Total Messages"
    value={stats.messages}
    icon={<FaEnvelope />}
    color="#c62828"
  />
</div>


<div className="dashboard-messages">
  <h3>Latest Messages</h3>

  <div className="message-grid">
    {latestMessages.map((msg) => (
      <div className="message-card" key={msg._id}>
        <div className="message-top">
          <div>
            <h4>{msg.name}</h4>
            <span>{msg.email}</span>
          </div>
          <small>
            {new Date(msg.createdAt).toLocaleDateString()}
          </small>
        </div>

        <p className="message-text">
          {msg.message}
        </p>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default AdminDashboard;
