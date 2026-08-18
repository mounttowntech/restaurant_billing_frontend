import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";
import "./Product.css";

import Modal from "../../components/Common/Modal";

import ProductForm from "./ProductForm";

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductAvailability,
  searchProducts,
} from "../../features/product/productSlice";

const Product = () => {
  const dispatch = useDispatch();

  const {
    products = [],
    loading = false,
    productLoading = false,
    deleteLoading = false,
    error = null,
  } = useSelector((state) => state.product || {});

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    dispatch(fetchProducts());
    console.log("STEP 1 - Product.jsx useEffect RUNNING");
    console.log("STEP 2 - dispatching fetchProducts()");
  }, [dispatch]);
  console.log("Products is :", products);
  // =====================================================
  // OPEN ADD PRODUCT MODAL
  // =====================================================

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT PRODUCT MODAL
  // =====================================================

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // =====================================================
  // CREATE / UPDATE PRODUCT
  // =====================================================

  const handleSubmitProduct = async (formData) => {
    try {
      if (editingProduct?._id) {
        await dispatch(
          updateProduct({
            id: editingProduct._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createProduct(formData)).unwrap();
      }

      handleCloseModal();

      // Refresh list after create/update
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Product save failed:", error);
    }
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDeleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteProduct(id)).unwrap();

      dispatch(fetchProducts());
    } catch (error) {
      console.error("Product delete failed:", error);
    }
  };

  // =====================================================
  // TOGGLE AVAILABILITY
  // =====================================================

  const handleToggleAvailability = async (id) => {
    try {
      await dispatch(toggleProductAvailability(id)).unwrap();
    } catch (error) {
      console.error("Product availability update failed:", error);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      dispatch(fetchProducts());
      return;
    }

    dispatch(searchProducts(value));
  };

  // =====================================================
  // FILTERS
  // =====================================================

  const filteredProducts = products.filter((product) => {
    if (typeFilter !== "All" && product.productType !== typeFilter) {
      return false;
    }

    if (statusFilter === "Available" && !product.isAvailable) {
      return false;
    }

    if (statusFilter === "Unavailable" && product.isAvailable) {
      return false;
    }

    if (statusFilter === "Active" && !product.isActive) {
      return false;
    }

    if (statusFilter === "Inactive" && product.isActive) {
      return false;
    }

    return true;
  });

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalProducts = products.length;

  const availableProducts = products.filter(
    (product) => product.isAvailable,
  ).length;

  const unavailableProducts = products.filter(
    (product) => !product.isAvailable,
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.trackInventory && product.currentStock <= product.minimumStock,
  ).length;

  return (
    <div className="product-page">
      <div className="product-page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your menu items and inventory</p>
        </div>

        <AddButton
          type="button"
          className="product-add-btn"
          onClick={handleAddProduct}
        >
          + Add Product
        </AddButton>
      </div>

      {error && <div className="product-error-box">{error}</div>}

      <div className="product-summary-grid">
        <div className="product-summary-card">
          <div className="product-summary-label">Total Products</div>

          <div className="product-summary-value">{totalProducts}</div>
        </div>

        <div className="product-summary-card">
          <div className="product-summary-label">Available</div>

          <div className="product-summary-value">{availableProducts}</div>
        </div>

        <div className="product-summary-card">
          <div className="product-summary-label">Unavailable</div>

          <div className="product-summary-value">{unavailableProducts}</div>
        </div>

        <div className="product-summary-card">
          <div className="product-summary-label">Low Stock</div>

          <div className="product-summary-value">{lowStockProducts}</div>
        </div>
      </div>
      <div className="product-grid-page">
        <div className="product-toolbar">
          <div className="product-search">
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="product-filter">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Food">Food</option>
              <option value="Beverage">Beverage</option>
              <option value="Addon">Addon</option>
              <option value="Raw Material">Raw Material</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="product-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="product-table-container">
          {loading ? (
            <div className="product-loading">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="product-empty">No products found.</div>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Product Name</th>
                  <th>Type</th>
                  <th>Unit</th>
                  <th>Selling Price</th>
                  <th>Stock</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productCode || "-"}</td>

                    <td>
                      <div className="product-name">
                        {product.productName || "-"}
                      </div>
                    </td>

                    <td>{product.productType || "-"}</td>

                    <td>{product.unit || "-"}</td>

                    <td>
                      {product.sellingPrice !== undefined
                        ? `₹${product.sellingPrice}`
                        : "-"}
                    </td>

                    <td>
                      {product.trackInventory
                        ? product.currentStock
                        : "Not Tracked"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`product-availability-toggle ${
                          product.isAvailable ? "available" : "unavailable"
                        }`}
                        onClick={() => handleToggleAvailability(product._id)}
                      >
                        {product.isAvailable ? "Available" : "Unavailable"}
                      </button>
                    </td>

                    <td>
                      <span
                        className={`product-status-badge ${
                          product.isActive ? "active" : "inactive"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <div className="modal-actions">
                        <EditButton
                          type="button"
                          className="product-edit-btn"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </EditButton>

                        <DeleteButton
                          type="button"
                          className="product-delete-btn"
                          onClick={() => handleDeleteProduct(product._id)}
                          disabled={deleteLoading}
                        >
                          Delete
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Modal
        open={showModal}
        title={editingProduct ? "Edit Product" : "Add Product"}
        onClose={handleCloseModal}
        size="lg"
      >
        <ProductForm
          editingProduct={editingProduct}
          onSubmit={handleSubmitProduct}
          onCancel={handleCloseModal}
          loading={productLoading}
        />
      </Modal>
    </div>
  );
};

export default Product;
