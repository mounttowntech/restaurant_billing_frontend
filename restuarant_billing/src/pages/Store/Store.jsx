import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchStores,
  deleteStore,
  restoreStore,
  toggleStoreStatus,
} from "../../features/store/storeSlice";

import StoreForm from "./StoreForm";

import "./Store.css";

const Store = () => {
  const dispatch = useDispatch();

  const {
    stores = [],
    loading,
    error,
  } = useSelector((state) => state.stores || {});

  const [showForm, setShowForm] = useState(false);

  const [editStore, setEditStore] = useState(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  // ==================================================
  // FETCH STORES
  // ==================================================

  useEffect(() => {
    dispatch(
      fetchStores({
        search,
        status,
      }),
    );
  }, [dispatch, search, status]);

  // ==================================================
  // CREATE
  // ==================================================

  const handleAdd = () => {
    setEditStore(null);
    setShowForm(true);
  };

  // ==================================================
  // EDIT
  // ==================================================

  const handleEdit = (store) => {
    setEditStore(store);
    setShowForm(true);
  };

  // ==================================================
  // DELETE
  // ==================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this store?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(deleteStore(id)).unwrap();

      dispatch(
        fetchStores({
          search,
          status,
        }),
      );
    } catch (error) {
      console.error("Delete Store Error:", error);
    }
  };

  // ==================================================
  // RESTORE
  // ==================================================

  const handleRestore = async (id) => {
    try {
      await dispatch(restoreStore(id)).unwrap();

      dispatch(
        fetchStores({
          search,
          status,
        }),
      );
    } catch (error) {
      console.error("Restore Store Error:", error);
    }
  };

  // ==================================================
  // TOGGLE STATUS
  // ==================================================

  const handleToggleStatus = async (id) => {
    try {
      await dispatch(toggleStoreStatus(id)).unwrap();

      dispatch(
        fetchStores({
          search,
          status,
        }),
      );
    } catch (error) {
      console.error("Toggle Status Error:", error);
    }
  };

  // ==================================================
  // FORM SUCCESS
  // ==================================================

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditStore(null);

    dispatch(
      fetchStores({
        search,
        status,
      }),
    );
  };

  // ==================================================
  // FORM CANCEL
  // ==================================================

  const handleCancelForm = () => {
    setShowForm(false);
    setEditStore(null);
  };

  console.log("STORE PAGE RENDER:", { stores });
  return (
    <div className="store-page">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="store-page-header">
        <div>
          <h1>Store Management</h1>

          <p>Manage your restaurant stores</p>
        </div>

        <button type="button" className="store-add-btn" onClick={handleAdd}>
          + Add Store
        </button>
      </div>

      {/* ==================================================
          FORM
      ================================================== */}

      {showForm && (
        <StoreForm
          editStore={editStore}
          onSuccess={handleFormSuccess}
          onCancel={handleCancelForm}
        />
      )}

      {/* ==================================================
          ERROR
      ================================================== */}

      {error && <div className="store-error">{error}</div>}

      {/* ==================================================
          STORE LIST
      ================================================== */}

      <div className="store-list-box">
        <div className="store-list-header">
          <div>
            <h2>Stores</h2>

            <span>Total Stores: {stores.length}</span>
          </div>
        </div>

        {/* ==================================================
            SEARCH
        ================================================== */}

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

        {/* ==================================================
            TABLE
        ================================================== */}

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
                      <span
                        className={`store-status ${String(
                          store.status || "",
                        ).toLowerCase()}`}
                      >
                        {store.status || "-"}
                      </span>
                    </td>

                    <td>
                      <div className="store-actions">
                        <button
                          type="button"
                          className="store-edit-btn"
                          onClick={() => handleEdit(store)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="store-status-btn"
                          onClick={() => handleToggleStatus(store._id)}
                        >
                          {store.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        {store.isDeleted ? (
                          <button
                            type="button"
                            className="store-restore-btn"
                            onClick={() => handleRestore(store._id)}
                          >
                            Restore
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="store-delete-btn"
                            onClick={() => handleDelete(store._id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Store;
