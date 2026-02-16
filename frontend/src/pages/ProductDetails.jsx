import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`https://pavishna-pannai-service-backend.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        document.title = `${data.name} | Pavishna Pannai Service`;

        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
          meta.setAttribute(
            "content",
            data.description
              ? data.description.substring(0, 150)
              : "High quality agricultural product from Pavishna Pannai Service.",
          );
        }

        // Fetch all products for related
        fetch("https://pavishna-pannai-service-backend.onrender.com/api/products")
          .then((res) => res.json())
          .then((allProducts) => {
            const related = allProducts
              .filter(
                (p) =>
                  p.category?.name === data.category?.name &&
                  p._id !== data._id,
              )
              .slice(0, 4);

            setRelatedProducts(related);
          });
      });
  }, [id]);

  if (!product) return <p style={{ padding: "50px" }}>Loading...</p>;

  return (
    <div className="product-details-container">
      {/* MAIN CONTENT */}
      <div className="product-details-main">
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </div>

        <div className="details-info">
          {product.specification && (
            <h1 className="details-spec">{product.specification}</h1>
          )}

          <h1>{product.name}</h1>

          <h2 className="details-category">
            Category: {product.category?.name}
          </h2>

          <h2 className="details-brand">Brand: {product.brand?.name}</h2>

          {product.description && (
            <p className="details-description">{product.description}</p>
          )}
          <div className="product-actions">
            <button className="view-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
                  <button
                    className=" outline-btn"
                    onClick={() =>
                      navigate("/contact", {
                        state: {
                          serviceName: `Hello, I am interested in your product: ${product.name}. Please provide more details.`,
                        },
                      })
                    }
                  >
                    Enquire Now
                  </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h2>Related Products</h2>

          <div className="related-grid">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="related-card"
                onClick={() => navigate(`/products/${item._id}`)}
              >
<img
  src={item.image}
  alt={item.name}
  loading="lazy"
/>

                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
