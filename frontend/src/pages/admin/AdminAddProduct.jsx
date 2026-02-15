import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";


function AdminAddProduct({ setActiveView }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");

  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showBrandInput, setShowBrandInput] = useState(false);

const location = useLocation();
const editProduct = location.state;
const fileInputRef = useRef(null);

const getInitialEditState = () => {
  if (editProduct) {
    return {
      editId: editProduct._id,
      form: {
        name: editProduct.name,
        specification: editProduct.specification,
        description: editProduct.description,
        category: editProduct.category,
        brand: editProduct.brand,
        image: editProduct.image,
      },
    };
  }
  return {
    editId: null,
    form: {
      name: "",
      specification: "",
      description: "",
      category: "",
      brand: "",
      image: null,
    },
  };
};

const [editState, setEditState] = useState(getInitialEditState());

const setForm = (formData) => setEditState(prev => ({ ...prev, form: formData }));
const form = editState.form;
const editId = editState.editId;

/* ================= LOAD CATEGORIES ================= */
useEffect(() => {
  fetch("https://pavishna-pannai-service-backend.onrender.com/api/categories")
    .then(res => res.json())
    .then(data => setCategories(data));
}, []);

/* ================= LOAD BRANDS ================= */
useEffect(() => {
  fetch("https://pavishna-pannai-service-backend.onrender.com/api/brands")
    .then(res => res.json())
    .then(data => setBrands(data));
}, []);


  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  /* ================= ADD / UPDATE PRODUCT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("specification", form.specification);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("brand", form.brand);

    if (form.image) {
      data.append("image", form.image);
    }

    let url = "https://pavishna-pannai-service-backend.onrender.com/api/products/add";
    let method = "POST";

    if (editId) {
      url = `https://pavishna-pannai-service-backend.onrender.com/api/products/${editId}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      body: data,
    });

    if (!res.ok) {
      alert("Operation failed");
      return;
    }

    alert(editId ? "Product updated successfully" : "Product added successfully");

    resetForm();
    setActiveView("manage");
  };

const resetForm = () => {
  setEditState({
    editId: null,
    form: {
      name: "",
      specification: "",
      description: "",
      category: "",
      brand: "",
      image: null,
    },
  });

  // 🔥 Clear file input visually
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};


  /* ================= DELETE CATEGORY ================= */
  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    await fetch(`https://pavishna-pannai-service-backend.onrender.com/api/categories/${id}`, {
      method: "DELETE",
    });

    setCategories(categories.filter(c => c._id !== id));
    setForm({ ...form, category: "" });
  };

  /* ================= DELETE BRAND ================= */
  const deleteBrand = async (id) => {
    if (!window.confirm("Delete this brand?")) return;

    await fetch(`https://pavishna-pannai-service-backend.onrender.com/api/brands/${id}`, {
      method: "DELETE",
    });

    setBrands(brands.filter(b => b._id !== id));
    setForm({ ...form, brand: "" });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h3>{editId ? "Edit Product" : "Add Product"}</h3>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        required
        value={form.name}
        onChange={handleChange}
      />

      <textarea
        name="specification"
        placeholder="Specification"
        value={form.specification}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Product Description"
        value={form.description}
        onChange={handleChange}
      />

      {/* ================= CATEGORY SELECT ================= */}
      <select
        name="category"
        value={form.category}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "add-new") {
            setShowCategoryInput(true);
            return;
          }

          if (value === "delete-selected") {
            if (!form.category) {
              alert("Select category first");
              return;
            }
            deleteCategory(form.category);
            return;
          }

          setForm({ ...form, category: value });
        }}
        required
      >
        <option value="">Select Category</option>

        {categories.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}

        <option value="add-new">+ Add New Category</option>
        <option value="delete-selected">🗑 Delete Selected Category</option>
      </select>

      {showCategoryInput && (
        <>
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <button
            type="button"
            onClick={async () => {
              const res = await fetch(
                "https://pavishna-pannai-service-backend.onrender.com/api/categories/add",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: newCategory }),
                }
              );

              const data = await res.json();

              setCategories([...categories, data]);
              setForm({ ...form, category: data._id });
              setNewCategory("");
              setShowCategoryInput(false);
            }}
          >
            Save Category
          </button>
        </>
      )}

      {/* ================= BRAND SELECT ================= */}
      <select
        name="brand"
        value={form.brand}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "add-new") {
            setShowBrandInput(true);
            return;
          }

          if (value === "delete-selected") {
            if (!form.brand) {
              alert("Select brand first");
              return;
            }
            deleteBrand(form.brand);
            return;
          }

          setForm({ ...form, brand: value });
        }}
        required
      >
        <option value="">Select Brand</option>

        {brands.map(b => (
          <option key={b._id} value={b._id}>
            {b.name}
          </option>
        ))}

        <option value="add-new">+ Add New Brand</option>
        <option value="delete-selected">🗑 Delete Selected Brand</option>
      </select>

      {showBrandInput && (
        <>
          <input
            type="text"
            placeholder="New Brand Name"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
          />

          <button
            type="button"
            onClick={async () => {
              const res = await fetch(
                "https://pavishna-pannai-service-backend.onrender.com/api/brands/add",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: newBrand }),
                }
              );

              const data = await res.json();

              setBrands([...brands, data]);
              setForm({ ...form, brand: data._id });
              setNewBrand("");
              setShowBrandInput(false);
            }}
          >
            Save Brand
          </button>
        </>
      )}

<input
  type="file"
  name="image"
  accept="image/*"
  onChange={handleChange}
  required={!editId}
  ref={fileInputRef}
/>


      <button type="submit">
        {editId ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default AdminAddProduct;
