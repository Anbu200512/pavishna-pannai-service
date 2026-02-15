import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Farm Services | Pavishna Pannai Service";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Professional agricultural services including consultation, equipment support, and timely farm solutions.",
      );
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  if (!services.length) {
    return <div className="services-section">Loading services...</div>;
  }

  return (
    <div className="services-section">
      <div className="services-header">
        <h1>Our Agricultural Services</h1>
        <p>
          Reliable and professional solutions to support modern farming
          practices.
        </p>
      </div>

      {services.map((service, index) => (
        <div
          key={service._id}
          className={`service-row ${index % 2 !== 0 ? "reverse" : ""}`}
        >
          <div className="service-image">
            <img
              src={`http://localhost:5000/${service.image?.replace(/\\/g, "/")}`}
              alt={service.title}
            />
          </div>

          <div className="service-content">
            <h2>{service.title}</h2>
            <p>{service.description}</p>

            <button
              className="view-btn outline-btn"
              onClick={() =>
                navigate("/contact", {
                  state: {
                    serviceName: `Hello, I am interested in your service: ${service.title}. Please provide more details.`,
                  },
                })
              }
            >
              Enquire Now →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;
