import { useEffect, useState } from "react";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [activeView, setActiveView] = useState("add");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null
  });

  /* LOAD SERVICES */
  const loadServices = () => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => setServices(data));
  };

  useEffect(() => {
    if (activeView === "manage") {
      loadServices();
    }
  }, [activeView]);

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };

  /* ADD / UPDATE SERVICE */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);

    if (form.image) {
      data.append("image", form.image);
    }

    let url = "http://localhost:5000/api/services/add";
    let method = "POST";

    if (editId) {
      url = `http://localhost:5000/api/services/${editId}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      body: data
    });

    if (!res.ok) {
      alert("Operation failed");
      return;
    }

    alert(editId ? "Service updated" : "Service added");

    setForm({ title: "", description: "", image: null });
    setEditId(null);
    setActiveView("manage");
  };

  /* DELETE SERVICE */
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "DELETE"
    });

    loadServices();
  };

  return (
    <div className="admin-service-page">

      <h2>Services Management</h2>

      <div className="admin-actions">
        <button onClick={() => setActiveView("add")}>
          ➕ Add Service
        </button>

        <button onClick={() => setActiveView("manage")}>
          📦 Manage Services
        </button>
      </div>

      {/* ADD SERVICE */}
      {activeView === "add" && (
        <form className="admin-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Service Title"
            required
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Service Description"
            required
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            required={!editId}
            onChange={handleChange}
          />

          <button type="submit">
            {editId ? "Update Service" : "Save Service"}
          </button>

        </form>
      )}

      {/* MANAGE SERVICES */}
{activeView === "manage" && (
  <div className="admin-services-grid">

    {services.length === 0 && <p>No services found</p>}

    {services.map(service => (
      <div key={service._id} className="admin-service-card">

        <img
          src={`http://localhost:5000/${service.image}`}
          alt={service.title}
        />

        <div className="admin-service-content">
          <h4>{service.title}</h4>

          <p>
            {service.description.length > 90
              ? service.description.substring(0, 90) + "..."
              : service.description}
          </p>

          <div className="admin-card-actions">

            <button
              onClick={() => {
                setActiveView("add");
                setEditId(service._id);
                setForm({
                  title: service.title,
                  description: service.description,
                  image: null
                });
              }}
            >
              ✏️
            </button>

            <button
              className="delete"
              onClick={() => deleteService(service._id)}
            >
              🗑️
            </button>

          </div>
        </div>

      </div>
    ))}

  </div>
)}


    </div>
  );
}

export default AdminServices;
