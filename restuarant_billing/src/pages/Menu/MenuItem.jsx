import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import Modal from "../../components/Common/Modal";

import MenuItemForm from "./MenuItemForm";

import {
  fetchMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  restoreMenuItem,
  updateMenuItemAvailability,
  updateMenuItemStatus,
  searchMenuItems,
} from "../../features/menuItem/menuItemSlice";
import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";
import { fetchStores } from "../../features/store/storeSlice";
import { fetchRecipes } from "../../features/recipe/recipeSlice";
import { fetchMenuCategories } from "../../features/menuCategory/menuCategorySlice";
import { fetchCategories } from "../../features/category/categorySlice";

import "./MenuItem.css";

const MenuItem = () => {
  const dispatch = useDispatch();

  const {
    menuItems = [],
    loading = false,
    menuItemLoading = false,
    deleteLoading = false,
    actionLoading = false,
    error = null,
  } = useSelector((state) => state.menuItem || {});
  const { restaurants = [] } = useSelector((state) => state.restaurants);
  const { stores = [] } = useSelector((state) => state.stores || {});
  const menuCategories = useSelector(
    (state) =>
      state.menuCategory?.menuCategories ||
      state.menuCategories?.menuCategories ||
      [],
  );
  const { categories = [] } = useSelector((state) => state.category);

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingMenuItem, setEditingMenuItem] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [foodTypeFilter, setFoodTypeFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  // =====================================================
  // FETCH MENU ITEMS
  // =====================================================

  useEffect(() => {
    dispatch(fetchMenuItems());

    console.log("STEP 1 - MenuItem.jsx useEffect RUNNING");

    console.log("STEP 2 - dispatching fetchMenuItems()");
  }, [dispatch]);

  console.log("Menu Items are :", menuItems);

  useEffect(() => {
    dispatch(
      fetchRestaurants({
        page: 1,
        limit: 1000,
      }),
    );
    dispatch(
      fetchStores({
        page: 1,
        limit: 1000,
      }),
    );
    dispatch(
      fetchMenuCategories({
        page: 1,
        limit: 1000,
      }),
    );
    dispatch(
      fetchCategories({
        page: 1,
        limit: 1000,
      }),
    );
    dispatch(
      fetchRecipes({
        page: 1,
        limit: 1000,
      }),
    );
  }, [dispatch]);

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const handleAddMenuItem = () => {
    setEditingMenuItem(null);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEditMenuItem = (menuItem) => {
    setEditingMenuItem(menuItem);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMenuItem(null);
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmitMenuItem = async (formData) => {
    console.log("Menu Item form data:", formData);

    try {
      if (editingMenuItem?._id) {
        await dispatch(
          updateMenuItem({
            id: editingMenuItem._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createMenuItem(formData)).unwrap();
      }

      handleCloseModal();

      dispatch(fetchMenuItems());
    } catch (error) {
      console.error("Menu item save failed:", error);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDeleteMenuItem = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu item?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteMenuItem(id)).unwrap();

      dispatch(fetchMenuItems());
    } catch (error) {
      console.error("Menu item delete failed:", error);
    }
  };

  // =====================================================
  // RESTORE
  // =====================================================

  const handleRestoreMenuItem = async (id) => {
    try {
      await dispatch(restoreMenuItem(id)).unwrap();

      dispatch(fetchMenuItems());
    } catch (error) {
      console.error("Menu item restore failed:", error);
    }
  };

  // =====================================================
  // AVAILABILITY
  // =====================================================

  const handleToggleAvailability = async (menuItem) => {
    try {
      await dispatch(
        updateMenuItemAvailability({
          id: menuItem._id,
          isAvailable: !menuItem.isAvailable,
        }),
      ).unwrap();
    } catch (error) {
      console.error("Menu item availability update failed:", error);
    }
  };

  // =====================================================
  // STATUS
  // =====================================================

  const handleToggleStatus = async (menuItem) => {
    try {
      await dispatch(
        updateMenuItemStatus({
          id: menuItem._id,
          status: menuItem.status === "Active" ? "Inactive" : "Active",
        }),
      ).unwrap();
    } catch (error) {
      console.error("Menu item status update failed:", error);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      dispatch(fetchMenuItems());
      return;
    }

    dispatch(searchMenuItems(value));
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredMenuItems = menuItems.filter((item) => {
    if (foodTypeFilter !== "All" && item.foodType !== foodTypeFilter) {
      return false;
    }

    if (statusFilter !== "All" && item.status !== statusFilter) {
      return false;
    }

    if (availabilityFilter === "Available" && !item.isAvailable) {
      return false;
    }

    if (availabilityFilter === "Unavailable" && item.isAvailable) {
      return false;
    }

    return true;
  });

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalMenuItems = menuItems.length;

  const availableMenuItems = menuItems.filter(
    (item) => item.isAvailable,
  ).length;

  const unavailableMenuItems = menuItems.filter(
    (item) => !item.isAvailable,
  ).length;

  const activeMenuItems = menuItems.filter(
    (item) => item.status === "Active",
  ).length;

  const restaurantOptions = restaurants.map((item) => ({
    label:
      item.restaurantCode ||
      item.code ||
      item.restaurantName ||
      item.name ||
      item._id,
    value: item._id,
  }));

  const storeOptions = stores.map((item) => ({
    label: item.storeName || item.name || item.storeCode || "Unnamed Store",
    value: item._id,
  }));

  const menuCategoryOptions = menuCategories.map((item) => ({
    label: item.categoryName || item.name || item._id,
    value: item._id,
  }));

  const categoryOptions = categories.map((item) => ({
    label: item.categoryName || item.name || "Unnamed Category",
    value: item._id,
  }));

  const recipeOptions = useSelector(
    (state) =>
      state.recipe?.recipes?.map((item) => ({
        label: item.recipeName || item.name || "Unnamed Recipe",
        value: item._id,
      })) || [],
  );

  return (
    <div className="menu-item-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="menu-item-page-header">
        <div>
          <h1>Menu Items</h1>

          <p>Manage restaurant menu items</p>
        </div>

        <AddButton
          type="button"
          className="menu-item-add-btn"
          onClick={handleAddMenuItem}
        >
          + Add Menu Item
        </AddButton>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && <div className="menu-item-error-box">{error}</div>}

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="menu-item-summary-grid">
        <div className="menu-item-summary-card">
          <div className="menu-item-summary-label">Total Menu Items</div>

          <div className="menu-item-summary-value">{totalMenuItems}</div>
        </div>

        <div className="menu-item-summary-card">
          <div className="menu-item-summary-label">Available</div>

          <div className="menu-item-summary-value">{availableMenuItems}</div>
        </div>

        <div className="menu-item-summary-card">
          <div className="menu-item-summary-label">Unavailable</div>

          <div className="menu-item-summary-value">{unavailableMenuItems}</div>
        </div>

        <div className="menu-item-summary-card">
          <div className="menu-item-summary-label">Active</div>

          <div className="menu-item-summary-value">{activeMenuItems}</div>
        </div>
      </div>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="menu-item-grid-page">
        <div className="menu-item-toolbar">
          <div className="menu-item-search">
            <input
              type="text"
              placeholder="Search menu item..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="menu-item-filter">
            <select
              value={foodTypeFilter}
              onChange={(e) => setFoodTypeFilter(e.target.value)}
            >
              <option value="All">All Food Types</option>

              <option value="Veg">Veg</option>

              <option value="Non Veg">Non Veg</option>

              <option value="Egg">Egg</option>

              <option value="Vegan">Vegan</option>

              <option value="Jain">Jain</option>
            </select>
          </div>

          <div className="menu-item-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>

              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="menu-item-filter">
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="All">All Availability</option>

              <option value="Available">Available</option>

              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="menu-item-table-container">
          {loading ? (
            <div className="menu-item-loading">Loading menu items...</div>
          ) : filteredMenuItems.length === 0 ? (
            <div className="menu-item-empty">No menu items found.</div>
          ) : (
            <table className="menu-item-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Menu Name</th>
                  <th>Category</th>
                  <th>Food Type</th>
                  <th>Dine In</th>
                  <th>Takeaway</th>
                  <th>Delivery</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredMenuItems.map((menuItem) => (
                  <tr key={menuItem._id}>
                    <td>{menuItem.menuCode || "-"}</td>

                    <td>
                      <div className="menu-item-name">
                        {menuItem.menuName || "-"}
                      </div>

                      {menuItem.shortName && (
                        <small>{menuItem.shortName}</small>
                      )}
                    </td>

                    <td>
                      {menuItem.menuCategory?.categoryName ||
                        menuItem.menuCategory?.name ||
                        "-"}
                    </td>

                    <td>{menuItem.foodType || "-"}</td>

                    <td>₹{menuItem.dineInPrice ?? 0}</td>

                    <td>₹{menuItem.takeawayPrice ?? 0}</td>

                    <td>₹{menuItem.deliveryPrice ?? 0}</td>

                    <td>
                      <button
                        type="button"
                        className={`menu-item-availability-toggle ${
                          menuItem.isAvailable ? "available" : "unavailable"
                        }`}
                        onClick={() => handleToggleAvailability(menuItem)}
                        disabled={actionLoading}
                      >
                        {menuItem.isAvailable ? "Available" : "Unavailable"}
                      </button>
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`menu-item-status-badge ${
                          menuItem.status === "Active" ? "active" : "inactive"
                        }`}
                        onClick={() => handleToggleStatus(menuItem)}
                        disabled={actionLoading}
                      >
                        {menuItem.status || "Inactive"}
                      </button>
                    </td>

                    <td>
                      <div className="modal-actions">
                        <EditButton
                          type="button"
                          onClick={() => handleEditMenuItem(menuItem)}
                        >
                          Edit
                        </EditButton>

                        {menuItem.isDeleted ? (
                          <button
                            type="button"
                            onClick={() => handleRestoreMenuItem(menuItem._id)}
                            disabled={actionLoading}
                          >
                            Restore
                          </button>
                        ) : (
                          <DeleteButton
                            type="button"
                            onClick={() => handleDeleteMenuItem(menuItem._id)}
                            disabled={deleteLoading}
                          >
                            Delete
                          </DeleteButton>
                        )}
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
        title={editingMenuItem ? "Edit Menu Item" : "Add Menu Item"}
        onClose={handleCloseModal}
        size="lg"
      >
        <MenuItemForm
          editingMenuItem={editingMenuItem}
          onSubmit={handleSubmitMenuItem}
          onCancel={handleCloseModal}
          restaurantOptions={restaurantOptions}
          storeOptions={storeOptions}
          categoryOptions={categoryOptions}
          recipeOptions={recipeOptions}
          menuCategoryOptions={menuCategoryOptions}
          loading={menuItemLoading}
        />
      </Modal>
    </div>
  );
};

export default MenuItem;
