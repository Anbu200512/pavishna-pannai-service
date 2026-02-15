import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 6;

  const navigate = useNavigate();

  const loadProducts = () => {
    fetch("https://pavishna-pannai-service-backend.onrender.com/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    loadProducts();
  }, []);
  // 🔥 ADD THIS HERE
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedBrand]);
  

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const token = localStorage.getItem("adminToken");

    const res = await fetch(`https://pavishna-pannai-service-backend.onrender.com/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    loadProducts();
  };

  const handleEdit = (product) => {
    navigate("/admin/add-product", { state: product });
  };

  // Unique categories & brands
  const categories = [
    ...new Set(products.map(p => p.category?.name).filter(Boolean))
  ];

  const brands = [
    ...new Set(products.map(p => p.brand?.name).filter(Boolean))
  ];

  // Filter logic
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(product =>
      selectedCategory
        ? product.category?.name === selectedCategory
        : true
    )
    .filter(product =>
      selectedBrand
        ? product.brand?.name === selectedBrand
        : true
    );

    // Pagination calculations
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);

const totalPages = Math.ceil(filteredProducts.length / productsPerPage);



  return (
    <div>

      {/* 🔍 FILTER SECTION */}
      <div className="admin-filters">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </select>

      </div>

      {/* 🗂 PRODUCT GRID */}
      <div className="admin-products">

        {filteredProducts.length === 0 && <p>No products found</p>}

        {currentProducts.map(product => (
          <div className="admin-card" key={product._id}>
<img
  src={product.image}
  alt={product.name}
/>


            <h4>{product.name}</h4>

            {product.specification && <p>{product.specification}</p>}


            <div className="admin-card-actions">
              <button onClick={() => handleEdit(product)}>✏️ Edit</button>
              <button onClick={() => deleteProduct(product._id)}>🗑 Delete</button>
            </div>
          </div>
        ))}

      </div>
      {/* Pagination */}
{totalPages > 1 && (
  <div className="pagination">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
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
      onClick={() => setCurrentPage(prev => prev + 1)}
    >
      Next
    </button>

  </div>
)}

    </div>
  );
}

export default AdminManageProducts;
