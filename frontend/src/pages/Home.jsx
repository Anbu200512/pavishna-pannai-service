function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Growing With Farmers</h1>
          <p>
            Quality Seeds, Fertilizers & Medicines <br />
            For Better Harvest & Healthy Crops
          </p>
          <a href="/products" className="btn">View Products</a>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          Pavishana Pannai Service is a trusted agriculture supplier
          supporting farmers with quality products and expert guidance.
        </p>
      </section>

      <section className="services">
        <div className="card">🌱 Quality Seeds</div>
        <div className="card">🧪 Fertilizers</div>
        <div className="card">💊 Plant Medicines</div>
        <div className="card">🚜 Farmer Support</div>
      </section>
    </>
  );
}

export default Home;
