import { useEffect, useState } from "react";
import AdminDashboard from "../components/AdminDashboard";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (image) formData.append("image", image);

    const url = editId
      ? `http://localhost:5000/products/${editId}`
      : "http://localhost:5000/products";

    const method = editId ? "PUT" : "POST";

    await fetch(url, { method, body: formData });

    setName("");
    setCategory("");
    setImage(null);
    setEditId(null);

    fetchProducts();
  };

  const handleEdit = (p) => {
    setName(p.name);
    setCategory(p.category);
    setEditId(p._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  };

return (
  <section className="admin-page">
    <h2>Admin Panel</h2>
    <AdminDashboard products={products} />

    <form onSubmit={handleSubmit} className="admin-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Seeds">Seeds</option>
        <option value="Fertilizer">Fertilizer</option>
        <option value="Medicine">Medicine</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">
        {editId ? "Update Product" : "Add Product"}
      </button>
    </form>

    <h3>All Products</h3>

    <div className="admin-products">
      {products.map((p) => (
        <div key={p._id} className="admin-card">
          <img
            src={`http://localhost:5000/uploads/${p.image}`}
            alt={p.name}
          />
          <h4>{p.name}</h4>
          <p>{p.category}</p>

          <div className="admin-actions">
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(p._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
  
);

}

export default Admin;
