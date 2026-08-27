import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import Modal from "../../components/Common/Modal";

import CategoryForm from "./CategoryForm";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  changeCategoryStatus,
} from "../../features/category/categorySlice";

import "./Category.css";

const Category = () => {
  const dispatch = useDispatch();

  // =====================================================
  // REDUX STATE
  // =====================================================

  const {
    categories = [],
    loading = false,
    categoryLoading = false,
    deleteLoading = false,
    error = null,
  } = useSelector((state) => state.category || {});

  const { stores = [] } = useSelector((state) => state.stores || {});
  const { restaurants = [] } = useSelector((state) => state.restaurants || {});
  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [kitchenFilter, setKitchenFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  useEffect(() => {
    dispatch(fetchCategories());

    console.log("STEP 1 - Category.jsx useEffect RUNNING");
    console.log("STEP 2 - dispatching fetchCategories()");
  }, [dispatch]);

  console.log("Categories are :", categories);

  // =====================================================
  // OPEN ADD CATEGORY MODAL
  // =====================================================

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT CATEGORY MODAL
  // =====================================================

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  // =====================================================
  // CREATE / UPDATE CATEGORY
  // =====================================================

  const handleSubmitCategory = async (formData) => {
    try {
      if (editingCategory?._id) {
        await dispatch(
          updateCategory({
            id: editingCategory._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createCategory(formData)).unwrap();
      }

      handleCloseModal();

      // Refresh from backend
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Category save failed:", error);
    }
  };

  // =====================================================
  // DELETE CATEGORY
  // =====================================================

  const handleDeleteCategory = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteCategory(id)).unwrap();

      dispatch(fetchCategories());
    } catch (error) {
      console.error("Category delete failed:", error);
    }
  };

  // =====================================================
  // CHANGE CATEGORY STATUS
  // =====================================================

  const handleChangeStatus = async (id) => {
    try {
      await dispatch(changeCategoryStatus(id)).unwrap();
    } catch (error) {
      console.error("Category status update failed:", error);
    }
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      // -----------------------------
      // SEARCH
      // -----------------------------

      const searchValue = search.trim().toLowerCase();

      if (searchValue) {
        const categoryCode = category.categoryCode?.toLowerCase() || "";

        const categoryName = category.categoryName?.toLowerCase() || "";

        const kitchenCategory = category.kitchenCategory?.toLowerCase() || "";

        const matchesSearch =
          categoryCode.includes(searchValue) ||
          categoryName.includes(searchValue) ||
          kitchenCategory.includes(searchValue);

        if (!matchesSearch) {
          return false;
        }
      }

      // -----------------------------
      // KITCHEN FILTER
      // -----------------------------

      if (
        kitchenFilter !== "All" &&
        category.kitchenCategory !== kitchenFilter
      ) {
        return false;
      }

      // -----------------------------
      // STATUS FILTER
      // -----------------------------

      if (statusFilter === "Active" && !category.isActive) {
        return false;
      }

      if (statusFilter === "Inactive" && category.isActive) {
        return false;
      }

      if (statusFilter === "Available" && !category.isAvailable) {
        return false;
      }

      if (statusFilter === "Unavailable" && category.isAvailable) {
        return false;
      }

      return true;
    });
  }, [categories, search, kitchenFilter, statusFilter]);

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.isActive,
  ).length;

  const inactiveCategories = categories.filter(
    (category) => !category.isActive,
  ).length;

  const availableCategories = categories.filter(
    (category) => category.isAvailable,
  ).length;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="category-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="category-page-header">
        <div>
          <h1>Categories</h1>

          <p>Manage your menu categories</p>
        </div>

        <AddButton
          type="button"
          className="category-add-btn"
          onClick={handleAddCategory}
        >
          + Add Category
        </AddButton>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && <div className="category-error-box">{error}</div>}

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="category-summary-grid">
        <div className="category-summary-card">
          <div className="category-summary-label">Total Categories</div>

          <div className="category-summary-value">{totalCategories}</div>
        </div>

        <div className="category-summary-card">
          <div className="category-summary-label">Active</div>

          <div className="category-summary-value">{activeCategories}</div>
        </div>

        <div className="category-summary-card">
          <div className="category-summary-label">Inactive</div>

          <div className="category-summary-value">{inactiveCategories}</div>
        </div>

        <div className="category-summary-card">
          <div className="category-summary-label">Available</div>

          <div className="category-summary-value">{availableCategories}</div>
        </div>
      </div>

      {/* =================================================
          MAIN GRID
      ================================================= */}

      <div className="category-grid-page">
        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="category-toolbar">
          {/* SEARCH */}

          <div className="category-search">
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* KITCHEN FILTER */}

          <div className="category-filter">
            <select
              value={kitchenFilter}
              onChange={(e) => setKitchenFilter(e.target.value)}
            >
              <option value="All">All Kitchens</option>

              <option value="Main Kitchen">Main Kitchen</option>

              <option value="Chinese">Chinese</option>

              <option value="South Indian">South Indian</option>

              <option value="North Indian">North Indian</option>

              <option value="Tandoor">Tandoor</option>

              <option value="Bakery">Bakery</option>

              <option value="Dessert">Dessert</option>

              <option value="Beverage">Beverage</option>

              <option value="Bar">Bar</option>

              <option value="Fast Food">Fast Food</option>
            </select>
          </div>

          {/* STATUS FILTER */}

          <div className="category-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>

              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>

              <option value="Available">Available</option>

              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="category-table-container">
          {loading ? (
            <div className="category-loading">Loading categories...</div>
          ) : filteredCategories.length === 0 ? (
            <div className="category-empty">No categories found.</div>
          ) : (
            <table className="category-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Category Name</th>
                  <th>Parent Category</th>
                  <th>Kitchen</th>
                  <th>GST</th>
                  <th>Veg</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.slice(0, 2).map((category) => (
                  <tr key={category._id}>
                    {/* CODE */}

                    <td>{category.categoryCode || "-"}</td>

                    {/* NAME */}

                    <td>
                      <div className="category-name">
                        {category.categoryName || "-"}
                      </div>
                    </td>

                    {/* PARENT */}

                    <td>
                      {category.parentCategory?.categoryName || "Main Category"}
                    </td>

                    {/* KITCHEN */}

                    <td>{category.kitchenCategory || "-"}</td>

                    {/* GST */}

                    <td>
                      {category.gstPercentage !== undefined
                        ? `${category.gstPercentage}%`
                        : "-"}
                    </td>

                    {/* VEG */}

                    <td>{category.isVegCategory ? "Veg" : "Non-Veg"}</td>

                    {/* AVAILABLE */}

                    <td>
                      <span
                        className={`category-availability-badge ${
                          category.isAvailable ? "available" : "unavailable"
                        }`}
                      >
                        {category.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td>
                      <button
                        type="button"
                        className={`category-status-toggle ${
                          category.isActive ? "active" : "inactive"
                        }`}
                        onClick={() => handleChangeStatus(category._id)}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    {/* DISPLAY ORDER */}

                    <td>{category.displayOrder ?? 0}</td>

                    {/* ACTIONS */}

                    <td>
                      <div className="modal-actions">
                        <EditButton
                          type="button"
                          className="category-edit-btn"
                          onClick={() => handleEditCategory(category)}
                        >
                          Edit
                        </EditButton>

                        <DeleteButton
                          type="button"
                          className="category-delete-btn"
                          onClick={() => handleDeleteCategory(category._id)}
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

      {/* =================================================
          MODAL
          Your existing Modal handles modal-header/body
      ================================================= */}

      <Modal
        open={showModal}
        title={editingCategory ? "Edit Category" : "Add Category"}
        onClose={handleCloseModal}
        size="lg"
      >
        <CategoryForm
          editingCategory={editingCategory}
          categories={categories}
          onSubmit={handleSubmitCategory}
          onCancel={handleCloseModal}
          loading={categoryLoading}
          restaurants={restaurants}
          stores={stores}
        />
      </Modal>
    </div>
  );
};

export default Category;
