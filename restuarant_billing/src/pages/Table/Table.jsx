import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Table.css";

import Modal from "../../components/Common/Modal";
import Select from "../../components/Common/Select";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "../../components/Common/Button";

import TableForm from "./TableForm";

import {
  fetchTables,
  createTable,
  updateTable,
  deleteTable,
  activateTable,
  deactivateTable,
  updateTableStatus,
  releaseTable,
  cleanTable,
} from "../../features/table/tableSlice";

import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";
import { fetchStores } from "../../features/store/storeSlice";

const Table = () => {
  const dispatch = useDispatch();

  const {
    tables = [],
    loading,
    error,
  } = useSelector((state) => state.tables || {});

  const { restaurants = [] } = useSelector((state) => state.restaurants || {});

  const { stores = [] } = useSelector((state) => state.stores || {});

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchTables());
    dispatch(fetchRestaurants());
    dispatch(fetchStores());
  }, [dispatch]);

  const handleAdd = () => {
    setEditId(null);
    setFormData(null);
    setShowModal(true);
  };

  const handleEdit = (table) => {
    setEditId(table._id);
    setFormData(table);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditId(null);
    setFormData(null);
  };

  const handleSubmit = async (data) => {
    try {
      if (editId) {
        await dispatch(
          updateTable({
            id: editId,
            data,
          }),
        ).unwrap();
      } else {
        await dispatch(createTable(data)).unwrap();
      }

      handleClose();
      dispatch(fetchTables());
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this table?")) {
      return;
    }

    try {
      await dispatch(deleteTable(id)).unwrap();
      dispatch(fetchTables());
    } catch (err) {
      console.error(err);
    }
  };

  const handleActivate = async (id) => {
    try {
      await dispatch(activateTable(id)).unwrap();
      dispatch(fetchTables());
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await dispatch(deactivateTable(id)).unwrap();
      dispatch(fetchTables());
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(
        updateTableStatus({
          id,
          status,
        }),
      ).unwrap();

      dispatch(fetchTables());
    } catch (err) {
      console.error(err);
    }
  };

  const handleRelease = async (id) => {
    try {
      await dispatch(releaseTable(id)).unwrap();
      dispatch(fetchTables());
    } catch (err) {
      console.error(err);
    }
  };

  const handleClean = async (id) => {
    try {
      await dispatch(cleanTable(id)).unwrap();
      dispatch(fetchTables());
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTables = tables.filter((table) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      !search ||
      table.tableName?.toLowerCase().includes(keyword) ||
      table.tableCode?.toLowerCase().includes(keyword) ||
      String(table.tableNumber).includes(keyword) ||
      table.floor?.toLowerCase().includes(keyword) ||
      table.section?.toLowerCase().includes(keyword);

    const matchesStatus = !statusFilter || table.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Available":
        return "status-available";

      case "Occupied":
        return "status-occupied";

      case "Reserved":
        return "status-reserved";

      case "Cleaning":
        return "status-cleaning";

      case "Out Of Service":
        return "status-out-service";

      default:
        return "";
    }
  };

  return (
    <div className="table-page">
      <div className="table-page-header">
        <div>
          <h2>Tables</h2>
          <p>Manage restaurant tables</p>
        </div>

        <AddButton onClick={handleAdd}>Add Table</AddButton>
      </div>

      <div className="table-toolbar">
        <input
          type="text"
          placeholder="Search table..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          name="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: "", label: "All Status" },
            { value: "Available", label: "Available" },
            { value: "Occupied", label: "Occupied" },
            { value: "Reserved", label: "Reserved" },
            { value: "Cleaning", label: "Cleaning" },
            { value: "Out Of Service", label: "Out Of Service" },
          ]}
        />
      </div>

      {error && <div className="table-error">{error}</div>}

      <div className="table-table-container">
        <table className="table-data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Table Code</th>
              <th>Table Name</th>
              <th>Restaurant</th>
              <th>Store</th>
              <th>Table No</th>
              <th>Floor</th>
              <th>Section</th>
              <th>Capacity</th>
              <th>Shape</th>
              <th>Status</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="13" className="table-empty">
                  Loading...
                </td>
              </tr>
            ) : filteredTables.length === 0 ? (
              <tr>
                <td colSpan="13" className="table-empty">
                  No tables found
                </td>
              </tr>
            ) : (
              filteredTables.map((table, index) => (
                <tr key={table._id}>
                  <td>{index + 1}</td>

                  <td>{table.tableCode}</td>

                  <td>{table.tableName}</td>

                  <td>{table.restaurant?.restaurantName || "-"}</td>

                  <td>{table.store?.storeName || "-"}</td>

                  <td>{table.tableNumber}</td>

                  <td>{table.floor || "-"}</td>

                  <td>{table.section || "-"}</td>

                  <td>{table.capacity}</td>

                  <td>{table.shape}</td>

                  <td>
                    <select
                      className={`table-status-select ${getStatusClass(
                        table.status,
                      )}`}
                      value={table.status}
                      onChange={(e) =>
                        handleStatusChange(table._id, e.target.value)
                      }
                    >
                      <option value="Available">Available</option>

                      <option value="Occupied">Occupied</option>

                      <option value="Reserved">Reserved</option>

                      <option value="Cleaning">Cleaning</option>

                      <option value="Out Of Service">Out Of Service</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className={`table-active-btn ${
                        table.isActive ? "active" : "inactive"
                      }`}
                      onClick={() =>
                        table.isActive
                          ? handleDeactivate(table._id)
                          : handleActivate(table._id)
                      }
                    >
                      {table.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td>
                    <div className="modal-actions">
                      <EditButton onClick={() => handleEdit(table)} />

                      <DeleteButton onClick={() => handleDelete(table._id)} />

                      {table.status === "Occupied" && (
                        <button
                          className="table-action-btn release"
                          onClick={() => handleRelease(table._id)}
                        >
                          Release
                        </button>
                      )}

                      {table.status === "Occupied" && (
                        <button
                          className="table-action-btn clean"
                          onClick={() => handleClean(table._id)}
                        >
                          Clean
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

      {showModal && (
        <Modal
          open={showModal}
          onClose={handleClose}
          title={editId ? "Edit Table" : "Add Table"}
        >
          <TableForm
            editId={editId}
            formData={formData}
            loading={loading}
            submitError={error}
            restaurants={restaurants}
            stores={stores}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />
        </Modal>
      )}
    </div>
  );
};

export default Table;
