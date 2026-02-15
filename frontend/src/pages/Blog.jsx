function Blog() {

  const blogs = [
    {
      title: "Best Fertilizers for Paddy Farming",
      description:
        "Learn how to select the right fertilizer to increase yield and improve soil health.",
      image: "/blog1.jpg"
    },
    {
      title: "Modern Irrigation Techniques",
      description:
        "Explore efficient irrigation methods that save water and increase productivity.",
      image: "/blog2.jpg"
    },
    {
      title: "How to Improve Soil Health Naturally",
      description:
        "Organic methods and tips to enhance soil fertility for better crop growth.",
      image: "/blog3.jpg"
    }
  ];

  return (
    <section className="blog-section">

      <div className="blog-header">
        <h1>Farming Tips & Insights</h1>
        <p>Stay updated with agricultural knowledge and best practices.</p>
      </div>

      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">

            <img src={blog.image} alt={blog.title} />

            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <button className="btn">Read More</button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Blog;
