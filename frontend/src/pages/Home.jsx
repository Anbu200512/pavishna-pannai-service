import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSeedling,
  FaTools,
  FaTruck,
  FaUserTie,
  FaClock,
  FaUsers,
  FaBoxOpen,
  FaSmile,
  FaShieldAlt,
  FaHandshake,
  FaLeaf ,
  FaStar,
  FaWhatsapp,
  FaPhoneAlt,
FaEnvelope,
FaPlus 
} from "react-icons/fa";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const startX = useRef(0);

  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const fabRef = useRef(null);
  const [farmers, setFarmers] = useState(0);

  const [years, setYears] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialStartX = useRef(0);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/contact-settings`)
    .then((res) => res.json())
    .then((data) => setContact(data))
    .catch((err) => console.error(err));
}, []);


  const testimonials = [
    {
      name: "Ramesh Kumar",
      location: "Farmer – Villupuram",
      message: "Excellent quality products. My crops have shown better growth after using their fertilizers.",
      rating: 5,
    },
    {
      name: "Sivagami",
      location: "Farmer – Villupuram",
      message: "Very reliable service and genuine agricultural inputs. I always receive fresh stock and proper guidance.",
      rating: 5,
    },
    {
      name: "Manikandan",
      location: "Farmer – Villupuram",
      message: "Affordable prices with premium quality seeds. My yield increased this season.",
      rating: 4,
    },
  ];

  useEffect(() => {
    document.title = "Pavishna Pannai Service | Quality Agricultural Solutions";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Pavishna Pannai Service provides high-quality agricultural products and reliable farm services to support modern farming.",
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleTestimonialTouchStart = (e) => {
    testimonialStartX.current = e.touches[0].clientX;
  };

  const handleTestimonialTouchEnd = (e) => {
    const diff = testimonialStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) {
      setTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }

    if (diff < -50) {
      setTestimonialIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1,
      );
    }
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (fabRef.current && !fabRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  /* FETCH PRODUCTS */
  useEffect(() => {
    fetch("https://pavishna-pannai-service-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 6)))
      .catch((err) => console.log(err));
  }, []);

  /* FETCH CONTACT INFO */
  useEffect(() => {
    fetch("https://pavishna-pannai-service-backend.onrender.com/api/contact")
      .then((res) => res.json())
      .then((data) => setContact(data))
      .catch((err) => console.log(err));
  }, []);

  /* AUTO SLIDE */
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      // eslint-disable-next-line react-hooks/immutability
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, products]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = isMobile ? products.length - 1 : products.length - 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  /* SWIPE SUPPORT */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  /* Scroll Trigger */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* Animated Counter */
  useEffect(() => {
    if (!startCount) return;

    const interval = setInterval(() => {
      setFarmers((prev) => (prev < 100 ? prev + 2 : 100));
      setProductsCount((prev) => (prev < 250 ? prev + 5 : 250));
      setYears((prev) => (prev < 5 ? prev + 1 : 5));
      setSatisfaction((prev) => (prev < 95 ? prev + 2 : 95));
    }, 30);

    return () => clearInterval(interval);
  }, [startCount]);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const visiblePoint = 100;

        if (elementTop < windowHeight - visiblePoint) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1>Supporting Farmers with Quality & Care</h1>

          <p>
            Pavishna Pannai Service provides quality agricultural products,
            modern equipment, and reliable services to support farmers and
            agriculture businesses.
          </p>


          <div className="hero-buttons">
            <Link to="/services" className="btn">
              View Services
            </Link>

            <Link to="/products" className="btn">
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="home-about">
        <div className="home-about-container">
          {/* LEFT IMAGE */}
          <div className="home-about-image">
            <img src="/home-about.png" alt="About Pavishna Pannai Service" loading="lazy"/>
          </div>

          {/* RIGHT CONTENT */}
          <div className="home-about-content">
            <h2>About Pavishna Pannai Service</h2>

            <p>
              Pavishna Pannai Service is committed to supporting farmers with
              reliable agricultural products and dependable service solutions.
            </p>

            <p>
              With a strong focus on quality, innovation, and long-term
              relationships, we aim to empower farmers to achieve better
              productivity and sustainable growth.
            </p>

            <p className="home-about-highlight">
              Our mission is simple — To grow together with the farming
              community.
            </p>

            <button
              className="btn"
              onClick={() => (window.location.href = "/about")}
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="featured-section">
        <div className="featured-header">
          <h2>Featured Products</h2>
          <p>Explore our popular agricultural products</p>
        </div>

        <div
          className="slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="slider-track"
            style={{
              transform: isMobile
                ? `translateX(-${currentIndex * 100}%)`
                : `translateX(-${currentIndex * (100 / 3)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="slide-card"
                onClick={() => navigate(`/products/${product._id}`)}
              >
<img
  src={product.image}
  alt={product.name}
  loading="lazy"
/>


                <h3>{product.name}</h3>

                <div className="slide-buttons">
                  <button
                    className="view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product._id}`);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="outline-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/contact", {
                        state: {
                          message: `Hello, I am interested in your product: ${product.name}. Please provide more details.`,
                        },
                      });
                    }}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DOTS ================= */}
        <div className="slider-dots">
          {products.map((_, index) => {
            if (index > maxIndex) return null;

            return (
              <span
                key={index}
                className={currentIndex === index ? "active" : ""}
                onClick={() => setCurrentIndex(index)}
              ></span>
            );
          })}
        </div>
      </section>

      {/* ================= SERVICES HIGHLIGHT ================= */}
      <section className="home-services">
        <div className="home-services-container">
          {/* LEFT CONTENT */}
          <div className="home-services-content">
            <h2>Supporting Farmers at Every Stage</h2>

            <p className="home-services-intro">
              Farming today requires the right products, proper guidance, and
              reliable support to achieve consistent results.
            </p>

            <ul className="home-services-list">
              <li>
                <FaSeedling className="service-icon" />
                Expert consultation for crop and soil improvement
              </li>

              <li>
                <FaTools className="service-icon" />
                Reliable farm equipment support
              </li>

              <li>
                <FaTruck className="service-icon" />
                Quality product supply
              </li>

              <li>
                <FaUserTie className="service-icon" />
                On-field technical assistance
              </li>

              <li>
                <FaClock className="service-icon" />
                Fast response and dependable service
              </li>
            </ul>

            <p className="home-services-closing">
              We don’t just supply products — we stand beside you throughout
              your farming journey.
            </p>

            <div className="home-services-buttons">
              <button
                className="btn"
                onClick={() => (window.location.href = "/services")}
              >
                Discover Our Services
              </button>

              <button
                className="outline-btn"
                onClick={() => navigate("/services")}
              >
                Talk to Our Experts
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="home-services-image">
            <img src="/home-service.png" alt="Farm Service" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ================= STATISTICS SECTION ================= */}
      <section className="home-stats" ref={statsRef}>
        <div className="home-stats-container">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h3>{farmers}+</h3>
            <p>Farmers Served</p>
          </div>

          <div className="stat-card">
            <FaBoxOpen className="stat-icon" />
            <h3>{productsCount}+</h3>
            <p>Products Delivered</p>
          </div>

          <div className="stat-card">
            <FaSeedling className="stat-icon" />
            <h3>{years}+</h3>
            <p>Years of Experience</p>
          </div>

          <div className="stat-card">
            <FaSmile className="stat-icon" />
            <h3>{satisfaction}%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* ================= PREMIUM WHY CHOOSE US ================= */}
      <section className="why-section">
        <div className="why-header">
          <h2>Why Choose Pavishna Pannai Service?</h2>
          <p>
            We deliver quality, reliability, and long-term agricultural support
            to help farmers grow confidently.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card reveal">
            <div className="icon-circle">
              <FaSeedling />
            </div>
            <h3>Quality Products</h3>
            <p>
              Trusted agricultural inputs that enhance productivity and support
              sustainable farming.
            </p>
          </div>

          <div className="why-card reveal">
            <div className="icon-circle">
              <FaShieldAlt />
            </div>
            <h3>Trusted Service</h3>
            <p>
              Honest guidance and dependable support for every farming need.
            </p>
          </div>

          <div className="why-card reveal">
            <div className="icon-circle">
              <FaTruck />
            </div>
            <h3>Timely Delivery</h3>
            <p>
              Reliable supply chain ensuring products reach farmers on time.
            </p>
          </div>

          <div className="why-card reveal">
            <div className="icon-circle">
              <FaUsers />
            </div>
            <h3>Farmer-Centered Approach</h3>
            <p>
              Practical solutions designed for real agricultural challenges.
            </p>
          </div>

          <div className="why-card reveal">
            <div className="icon-circle">
              <FaHandshake />
            </div>
            <h3>Long-Term Partnership</h3>
            <p>
              Building strong relationships based on trust and transparency.
            </p>
          </div>
          <div className="why-card reveal">
  <div className="icon-circle">
    <FaLeaf />
  </div>
  <h3>Expert Farming Guidance</h3>
  <p>
    Professional advice and modern agricultural techniques to improve crop
    yield and soil health.
  </p>
</div>

          
        </div>
      </section>
      {/* ================= FINAL CTA SECTION ================= */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Grow With Us?</h2>

          <p>
            Join hundreds of farmers who trust Pavishna Pannai Service for
            quality products and dependable agricultural support.
          </p>

          <div className="cta-buttons">
            <button className="btn" onClick={() => navigate("/products")}>
              Explore Products
            </button>

            <button
              className="outline-btn"
              onClick={() => navigate("/contact")}
            >
              Contact Our Experts
            </button>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="testimonial-section">
        <div className="testimonial-header">
          <h2>What Farmers Say About Us</h2>
          <p>Trusted by hundreds of happy farmers</p>
        </div>

        <div
          className="testimonial-slider"
          onTouchStart={handleTestimonialTouchStart}
          onTouchEnd={handleTestimonialTouchEnd}
        >
          <div
            className="testimonial-track"
            style={{
              transform: `translateX(-${testimonialIndex * 100}%)`,
            }}
          >
            {testimonials.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <div className="stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="testimonial-text">"{item.message}"</p>

                <div className="testimonial-user">
                  <h4>{item.name}</h4>
                  <span>{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOT INDICATORS */}
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={testimonialIndex === index ? "active" : ""}
              onClick={() => setTestimonialIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* ================= WHATSAPP FLOAT ================= */}
<div
  ref={fabRef}
  className={`floating-contact ${open ? "open" : ""}`}
>

  {/* Main + Button (visible only when closed) */}
  {!open && (
    <div
      className="float-btn main-btn"
      onClick={() => setOpen(true)}
    >
      <FaPlus />
    </div>
  )}

  {/* Expanded Buttons (visible only when open) */}
  {open && (
    <>
      <a
        href={`https://wa.me/${contact?.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn whatsapp sub-btn"
      >
        <FaWhatsapp />
      </a>

      <a
        href={`tel:${contact?.phone}`}
        className="float-btn call sub-btn"
      >
        <FaPhoneAlt />
      </a>

      <a
        href={`mailto:${contact?.email}`}
        className="float-btn mail sub-btn"
      >
        <FaEnvelope />
      </a>
    </>
  )}
</div>

      
    </>
  );
}

export default Home;
