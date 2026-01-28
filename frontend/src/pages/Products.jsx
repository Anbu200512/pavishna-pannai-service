import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <section className="products">
      <h2>Our Products</h2>

      <div className="product-grid">
        {products.map(p => (
          <div className="product-card" key={p._id}>
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{p.name}</h3>
            <p>{p.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
