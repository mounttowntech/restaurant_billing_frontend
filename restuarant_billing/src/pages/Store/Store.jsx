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
import {
  validateStoreForm,
  buildStorePayload,
  buildStoreUpdatePayload,
} from "../../validation/storeValidation";
import StoreForm from "./StoreForm";
import {
  EditButton,
  DeleteButton,
  AddButton,
} from "../../components/common/Button";
import "./Store.css";
import Modal from "../../components/Common/Modal";

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

  const {
    stores = [],
    loading,
    error,
  } = useSelector((state) => state.stores || {});

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState(emptyFormData);
  const [submitError, setSubmitError] = useState("");

  // ==========================================
  // FETCH STORES
  // ==========================================

  useEffect(() => {
    dispatch(fetchStores({ search, status }));
  }, [dispatch, search, status]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSubmitError("");
  };

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const handleAdd = () => {
    setEditId(null);
    setFormData(emptyFormData);
    setSubmitError("");
    setShowModal(true);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (store) => {
    setEditId(store._id);

    const restaurantId =
      typeof store.restaurant === "object"
        ? store.restaurant?._id
        : store.restaurant;

    setFormData({
      restaurant: restaurantId || "",

      storeCode: store.storeCode || "",

      storeName: store.storeName || "",

      branchName: store.branchName || "",

      managerName: store.managerName || "",

      email: store.email || "",

      phone: store.phone || "",

      alternatePhone: store.alternatePhone || "",

      gstNumber: store.gstNumber || "",

      fssaiNumber: store.fssaiNumber || "",

      address: store.address || "",

      area: store.area || "",

      city: store.city || "",

      state: store.state || "",

      country: store.country || "India",

      pincode: store.pincode || "",

      latitude: store.latitude ?? "",

      longitude: store.longitude ?? "",

      openingTime: store.openingTime || "09:00",

      closingTime: store.closingTime || "23:00",

      totalTables: store.totalTables ?? 0,

      totalSeats: store.totalSeats ?? 0,

      serviceChargePercentage: store.serviceChargePercentage ?? 0,

      gstEnabled: store.gstEnabled ?? true,

      serviceChargeEnabled: store.serviceChargeEnabled ?? false,

      dineInEnabled: store.dineInEnabled ?? true,

      takeawayEnabled: store.takeawayEnabled ?? true,

      deliveryEnabled: store.deliveryEnabled ?? true,

      onlineOrderEnabled: store.onlineOrderEnabled ?? false,

      printerName: store.printerName || "",

      kitchenPrinter: store.kitchenPrinter || "",

      billingPrinter: store.billingPrinter || "",

      logo: store.logo || "",

      status: store.status || "Active",
    });

    setSubmitError("");
    setShowModal(true);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateStoreForm(formData, !!editId);

    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    const payload = buildStorePayload(formData);

    try {
      if (editId) {
        // Backend does not allow restaurant / storeCode
        // to be changed during update.
        const updateData = buildStoreUpdatePayload(payload);

        await dispatch(
          updateStore({
            id: editId,
            store: updateData,
          }),
        ).unwrap();
      } else {
        await dispatch(createStore(payload)).unwrap();
      }

      setShowModal(false);
      setEditId(null);
      dispatch(fetchStores({ search, status }));
    } catch (err) {
      setSubmitError(
        typeof err === "string" ? err : err?.message || "Failed to save store",
      );
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this store?")) {
      return;
    }

    try {
      await dispatch(deleteStore(id)).unwrap();
      dispatch(fetchStores({ search, status }));
    } catch (err) {
      console.error("Delete Store Error:", err);
    }
  };

  // ==========================================
  // RESTORE
  // ==========================================

  const handleRestore = async (id) => {
    try {
      await dispatch(restoreStore(id)).unwrap();
      dispatch(fetchStores({ search, status }));
    } catch (err) {
      console.error("Restore Store Error:", err);
    }
  };

  // ==========================================
  // TOGGLE STATUS
  // ==========================================

  const handleToggleStatus = async (id) => {
    try {
      await dispatch(toggleStoreStatus(id)).unwrap();
      dispatch(fetchStores({ search, status }));
    } catch (err) {
      console.error("Toggle Status Error:", err);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="store-page">
      {/* HEADER */}

      <div className="store-page-header">
        <div>
          <h1>Store Management</h1>
          <p>Manage your restaurant stores</p>
        </div>

        <AddButton className="store-add-btn" onClick={handleAdd}>
          + Add Store
        </AddButton>
      </div>

      {/* LIST */}

      <div className="store-list-box">
        <div className="store-filters">
          <input
            type="text"
            placeholder="Search store name or store code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* ERROR */}

        {error && <div className="store-error">{error}</div>}

        {/* TABLE */}

        <div className="store-table-wrapper">
          <table className="store-table">
            <thead>
              <tr>
                <th>Store Code</th>
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
              {loading ? (
                <tr>
                  <td colSpan="9" className="store-empty">
                    Loading stores...
                  </td>
                </tr>
              ) : stores.length === 0 ? (
                <tr>
                  <td colSpan="9" className="store-empty">
                    No stores found
                  </td>
                </tr>
              ) : (
                stores.map((store) => (
                  <tr key={store._id}>
                    <td>
                      <strong>{store.storeCode || "-"}</strong>
                    </td>

                    <td>{store.storeName || "-"}</td>

                    <td>{store.branchName || "-"}</td>

                    <td>{store.managerName || "-"}</td>

                    <td>{store.phone || "-"}</td>

                    <td>{store.city || "-"}</td>

                    <td>{store.restaurant?.restaurantName || "-"}</td>

                    <td>
                      <button
                        type="button"
                        className={`store-status ${String(
                          store.status || "",
                        ).toLowerCase()}`}
                        onClick={() => handleToggleStatus(store._id)}
                      >
                        {store.status || "-"}
                      </button>
                    </td>

                    <td>
                      <div className="store-actions">
                        <EditButton onClick={() => handleEdit(store)}>
                          Edit
                        </EditButton>

                        {store.isDeleted ? (
                          <button
                            type="button"
                            className="store-restore-btn"
                            onClick={() => handleRestore(store._id)}
                          >
                            Restore
                          </button>
                        ) : (
                          <DeleteButton onClick={() => handleDelete(store._id)}>
                            Delete
                          </DeleteButton>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ADD / EDIT MODAL */}

        <Modal
          open={showModal}
          title={editId ? "Edit Store" : "Add Store"}
          size="lg"
          onClose={() => {
            setShowModal(false);
            setEditId(null);
          }}
        >
          <StoreForm
            editId={editId}
            formData={formData}
            loading={loading}
            submitError={submitError}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowModal(false);
              setEditId(null);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Store;
