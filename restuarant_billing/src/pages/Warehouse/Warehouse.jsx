import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchWarehouses,
  searchWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  setDefaultWarehouse,
  fetchRestaurants,
  fetchStores,
  fetchUsers,
  clearWarehouseError,
} from "../../features/warehouse/warehouseSlice";

import Modal from "../../components/Common/Modal";

import WarehouseForm from "./WarehouseForm";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import "./Warehouse.css";

const Warehouse = () => {
  const dispatch = useDispatch();

  /* ==========================================================
     Redux
  ========================================================== */

  const {
    warehouses,
    restaurants,
    stores,
    users,
    loading,
    warehouseLoading,
    deleteLoading,
    restaurantLoading,
    storeLoading,
    userLoading,
    error,
  } = useSelector((state) => state.warehouse);

  /* ==========================================================
     Local State
  ========================================================== */

  const [search, setSearch] = useState("");

  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const [showModal, setShowModal] = useState(false);

  /* ==========================================================
     Initial Fetch
  ========================================================== */

  useEffect(() => {
    dispatch(
      fetchWarehouses({
        page: 1,
        limit: 1000,
      }),
    );

    dispatch(fetchRestaurants());
    dispatch(fetchStores());
    dispatch(fetchUsers());
  }, [dispatch]);

  /* ==========================================================
     Search
  ========================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        dispatch(searchWarehouses(search.trim()));
      } else {
        dispatch(
          fetchWarehouses({
            page: 1,
            limit: 1000,
          }),
        );
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  /* ==========================================================
     Clear Error
  ========================================================== */

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(clearWarehouseError());
    }, 4000);

    return () => clearTimeout(timer);
  }, [error, dispatch]);

  /* ==========================================================
     Add
  ========================================================== */

  const handleAdd = () => {
    setSelectedWarehouse(null);
    setShowModal(true);
  };

  /* ==========================================================
     Edit
  ========================================================== */

  const handleEdit = (warehouse) => {
    setSelectedWarehouse(warehouse);

    setShowModal(true);
  };

  /* ==========================================================
     Close Modal
  ========================================================== */

  const handleCloseModal = () => {
    if (warehouseLoading) {
      return;
    }

    setShowModal(false);
    setSelectedWarehouse(null);
  };

  /* ==========================================================
     Submit
  ========================================================== */

  const handleSubmit = async (data) => {
    try {
      if (selectedWarehouse) {
        await dispatch(
          updateWarehouse({
            id: selectedWarehouse._id,
            data,
          }),
        ).unwrap();
      } else {
        await dispatch(createWarehouse(data)).unwrap();
      }

      setShowModal(false);
      setSelectedWarehouse(null);

      dispatch(
        fetchWarehouses({
          page: 1,
          limit: 1000,
        }),
      );
    } catch (error) {
      console.error("Warehouse save error:", error);
    }
  };

  /* ==========================================================
     Delete
  ========================================================== */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this warehouse?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteWarehouse(id)).unwrap();
    } catch (error) {
      console.error("Warehouse delete error:", error);
    }
  };

  /* ==========================================================
     Set Default
  ========================================================== */

  const handleSetDefault = async (warehouse) => {
    if (warehouse.isDefault) {
      return;
    }

    try {
      await dispatch(setDefaultWarehouse(warehouse._id)).unwrap();

      dispatch(
        fetchWarehouses({
          page: 1,
          limit: 1000,
        }),
      );
    } catch (error) {
      console.error("Set default error:", error);
    }
  };

  /* ==========================================================
     Restaurant Name
  ========================================================== */

  const getRestaurantName = (restaurant) => {
    if (!restaurant) {
      return "-";
    }

    if (typeof restaurant === "object") {
      return (
        restaurant.restaurantName || restaurant.name || restaurant.title || "-"
      );
    }

    const found = restaurants.find((item) => item._id === restaurant);

    return found?.restaurantName || found?.name || "-";
  };

  /* ==========================================================
     Store Name
  ========================================================== */

  const getStoreName = (store) => {
    if (!store) {
      return "-";
    }

    if (typeof store === "object") {
      return store.storeName || store.name || store.title || "-";
    }

    const found = stores.find((item) => item._id === store);

    return found?.storeName || found?.name || "-";
  };

  /* ==========================================================
     Manager Name
  ========================================================== */

  const getManagerName = (manager) => {
    if (!manager) {
      return "-";
    }

    if (typeof manager === "object") {
      return (
        manager.name ||
        manager.fullName ||
        manager.username ||
        manager.email ||
        "-"
      );
    }

    const found = users.find((item) => item._id === manager);

    return (
      found?.name || found?.fullName || found?.username || found?.email || "-"
    );
  };
  console.log("selectedWarehouse are the :", selectedWarehouse);
  return (
    <div className="warehouse-page">
      {/* ====================================================
          Header
      ==================================================== */}

      <div className="warehouse-page-header">
        <div>
          <h2>Warehouses</h2>

          <p>Manage restaurant warehouses</p>
        </div>

        <AddButton onClick={handleAdd}>Add Warehouse</AddButton>
      </div>

      {/* ====================================================
          Error
      ==================================================== */}

      {error && <div className="warehouse-error">{error}</div>}

      {/* ====================================================
          Search
      ==================================================== */}

      <div className="warehouse-toolbar">
        <div className="warehouse-search">
          <input
            type="text"
            placeholder="Search warehouse..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      {/* ====================================================
          Table
      ==================================================== */}

      <div className="warehouse-table-container">
        {loading ? (
          <div className="warehouse-loading">Loading warehouses...</div>
        ) : warehouses.length === 0 ? (
          <div className="warehouse-empty">No warehouses found.</div>
        ) : (
          <table className="warehouse-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Warehouse</th>
                <th>Restaurant</th>
                <th>Store</th>
                <th>Type</th>
                <th>Manager</th>
                <th>Capacity</th>
                <th>Default</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {warehouses.map((warehouse, index) => (
                <tr key={warehouse._id}>
                  <td>{index + 1}</td>

                  <td>
                    <span className="warehouse-code">
                      {warehouse.warehouseCode}
                    </span>
                  </td>

                  <td className="warehouse-name-cell">
                    {warehouse.warehouseName}
                  </td>

                  <td>{getRestaurantName(warehouse.restaurant)}</td>

                  <td>{getStoreName(warehouse.store)}</td>

                  <td>
                    <span className="warehouse-type">
                      {warehouse.warehouseType}
                    </span>
                  </td>

                  <td>{getManagerName(warehouse.manager)}</td>

                  <td>
                    {warehouse.capacity} {warehouse.capacityUnit}
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`warehouse-default ${
                        warehouse.isDefault ? "yes" : "no"
                      }`}
                      onClick={() => handleSetDefault(warehouse)}
                    >
                      {warehouse.isDefault ? "Default" : "Set Default"}
                    </button>
                  </td>

                  <td>
                    <span
                      className={`warehouse-status ${
                        warehouse.isActive ? "active" : "inactive"
                      }`}
                    >
                      {warehouse.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="modal-actions">
                      <EditButton onClick={() => handleEdit(warehouse)} />

                      <DeleteButton
                        onClick={() => handleDelete(warehouse._id)}
                        disabled={deleteLoading}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ====================================================
          Modal
      ==================================================== */}

      {showModal && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          title={selectedWarehouse ? "Edit Warehouse" : "Create Warehouse"}
        >
          <WarehouseForm
            initialData={selectedWarehouse}
            restaurants={restaurants}
            stores={stores}
            users={users}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            loading={
              warehouseLoading ||
              restaurantLoading ||
              storeLoading ||
              userLoading
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default Warehouse;
