import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchStores,
  createStore,
  updateStore,
  deleteStore,
  restoreStore,
  toggleStoreStatus,
} from "../../features/store/storeSlice";

import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import Modal from "../../components/Common/Modal";
import StoreForm from "./StoreForm";

import {
  validateStoreForm,
  buildStorePayload,
  buildStoreUpdatePayload,
} from "../../validation/storeValidation";

import "./Store.css";

const emptyFormData = {
  restaurant: "",

  storeCode: "",
  storeName: "",
  branchName: "",
  managerName: "",

  email: "",
  phone: "",
  alternatePhone: "",

  gstNumber: "",
  fssaiNumber: "",

  address: "",
  area: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",

  latitude: "",
  longitude: "",

  openingTime: "09:00",
  closingTime: "23:00",

  totalTables: 0,
  totalSeats: 0,
  serviceChargePercentage: 0,

  gstEnabled: true,
  serviceChargeEnabled: false,
  dineInEnabled: true,
  takeawayEnabled: true,
  deliveryEnabled: true,
  onlineOrderEnabled: false,

  printerName: "",
  kitchenPrinter: "",
  billingPrinter: "",
  logo: "",

  status: "Active",
};

const Store = () => {
  const dispatch = useDispatch();

  // =====================================================
  // REDUX STATE
  // =====================================================

  const {
    stores = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.stores || {});

  const { restaurants = [] } = useSelector((state) => state.restaurants || {});

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // =====================================================
  // ADD STORE
  // =====================================================

  const handleAddStore = () => {
    setEditingStore(null);
    setShowModal(true);
  };

  // =====================================================
  // EDIT STORE
  // =====================================================

  const handleEditStore = (store) => {
    setEditingStore(store);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStore(null);
  };

  // =====================================================
  // CREATE / UPDATE STORE
  // =====================================================

  const handleSubmitStore = async (formData) => {
    try {
      const validationError = validateStoreForm(formData, !!editingStore?._id);

      if (validationError) {
        throw new Error(validationError);
      }

      const payload = buildStorePayload(formData);

      if (editingStore?._id) {
        const updateData = buildStoreUpdatePayload(payload);

        await dispatch(
          updateStore({
            id: editingStore._id,
            store: updateData,
          }),
        ).unwrap();
      } else {
        await dispatch(createStore(payload)).unwrap();
      }

      handleCloseModal();

      dispatch(fetchStores());
    } catch (error) {
      console.error("Store save failed:", error);

      throw error;
    }
  };

  // =====================================================
  // DELETE STORE
  // =====================================================

  const handleDeleteStore = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this store?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteStore(id)).unwrap();

      dispatch(fetchStores());
    } catch (error) {
      console.error("Store delete failed:", error);
    }
  };

  // =====================================================
  // RESTORE STORE
  // =====================================================

  const handleRestoreStore = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to restore this store?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(restoreStore(id)).unwrap();

      dispatch(fetchStores());
    } catch (error) {
      console.error("Store restore failed:", error);
    }
  };

  // =====================================================
  // CHANGE STORE STATUS
  // =====================================================

  const handleStatusChange = async (id) => {
    try {
      await dispatch(toggleStoreStatus(id)).unwrap();

      dispatch(fetchStores());
    } catch (error) {
      console.error("Store status update failed:", error);
    }
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredStores = stores.filter((store) => {
    const searchValue = search.trim().toLowerCase();

    const storeCode = String(store.storeCode || "").toLowerCase();
    const storeName = String(store.storeName || "").toLowerCase();
    const branchName = String(store.branchName || "").toLowerCase();
    const managerName = String(store.managerName || "").toLowerCase();
    const phone = String(store.phone || "").toLowerCase();

    const searchMatch =
      !searchValue ||
      storeCode.includes(searchValue) ||
      storeName.includes(searchValue) ||
      branchName.includes(searchValue) ||
      managerName.includes(searchValue) ||
      phone.includes(searchValue);

    const statusMatch =
      statusFilter === "All" ||
      String(store.status || "").toLowerCase() === statusFilter.toLowerCase();

    return searchMatch && statusMatch;
  });

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalStores = stores.length;

  const activeStores = stores.filter(
    (store) => String(store.status || "").toLowerCase() === "active",
  ).length;

  const inactiveStores = stores.filter(
    (store) => String(store.status || "").toLowerCase() === "inactive",
  ).length;

  const deletedStores = stores.filter(
    (store) => store.isDeleted === true,
  ).length;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="store-container">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="store-header">
        <div>
          <h1 className="store-title">Stores</h1>

          <p>Manage your restaurant stores and their information</p>
        </div>

        <AddButton
          type="button"
          className="store-add-btn"
          onClick={handleAddStore}
        >
          + Add Store
        </AddButton>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="store-error-box">
          {typeof error === "string"
            ? error
            : error?.message || "Something went wrong"}
        </div>
      )}

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="store-summary-grid">
        <div className="store-summary-card">
          <div className="store-summary-label">Total Stores</div>

          <div className="store-summary-value">{totalStores}</div>
        </div>

        <div className="store-summary-card">
          <div className="store-summary-label">Active Stores</div>

          <div className="store-summary-value">{activeStores}</div>
        </div>

        <div className="store-summary-card">
          <div className="store-summary-label">Inactive Stores</div>

          <div className="store-summary-value">{inactiveStores}</div>
        </div>

        <div className="store-summary-card">
          <div className="store-summary-label">Deleted Stores</div>

          <div className="store-summary-value">{deletedStores}</div>
        </div>
      </div>

      {/* =================================================
          TABLE SECTION
      ================================================= */}

      <div className="store-grid-page">
        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="store-toolbar">
          <div className="store-search-container">
            <input
              type="text"
              placeholder="Search store..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="store-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="store-table-container">
          {loading ? (
            <div className="store-loading">Loading stores...</div>
          ) : filteredStores.length === 0 ? (
            <div className="store-empty">No stores found.</div>
          ) : (
            <table className="store-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Store Name</th>
                  <th>Branch</th>
                  <th>Manager</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Restaurant</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStores.map((store) => (
                  <tr key={store._id}>
                    {/* CODE */}

                    <td>{store.storeCode || "-"}</td>

                    {/* STORE NAME */}

                    <td>
                      <div className="store-name">{store.storeName || "-"}</div>
                    </td>

                    {/* BRANCH */}

                    <td>{store.branchName || "-"}</td>

                    {/* MANAGER */}

                    <td>{store.managerName || "-"}</td>

                    {/* PHONE */}

                    <td>{store.phone || "-"}</td>

                    {/* CITY */}

                    <td>{store.city || "-"}</td>

                    {/* RESTAURANT */}

                    <td>
                      {typeof store.restaurant === "object"
                        ? store.restaurant?.restaurantName ||
                          store.restaurant?.name ||
                          "-"
                        : restaurants.find(
                            (restaurant) => restaurant._id === store.restaurant,
                          )?.restaurantName || "-"}
                    </td>

                    {/* STATUS */}

                    <td>
                      <button
                        type="button"
                        className={`store-status ${
                          String(store.status || "").toLowerCase() === "active"
                            ? "active"
                            : "inactive"
                        }`}
                        onClick={() => handleStatusChange(store._id)}
                        disabled={loading}
                      >
                        {store.status || "Inactive"}
                      </button>
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="modal-actions">
                        <EditButton
                          type="button"
                          className="store-edit-btn"
                          onClick={() => handleEditStore(store)}
                        >
                          Edit
                        </EditButton>

                        {store.isDeleted ? (
                          <button
                            type="button"
                            className="store-restore-btn"
                            onClick={() => handleRestoreStore(store._id)}
                          >
                            Restore
                          </button>
                        ) : (
                          <DeleteButton
                            type="button"
                            className="store-delete-btn"
                            onClick={() => handleDeleteStore(store._id)}
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
        title={editingStore ? "Edit Store" : "Add Store"}
        onClose={handleCloseModal}
        size="lg"
      >
        <StoreForm
          editingStore={editingStore}
          onSubmit={handleSubmitStore}
          onCancel={handleCloseModal}
          loading={loading}
          restaurants={restaurants}
        />
      </Modal>
    </div>
  );
};

export default Store;
