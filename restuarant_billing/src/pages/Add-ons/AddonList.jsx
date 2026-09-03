import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchRestaurants,
// } from "../../../../store/slices/restaurantSlice";

// import {
//   fetchStores,
// } from "../../../../store/slices/storeSlice";

// import {
//   fetchMenuCategories,
// } from "../../../../store/slices/menuCategorySlice";

// import {
//   fetchMenuItems,
// } from "../../../../store/slices/menuItemSlice";


import AddonForm from "./AddonForm";

import Modal from "../../components/common/Modal";

// import AddButton from "../../../../components/common/AddButton";
// import EditButton from "../../../../components/common/EditButton";
// import DeleteButton from "../../../../components/common/DeleteButton";

import {
  AddButton,
  EditButton,
  DeleteButton,
} from "../../components/common/Button";

import "./addon.css";
import { fetchAddons, createAddon,updateAddon,deleteAddon,restoreAddon } from "../../features/addOns/addOnsSlice";
import { fetchStores } from "../../features/store/storeSlice";
import { fetchMenuCategories } from "../../features/menuCategory/menuCategorySlice";
import { fetchMenuItems } from "../../features/menuItem/menuItemSlice";
import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";

const AddonList = () => {
  const dispatch = useDispatch();

  // =====================================================
  // REDUX
  // =====================================================

  const {
    addons = [],
    loading = false,
    addonLoading = false,
    deleteLoading = false,
    actionLoading = false,
    error = null,
  } = useSelector((state) => state.addon || {});

  const { restaurants = [] } = useSelector(
    (state) => state.restaurants || {},
  );

  const { stores = [] } = useSelector(
    (state) => state.stores || {},
  );

  const menuCategories = useSelector(
    (state) =>
      state.menuCategory?.menuCategories ||
      state.menuCategories?.menuCategories ||
      [],
  );

  const { menuItems = [] } = useSelector(
    (state) => state.menuItem || {},
  );

  // =====================================================
  // MODAL
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingAddon, setEditingAddon] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [foodTypeFilter, setFoodTypeFilter] = useState("All");

  const [addonTypeFilter, setAddonTypeFilter] = useState("All");

  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  // =====================================================
  // FETCH
  // =====================================================

  useEffect(() => {
    dispatch(fetchAddons());

    dispatch(fetchRestaurants({
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
      fetchMenuItems({
        page: 1,
        limit: 1000,
      }),
    );
  }, [dispatch]);

  // =====================================================
  // OPEN ADD
  // =====================================================

  const handleAddAddon = () => {
    setEditingAddon(null);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEditAddon = (addon) => {
    setEditingAddon(addon);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAddon(null);
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmitAddon = async (formData) => {
    console.log("Addon form data:", formData);

    try {
      if (editingAddon?._id) {
        await dispatch(
          updateAddon({
            id: editingAddon._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(
          createAddon(formData),
        ).unwrap();
      }

      handleCloseModal();

      dispatch(fetchAddons());
    } catch (error) {
      console.error("Addon save failed:", error);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDeleteAddon = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this add-on?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(
        deleteAddon(id),
      ).unwrap();

      dispatch(fetchAddons());
    } catch (error) {
      console.error("Addon delete failed:", error);
    }
  };

  // =====================================================
  // RESTORE
  // =====================================================

  const handleRestoreAddon = async (id) => {
    try {
      await dispatch(
        restoreAddon(id),
      ).unwrap();

      dispatch(fetchAddons());
    } catch (error) {
      console.error("Addon restore failed:", error);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredAddons = useMemo(() => {
    return addons.filter((addon) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        addon.addonCode
          ?.toLowerCase()
          .includes(searchValue) ||
        addon.addonName
          ?.toLowerCase()
          .includes(searchValue) ||
        addon.displayName
          ?.toLowerCase()
          .includes(searchValue);

      const matchesFoodType =
        foodTypeFilter === "All" ||
        addon.foodType === foodTypeFilter;

      const matchesAddonType =
        addonTypeFilter === "All" ||
        addon.addonType === addonTypeFilter;

      const matchesAvailability =
        availabilityFilter === "All" ||
        (availabilityFilter === "Available" &&
          addon.isAvailable) ||
        (availabilityFilter === "Unavailable" &&
          !addon.isAvailable);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" &&
          addon.isActive) ||
        (statusFilter === "Inactive" &&
          !addon.isActive);

      return (
        matchesSearch &&
        matchesFoodType &&
        matchesAddonType &&
        matchesAvailability &&
        matchesStatus
      );
    });
  }, [
    addons,
    search,
    foodTypeFilter,
    addonTypeFilter,
    availabilityFilter,
    statusFilter,
  ]);

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalAddons = addons.length;

  const availableAddons = addons.filter(
    (addon) => addon.isAvailable,
  ).length;

  const unavailableAddons = addons.filter(
    (addon) => !addon.isAvailable,
  ).length;

  const activeAddons = addons.filter(
    (addon) => addon.isActive,
  ).length;

  // =====================================================
  // OPTIONS
  // =====================================================

  const restaurantOptions = restaurants.map((item) => ({
    label:
      item.restaurantName ||
      item.code ||
      item.restaurantCode ||
      item.name ||
      item._id,
    value: item._id,
  }));

  const storeOptions = stores.map((item) => ({
    label:
      item.storeName ||
      item.name ||
      item.storeCode ||
      "Unnamed Store",
    value: item._id,
  }));

  const menuCategoryOptions = menuCategories.map((item) => ({
    label:
      item.categoryName ||
      item.name ||
      item._id,
    value: item._id,
  }));

  const menuItemOptions = menuItems.map((item) => ({
    label:
      `${item.menuCode || ""} - ${item.menuName || "Unnamed Menu"}`
        .replace(/^ - /, ""),
    value: item._id,
  }));

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="addon-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="addon-page-header">

        <div>
          <h1>Add-ons</h1>

          <p>
            Manage restaurant add-ons and assign them to menu items
          </p>
        </div>

        <AddButton
          type="button"
          className="addon-add-btn"
          onClick={handleAddAddon}
        >
          + Add Add-on
        </AddButton>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="addon-error-box">
          {error}
        </div>
      )}

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="addon-summary-grid">

        <div className="addon-summary-card">
          <div className="addon-summary-label">
            Total Add-ons
          </div>

          <div className="addon-summary-card-value">
            {totalAddons}
          </div>
        </div>

        <div className="addon-summary-card">
          <div className="addon-summary-label">
            Available
          </div>

          <div className="addon-summary-card-value">
            {availableAddons}
          </div>
        </div>

        <div className="addon-summary-card">
          <div className="addon-summary-label">
            Unavailable
          </div>

          <div className="addon-summary-card-value">
            {unavailableAddons}
          </div>
        </div>

        <div className="addon-summary-card">
          <div className="addon-summary-label">
            Active
          </div>

          <div className="addon-summary-card-value">
            {activeAddons}
          </div>
        </div>

      </div>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="addon-grid-page">

            <div className="addon-toolbar">

            <div className="addon-search">
                <input
                type="text"
                placeholder="Search add-on..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                />
            </div>

            <div className="addon-filter">

                <select
                value={foodTypeFilter}
                onChange={(e) =>
                    setFoodTypeFilter(e.target.value)
                }
                >
                <option value="All">
                    All Food Types
                </option>

                <option value="Veg">
                    Veg
                </option>

                <option value="Non Veg">
                    Non Veg
                </option>

                <option value="Both">
                    Both
                </option>
                </select>

            </div>

            <div className="addon-filter">

                <select
                value={addonTypeFilter}
                onChange={(e) =>
                    setAddonTypeFilter(e.target.value)
                }
                >
                <option value="All">
                    All Add-on Types
                </option>

                <option value="Ingredient">
                    Ingredient
                </option>

                <option value="Topping">
                    Topping
                </option>

                <option value="Side Dish">
                    Side Dish
                </option>

                <option value="Beverage">
                    Beverage
                </option>

                <option value="Dessert">
                    Dessert
                </option>

                <option value="Extra">
                    Extra
                </option>

                <option value="Protein">
                    Protein
                </option>
                </select>

            </div>

            <div className="addon-filter">

                <select
                value={availabilityFilter}
                onChange={(e) =>
                    setAvailabilityFilter(e.target.value)
                }
                >
                <option value="All">
                    All Availability
                </option>

                <option value="Available">
                    Available
                </option>

                <option value="Unavailable">
                    Unavailable
                </option>
                </select>

            </div>

            <div className="addon-filter">

                <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value)
                }
                >
                <option value="All">
                    All Status
                </option>

                <option value="Active">
                    Active
                </option>

                <option value="Inactive">
                    Inactive
                </option>
                </select>

            </div>

            </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="addon-table-container">

          {loading ? (
            <div className="addon-loading">
              Loading add-ons...
            </div>
          ) : filteredAddons.length === 0 ? (
            <div className="addon-empty">
              No add-ons found.
            </div>
          ) : (
            <table className="addon-table">

              <thead>
                <tr>
                  <th>Code</th>
                  <th>Add-on Name</th>
                  <th>Type</th>
                  <th>Food Type</th>
                  <th>Price</th>
                  <th>GST</th>
                  <th>Menu Items</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredAddons.map((addon) => (

                  <tr key={addon._id}>

                    <td>
                      {addon.addonCode || "-"}
                    </td>

                    <td>
                      <div className="addon-name">
                        {addon.addonName || "-"}
                      </div>

                      {addon.displayName && (
                        <small>
                          {addon.displayName}
                        </small>
                      )}
                    </td>

                    <td>
                      {addon.addonType || "-"}
                    </td>

                    <td>
                      {addon.foodType || "-"}
                    </td>

                    <td>
                      ₹{Number(addon.price || 0).toFixed(2)}
                    </td>

                    <td>
                      {Number(
                        addon.gstPercentage || 0,
                      )}
                      %
                    </td>

                    <td>
                      {Array.isArray(
                        addon.applicableMenuItems,
                      )
                        ? addon.applicableMenuItems.length
                        : 0}
                    </td>

                    <td>

                      <span
                        className={`addon-availability-badge ${
                          addon.isAvailable
                            ? "available"
                            : "unavailable"
                        }`}
                      >
                        {addon.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`addon-status-badge ${
                          addon.isActive
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {addon.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td>

                      <div className="addon-action-buttons">

                        <EditButton
                          type="button"
                          onClick={() =>
                            handleEditAddon(addon)
                          }
                        >
                          Edit
                        </EditButton>

                        {addon.isDeleted ? (

                          <button
                            type="button"
                            onClick={() =>
                              handleRestoreAddon(
                                addon._id,
                              )
                            }
                            disabled={actionLoading}
                          >
                            Restore
                          </button>

                        ) : (

                          <DeleteButton
                            type="button"
                            onClick={() =>
                              handleDeleteAddon(
                                addon._id,
                              )
                            }
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

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      <Modal
        open={showModal}
        title={
          editingAddon
            ? "Edit Add-on"
            : "Add Add-on"
        }
        onClose={handleCloseModal}
        size="lg"
      >

        <AddonForm
          editingAddon={editingAddon}
          onSubmit={handleSubmitAddon}
          onCancel={handleCloseModal}
          restaurantOptions={restaurantOptions}
          storeOptions={storeOptions}
          menuCategoryOptions={menuCategoryOptions}
          menuItemOptions={menuItemOptions}
          loading={addonLoading}
        />

      </Modal>

    </div>
  );
};

export default AddonList;
