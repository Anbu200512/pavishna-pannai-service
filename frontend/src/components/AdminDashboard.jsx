function AdminDashboard({ products }) {
  const total = products.length;
  const seeds = products.filter(p => p.category === "Seeds").length;
  const fert = products.filter(p => p.category === "Fertilizer").length;
  const med = products.filter(p => p.category === "Medicine").length;

  return (
    <div className="dashboard">
      <div className="dash-card">📦<h3>{total}</h3><p>Total Products</p></div>
      <div className="dash-card">🌱<h3>{seeds}</h3><p>Seeds</p></div>
      <div className="dash-card">🧪<h3>{fert}</h3><p>Fertilizers</p></div>
      <div className="dash-card">💊<h3>{med}</h3><p>Medicines</p></div>
    </div>
  );
}

export default AdminDashboard;
