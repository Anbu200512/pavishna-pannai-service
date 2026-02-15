import { useEffect, useState } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  /* LOAD MESSAGES */
  const loadMessages = () => {
    fetch("https://pavishna-pannai-service-backend.onrender.com/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  /* DELETE MESSAGE */
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    const res = await fetch(`https://pavishna-pannai-service-backend.onrender.com/api/messages/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadMessages();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-messages-page">
      <h2>Contact Messages</h2>

      {messages.length === 0 && <p>No messages found</p>}

      <div className="admin-messages-grid">
        {messages.map((msg) => (
          <div key={msg._id} className="admin-message-card">
            <h4>{msg.name}</h4>

            <p>
              <strong>Phone:</strong> {msg.phone}
            </p>

            {msg.email && (
              <p>
                <strong>Email:</strong> {msg.email}
              </p>
            )}

            <p className="admin-message-text">
              {msg.message.length > 120
                ? msg.message.substring(0, 120) + "..."
                : msg.message}
            </p>

            <small>{new Date(msg.createdAt).toLocaleString()}</small>

<div className="admin-card-actions">

  <button
    onClick={() => {
      const phone = msg.phone.replace(/\D/g, ""); // remove spaces or +
      const text = encodeURIComponent(
        `Hello ${msg.name},\n\nThank you for contacting Pavishna Pannai Service.\n\nRegarding your message:\n"${msg.message}"\n\nWe will get back to you shortly.`
      );

      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    }}
  >
    💬 Reply
  </button>

  <button
    className="delete"
    onClick={() => deleteMessage(msg._id)}
  >
    🗑️ Delete
  </button>

</div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMessages;
