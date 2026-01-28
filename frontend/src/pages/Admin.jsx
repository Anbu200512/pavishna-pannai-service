import { useState } from "react";

function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("image", image);

    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      alert("Product added with image");
      setName("");
      setCategory("");
      setImage(null);
    }
  };

  return (
    <section className="admin">
      <h2>Admin Panel</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </section>
  );
}

export default Admin;
