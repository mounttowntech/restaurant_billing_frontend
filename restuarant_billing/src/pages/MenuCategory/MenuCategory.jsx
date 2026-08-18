import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import "./MenuCategory.css";

import Modal from "../../components/Common/Modal";

import MenuCategoryForm from "./MenuCategoryForm";

import {
  fetchMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  toggleMenuCategoryAvailability,
  toggleMenuCategoryActive,
  searchMenuCategories,
} from "../../features/menuCategory/menuCategorySlice";

const MenuCategory = () => {
  const dispatch = useDispatch();

  const {
    menuCategories = [],
    loading = false,
    menuCategoryLoading = false,
    deleteLoading = false,
    error = null,
  } = useSelector((state) => state.menuCategory || {});

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingMenuCategory, setEditingMenuCategory] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [foodTypeFilter, setFoodTypeFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [kitchenFilter, setKitchenFilter] = useState("All");

  // =====================================================
  // FETCH MENU CATEGORIES
  // =====================================================

  useEffect(() => {
    dispatch(fetchMenuCategories());

    console.log("STEP 1 - MenuCategory.jsx useEffect RUNNING");

    console.log("STEP 2 - dispatching fetchMenuCategories()");
  }, [dispatch]);

  console.log("Menu Categories are:", menuCategories);

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const handleAddMenuCategory = () => {
    setEditingMenuCategory(null);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEditMenuCategory = (category) => {
    setEditingMenuCategory(category);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMenuCategory(null);
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmitMenuCategory = async (formData) => {
    try {
      if (editingMenuCategory?._id) {
        await dispatch(
          updateMenuCategory({
            id: editingMenuCategory._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createMenuCategory(formData)).unwrap();
      }

      handleCloseModal();

      dispatch(fetchMenuCategories());
    } catch (error) {
      console.error("Menu category save failed:", error);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDeleteMenuCategory = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu category?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteMenuCategory(id)).unwrap();

      dispatch(fetchMenuCategories());
    } catch (error) {
      console.error("Menu category delete failed:", error);
    }
  };

  // =====================================================
  // TOGGLE AVAILABILITY
  // =====================================================

  const handleToggleAvailability = async (id) => {
    try {
      await dispatch(toggleMenuCategoryAvailability(id)).unwrap();

      dispatch(fetchMenuCategories());
    } catch (error) {
      console.error("Menu category availability update failed:", error);
    }
  };

  // =====================================================
  // TOGGLE ACTIVE
  // =====================================================

  const handleToggleActive = async (id) => {
    try {
      await dispatch(toggleMenuCategoryActive(id)).unwrap();

      dispatch(fetchMenuCategories());
    } catch (error) {
      console.error("Menu category active status update failed:", error);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      dispatch(fetchMenuCategories());
      return;
    }

    dispatch(searchMenuCategories(value));
  };

  // =====================================================
  // FILTERS
  // =====================================================

  const filteredMenuCategories = menuCategories.filter((category) => {
    if (foodTypeFilter !== "All" && category.foodType !== foodTypeFilter) {
      return false;
    }

    if (kitchenFilter !== "All" && category.kitchenSection !== kitchenFilter) {
      return false;
    }

    if (statusFilter === "Available" && !category.isAvailable) {
      return false;
    }

    if (statusFilter === "Unavailable" && category.isAvailable) {
      return false;
    }

    if (statusFilter === "Active" && !category.isActive) {
      return false;
    }

    if (statusFilter === "Inactive" && category.isActive) {
      return false;
    }

    return true;
  });

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalCategories = menuCategories.length;

  const availableCategories = menuCategories.filter(
    (category) => category.isAvailable,
  ).length;

  const unavailableCategories = menuCategories.filter(
    (category) => !category.isAvailable,
  ).length;

  const popularCategories = menuCategories.filter(
    (category) => category.isPopular,
  ).length;

  return (
    <div className="menu-category-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="menu-category-page-header">
        <div>
          <h1>Menu Categories</h1>

          <p>Manage your restaurant menu categories</p>
        </div>

        <AddButton
          type="button"
          className="menu-category-add-btn"
          onClick={handleAddMenuCategory}
        >
          + Add Menu Category
        </AddButton>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && <div className="menu-category-error-box">{error}</div>}

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="menu-category-summary-grid">
        <div className="menu-category-summary-card">
          <div className="menu-category-summary-label">Total Categories</div>

          <div className="menu-category-summary-value">{totalCategories}</div>
        </div>

        <div className="menu-category-summary-card">
          <div className="menu-category-summary-label">Available</div>

          <div className="menu-category-summary-value">
            {availableCategories}
          </div>
        </div>

        <div className="menu-category-summary-card">
          <div className="menu-category-summary-label">Unavailable</div>

          <div className="menu-category-summary-value">
            {unavailableCategories}
          </div>
        </div>

        <div className="menu-category-summary-card">
          <div className="menu-category-summary-label">Popular</div>

          <div className="menu-category-summary-value">{popularCategories}</div>
        </div>
      </div>

      {/* =====================================================
          GRID / TABLE
      ===================================================== */}

      <div className="menu-category-grid-page">
        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div className="menu-category-toolbar">
          <div className="menu-category-search">
            <input
              type="text"
              placeholder="Search menu category..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="menu-category-filter">
            <select
              value={foodTypeFilter}
              onChange={(e) => setFoodTypeFilter(e.target.value)}
            >
              <option value="All">All Food Types</option>

              <option value="Veg">Veg</option>

              <option value="Non Veg">Non Veg</option>

              <option value="Both">Both</option>
            </select>
          </div>

          <div className="menu-category-filter">
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

          <div className="menu-category-filter">
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

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="menu-category-table-container">
          {loading ? (
            <div className="menu-category-loading">
              Loading menu categories...
            </div>
          ) : filteredMenuCategories.length === 0 ? (
            <div className="menu-category-empty">No menu categories found.</div>
          ) : (
            <table className="menu-category-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Category Name</th>
                  <th>Display Name</th>
                  <th>Food Type</th>
                  <th>Kitchen</th>
                  <th>Order</th>
                  <th>Popular</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredMenuCategories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.categoryCode || "-"}</td>

                    <td>
                      <div className="menu-category-name">
                        {category.categoryName || "-"}
                      </div>
                    </td>

                    <td>{category.displayName || "-"}</td>

                    <td>{category.foodType || "-"}</td>

                    <td>{category.kitchenSection || "-"}</td>

                    <td>{category.displayOrder ?? 0}</td>

                    <td>
                      {category.isPopular ? (
                        <span className="menu-category-popular-badge">
                          Popular
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`menu-category-availability-toggle ${
                          category.isAvailable ? "available" : "unavailable"
                        }`}
                        onClick={() => handleToggleAvailability(category._id)}
                      >
                        {category.isAvailable ? "Available" : "Unavailable"}
                      </button>
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`menu-category-status-badge ${
                          category.isActive ? "active" : "inactive"
                        }`}
                        onClick={() => handleToggleActive(category._id)}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td>
                      <div className="menu-category-actions">
                        <EditButton
                          type="button"
                          className="menu-category-edit-btn"
                          onClick={() => handleEditMenuCategory(category)}
                        >
                          Edit
                        </EditButton>

                        <DeleteButton
                          type="button"
                          className="menu-category-delete-btn"
                          onClick={() => handleDeleteMenuCategory(category._id)}
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

      {/* =====================================================
          MODAL
      ===================================================== */}

      <Modal
        open={showModal}
        title={editingMenuCategory ? "Edit Menu Category" : "Add Menu Category"}
        onClose={handleCloseModal}
        size="lg"
      >
        <MenuCategoryForm
          editingMenuCategory={editingMenuCategory}
          onSubmit={handleSubmitMenuCategory}
          onCancel={handleCloseModal}
          loading={menuCategoryLoading}
        />
      </Modal>
    </div>
  );
};

export default MenuCategory;
