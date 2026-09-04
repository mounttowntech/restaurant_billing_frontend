import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import Modal from "../../components/Common/Modal";

import KotForm from "./KotForm";

import {
  fetchKOTs,
  createKOT,
  updateKOT,
  deleteKOT,
  searchKOT,
  markKOTPreparing,
  markKOTReady,
  markKOTServed,
  markKOTPrinted,
} from "../../features/kot/kotSlice";
import { fetchTables } from "../../features/table/tableSlice";
import "./Kot.css";

const KOT = () => {
  const dispatch = useDispatch();

  const {
    kots = [],
    loading = false,
    kotLoading = false,
    deleteLoading = false,
    actionLoading = false,
    error = null,
  } = useSelector((state) => state.kot || {});
  const { tables = [] } = useSelector((state) => state.tables || {});

  const state = useSelector((state) => state);
  console.log("KOT STATE Is :", state);

  const [showModal, setShowModal] = useState(false);

  const [editingKOT, setEditingKOT] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [typeFilter, setTypeFilter] = useState("All");

  // ==========================================================
  // FETCH KOTS
  // ==========================================================

  useEffect(() => {
    dispatch(fetchKOTs());
    dispatch(fetchTables());
  }, [dispatch]);

  // ==========================================================
  // ADD KOT
  // ==========================================================

  const handleAddKOT = () => {
    setEditingKOT(null);
    setShowModal(true);
  };

  // ==========================================================
  // EDIT KOT
  // ==========================================================

  const handleEditKOT = (kot) => {
    setEditingKOT(kot);
    setShowModal(true);
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingKOT(null);
  };

  // ==========================================================
  // CREATE / UPDATE
  // ==========================================================

  const handleSubmitKOT = async (formData) => {
    try {
      if (editingKOT?._id) {
        await dispatch(
          updateKOT({
            id: editingKOT._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createKOT(formData)).unwrap();
      }

      handleCloseModal();

      dispatch(fetchKOTs());
    } catch (error) {
      console.error("KOT save failed:", error);
    }
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDeleteKOT = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this KOT?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteKOT(id)).unwrap();

      dispatch(fetchKOTs());
    } catch (error) {
      console.error("KOT delete failed:", error);
    }
  };

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      dispatch(fetchKOTs());
      return;
    }

    dispatch(searchKOT(value));
  };

  // ==========================================================
  // STATUS ACTIONS
  // ==========================================================

  const handlePreparing = async (id) => {
    try {
      await dispatch(markKOTPreparing(id)).unwrap();
    } catch (error) {
      console.error("KOT preparing failed:", error);
    }
  };

  const handleReady = async (id) => {
    try {
      await dispatch(markKOTReady(id)).unwrap();
    } catch (error) {
      console.error("KOT ready failed:", error);
    }
  };

  const handleServed = async (id) => {
    try {
      await dispatch(markKOTServed(id)).unwrap();
    } catch (error) {
      console.error("KOT served failed:", error);
    }
  };

  const handlePrinted = async (id) => {
    try {
      await dispatch(markKOTPrinted(id)).unwrap();
    } catch (error) {
      console.error("KOT printed failed:", error);
    }
  };

  // FILTER

  const filteredKOTs = kots.filter((kot) => {
    if (statusFilter !== "All" && kot.kitchenStatus !== statusFilter) {
      return false;
    }

    if (priorityFilter !== "All" && kot.priority !== priorityFilter) {
      return false;
    }

    if (typeFilter !== "All" && kot.kotType !== typeFilter) {
      return false;
    }

    return true;
  });

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const totalKOTs = kots.length;

  const pendingKOTs = kots.filter(
    (kot) => kot.kitchenStatus === "Pending",
  ).length;

  const preparingKOTs = kots.filter(
    (kot) => kot.kitchenStatus === "Preparing",
  ).length;

  const readyKOTs = kots.filter((kot) => kot.kitchenStatus === "Ready").length;

  const servedKOTs = kots.filter(
    (kot) => kot.kitchenStatus === "Served",
  ).length;

  console.log("KOT TABLES:", tables);

  return (
    <div className="kot-page">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="kot-page-header">
        <div>
          <h1>KOT</h1>
          <p>Manage kitchen orders and food preparation</p>
        </div>

        <AddButton type="button" className="kot-add-btn" onClick={handleAddKOT}>
          + Add KOT
        </AddButton>
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && <div className="kot-error-box">{error}</div>}

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="kot-summary-grid">
        <div className="kot-summary-card">
          <div className="kot-summary-label">Total KOT</div>

          <div className="kot-summary-value">{totalKOTs}</div>
        </div>

        <div className="kot-summary-card">
          <div className="kot-summary-label">Pending</div>

          <div className="kot-summary-value">{pendingKOTs}</div>
        </div>

        <div className="kot-summary-card">
          <div className="kot-summary-label">Preparing</div>

          <div className="kot-summary-value">{preparingKOTs}</div>
        </div>

        <div className="kot-summary-card">
          <div className="kot-summary-label">Ready</div>

          <div className="kot-summary-value">{readyKOTs}</div>
        </div>

        <div className="kot-summary-card">
          <div className="kot-summary-label">Served</div>

          <div className="kot-summary-value">{servedKOTs}</div>
        </div>
      </div>

      {/* ======================================================
          MAIN GRID
      ====================================================== */}

      <div className="kot-grid-page">
        {/* ====================================================
            TOOLBAR
        ==================================================== */}

        <div className="kot-toolbar">
          <div className="kot-search">
            <input
              type="text"
              placeholder="Search KOT..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="kot-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Served">Served</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="kot-filter">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priority</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="kot-filter">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Dine In">Dine In</option>
              <option value="Takeaway">Takeaway</option>
              <option value="Delivery">Delivery</option>
              <option value="Online">Online</option>
              <option value="QR Order">QR Order</option>
            </select>
          </div>
        </div>

        <div className="kot-table-container">
          {loading ? (
            <div className="kot-loading">Loading KOTs...</div>
          ) : filteredKOTs.length === 0 ? (
            <div className="kot-empty">No KOTs found.</div>
          ) : (
            <table className="kot-table">
              <thead>
                <tr>
                  <th>KOT No</th>
                  <th>Type</th>
                  <th>Table</th>
                  {/* <th>Waiter</th>
                  <th>Chef</th> */}
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Printed</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredKOTs.map((kot) => (
                  <tr key={kot._id}>
                    <td>
                      <strong>{kot.kotNo}</strong>
                    </td>

                    <td>{kot.kotType}</td>

                    <td>
                      {kot.table?.tableName ||
                        kot.table?.name ||
                        kot.table?._id ||
                        "-"}
                    </td>

                    {/* <td>
                      {kot.waiter?.name ||
                        kot.waiter?.waiterName ||
                        kot.waiter?._id ||
                        "-"}
                    </td>

                    <td>
                      {kot.chef?.name ||
                        kot.chef?.chefName ||
                        kot.chef?._id ||
                        "-"}
                    </td> */}

                    <td>
                      <div className="kot-items-count">{kot.totalItems}</div>
                    </td>

                    <td>{kot.totalQuantity}</td>

                    <td>
                      <span
                        className={`kot-priority-badge ${String(
                          kot.priority,
                        ).toLowerCase()}`}
                      >
                        {kot.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`kot-status-badge ${String(
                          kot.kitchenStatus,
                        ).toLowerCase()}`}
                      >
                        {kot.kitchenStatus}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`kot-printed-badge ${
                          kot.printed ? "printed" : "not-printed"
                        }`}
                      >
                        {kot.printed ? "Printed" : "Not Printed"}
                      </span>
                    </td>

                    <td>
                      <div className="modal-actions">
                        {kot.kitchenStatus === "Pending" && (
                          <button
                            type="button"
                            className="kot-action-btn preparing"
                            disabled={actionLoading}
                            onClick={() => handlePreparing(kot._id)}
                          >
                            Preparing
                          </button>
                        )}

                        {kot.kitchenStatus === "Preparing" && (
                          <button
                            type="button"
                            className="kot-action-btn ready"
                            disabled={actionLoading}
                            onClick={() => handleReady(kot._id)}
                          >
                            Ready
                          </button>
                        )}

                        {kot.kitchenStatus === "Ready" && (
                          <button
                            type="button"
                            className="kot-action-btn served"
                            disabled={actionLoading}
                            onClick={() => handleServed(kot._id)}
                          >
                            Served
                          </button>
                        )}

                        {!kot.printed && (
                          <button
                            type="button"
                            className="kot-action-btn printed"
                            disabled={actionLoading}
                            onClick={() => handlePrinted(kot._id)}
                          >
                            Print
                          </button>
                        )}

                        <EditButton
                          type="button"
                          className="kot-edit-btn"
                          onClick={() => handleEditKOT(kot)}
                        >
                          Edit
                        </EditButton>

                        <DeleteButton
                          type="button"
                          className="kot-delete-btn"
                          disabled={deleteLoading}
                          onClick={() => handleDeleteKOT(kot._id)}
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

      {/* ======================================================
          MODAL
      ====================================================== */}

      <Modal
        open={showModal}
        title={editingKOT ? "Edit KOT" : "Add KOT"}
        onClose={handleCloseModal}
        size="lg"
      >
        <KotForm
          editingKOT={editingKOT}
          onSubmit={handleSubmitKOT}
          onCancel={handleCloseModal}
          tables={tables}
          loading={kotLoading}
        />
      </Modal>
    </div>
  );
};

export default KOT;
