import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Agricultural Products | Pavishna Pannai Service";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Explore quality agricultural products including fertilizers, equipment, and farming essentials from Pavishna Pannai Service.",
      );
    }
  }, []);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  /* ================= LOCK SCROLL WHEN SIDEBAR OPEN ================= */
  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "auto";
  }, [showSidebar]);

  /* ================= UNIQUE CATEGORY & BRAND ================= */
  const categories = [
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ];

  const brands = [
    ...new Set(products.map((p) => p.brand?.name).filter(Boolean)),
  ];

  /* ================= FILTER LOGIC ================= */
const filteredProducts = products.filter((product) => {

  const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, "");
  const normalizedName = product.name?.toLowerCase().replace(/\s+/g, "");
  const normalizedSpec = product.specification?.toLowerCase().replace(/\s+/g, "");
  const normalizedCategory = product.category?.name?.toLowerCase();
  const normalizedBrand = product.brand?.name?.toLowerCase();

  const matchSearch =
    normalizedName?.includes(normalizedSearch) ||
    normalizedSpec?.includes(normalizedSearch) ||
    normalizedCategory?.includes(searchTerm.toLowerCase()) ||
    normalizedBrand?.includes(searchTerm.toLowerCase());

  const matchCategory =
    selectedCategories.length === 0 ||
    selectedCategories.includes(product.category?.name);

  const matchBrand =
    selectedBrands.length === 0 ||
    selectedBrands.includes(product.brand?.name);

  return matchSearch && matchCategory && matchBrand;
});


  

  // /* ================= RESET PAGE WHEN FILTER CHANGES ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedBrands]);

  // /* ================= PAGINATION ================= */
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  /* ================= TOGGLE CATEGORY ================= */
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  /* ================= TOGGLE BRAND ================= */
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  /* ================= CLEAR FILTERS ================= */
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchTerm("");
  };

  return (
    <div className="products-container">
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="mobile-topbar">
        <div className="mobile-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="mobile-filter-btn"
          onClick={() => setShowSidebar(true)}
        >
          ☰ Filters
        </button>
      </div>

      <div className="products-layout">
        {/* ================= SIDEBAR ================= */}
        <div className={`products-sidebar ${showSidebar ? "active" : ""}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-btn" onClick={() => setShowSidebar(false)}>
              ✖
            </button>
          </div>

          {/* SEARCH */}
          <div className="sidebar-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* CATEGORY FILTER */}
          <div className="filter-section">
            <h4>📂 Categories</h4>
            {categories.map((cat, index) => (
              <label key={index} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          {/* BRAND FILTER */}
          <div className="filter-section">
            <h4>🏷 Brands</h4>
            {brands.map((brand, index) => (
              <label key={index} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>

          <button className="clear-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>

        {/* OVERLAY */}
        {showSidebar && (
          <div className="overlay" onClick={() => setShowSidebar(false)}></div>
        )}

        {/* ================= PRODUCT GRID ================= */}
        <div className="product-grid">
          {currentProducts.map((product) => (
            <div className="product-card" key={product._id}>
       <div className="product-image">
  <img
    src={product.image}
    alt={product.name}
    loading="lazy"
  />
</div>

              <div className="product-info">
                <h3>{product.name}</h3>

                {product.specification && (
                  <p className="product-spec">{product.specification}</p>
                )}

                <div className="product-actions">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="view-btn outline-btn"
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
          ))}
        </div>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
