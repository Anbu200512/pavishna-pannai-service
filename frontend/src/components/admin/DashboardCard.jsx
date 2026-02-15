import { useEffect, useState } from "react";

function DashboardCard({ title, value, icon, color }) {
  const [count, setCount] = useState(0);

  // subtle counter animation
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="dashboard-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="card-header">
        <div className="card-icon" style={{ background: color }}>
          {icon}
        </div>
        <h4>{title}</h4>
      </div>
      <p>{count}</p>
    </div>
  );
}

export default DashboardCard;
