import { useEffect, useState } from "react";

function AdminContact() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
    workingHours: "",
    whatsapp: "",
    mapEmbedLink: ""
  });

  const [loading, setLoading] = useState(true);

  /* LOAD CONTACT SETTINGS */
  useEffect(() => {
    fetch("http://localhost:5000/api/contact-settings")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setForm({
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            workingHours: data.workingHours || "",
            whatsapp: data.whatsapp || "",
            mapEmbedLink: data.mapEmbedLink || ""
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* HANDLE INPUT */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* SAVE CONTACT SETTINGS */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/api/contact-settings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    alert("Contact settings updated successfully");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-contact-page">

      <h2>Contact Settings</h2>

      <form className="admin-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="workingHours"
          placeholder="Working Hours (e.g. Mon-Sat 9AM-6PM)"
          value={form.workingHours}
          onChange={handleChange}
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number (with country code)"
          value={form.whatsapp}
          onChange={handleChange}
        />

        <textarea
          name="mapEmbedLink"
          placeholder="Google Map Embed Link"
          value={form.mapEmbedLink}
          onChange={handleChange}
        />

        <button type="submit">Save Settings</button>

      </form>

    </div>
  );
}

export default AdminContact;
