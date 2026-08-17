import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  EditButton,
  AddButton,
  CancelButton,
  DeleteButton,
  SaveButton,
  PaymentButton,
} from "../../components/common/Button";
import {
  fetchPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
  restorePurchase,
  receivePurchase,
  cancelPurchase,
  updatePaymentStatus,
  searchPurchase,
  fetchPurchaseById,
  fetchPurchaseSummary,
} from "../../features/purchase/purchaseSlice";

import PurchaseForm from "./PurchaseForm";
import Modal from "../../components/common/Modal";
import "./Purchase.css";

const Purchase = () => {
  const dispatch = useDispatch();
  const {
    purchases = [],
    selectedPurchase,
    totalRecords = 0,
    currentPage = 1,
    totalPages = 0,
    loading = false,
    error = null,
    success = false,
    message = "",
    summary = {},
  } = useSelector((state) => state.purchase || {});

  const [showForm, setShowForm] = useState(false);

  const [editingPurchase, setEditingPurchase] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [paymentModal, setPaymentModal] = useState(null);

  const [paidAmount, setPaidAmount] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [filters, setFilters] = useState({
    supplier: "",
    restaurant: "",
    store: "",
    warehouse: "",
    paymentStatus: "",
    purchaseStatus: "",
  });

  const loadPurchases = () => {
    dispatch(
      fetchPurchases({
        page,
        limit,
        ...filters,
      }),
    );
  };

  useEffect(() => {
    loadPurchases();

    dispatch(fetchPurchaseSummary());
  }, [
    page,
    filters.supplier,
    filters.restaurant,
    filters.store,
    filters.warehouse,
    filters.paymentStatus,
    filters.purchaseStatus,
  ]);

  // SEARCH

  const handleSearch = () => {
    if (!search.trim()) {
      setPage(1);
      loadPurchases();
      return;
    }

    dispatch(searchPurchase(search.trim()));
  };

  // CLEAR SEARCH

  const clearSearch = () => {
    setSearch("");
    setPage(1);

    dispatch(
      fetchPurchases({
        page: 1,
        limit,
        ...filters,
      }),
    );
  };

  // CREATE

  const handleCreate = async (data) => {
    const result = await dispatch(createPurchase(data));

    if (createPurchase.fulfilled.match(result)) {
      setShowForm(false);

      dispatch(
        fetchPurchases({
          page,
          limit,
          ...filters,
        }),
      );

      dispatch(fetchPurchaseSummary());
    }
  };

  // UPDATE
  const handleUpdate = async (data) => {
    if (!editingPurchase?._id) return;

    const result = await dispatch(
      updatePurchase({
        id: editingPurchase._id,
        purchase: data,
      }),
    );

    if (updatePurchase.fulfilled.match(result)) {
      setEditingPurchase(null);
      setShowForm(false);
      loadPurchases();
      dispatch(fetchPurchaseSummary());
    }
  };

  // DELETE

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this purchase?",
    );

    if (!confirmed) {
      return;
    }

    await dispatch(deletePurchase(id));

    loadPurchases();
  };

  // RESTORE

  const handleRestore = async (id) => {
    await dispatch(restorePurchase(id));

    loadPurchases();
  };

  // RECEIVE

  const handleReceive = async (id) => {
    const confirmed = window.confirm("Mark this purchase as received?");

    if (!confirmed) {
      return;
    }

    await dispatch(receivePurchase(id));

    loadPurchases();
  };

  const handleCancel = async (id) => {
    const confirmed = window.confirm("Cancel this purchase?");

    if (!confirmed) {
      return;
    }

    await dispatch(cancelPurchase(id));

    loadPurchases();
  };

  const handleEdit = async (id) => {
    const result = await dispatch(fetchPurchaseById(id));

    if (fetchPurchaseById.fulfilled.match(result)) {
      console.log("EDIT PURCHASE RESPONSE:", result.payload);

      const purchase =
        result.payload?.data || result.payload?.purchase || result.payload;

      setEditingPurchase(purchase || null);

      setShowForm(true);
    }
  };

  const openPaymentModal = (purchase) => {
    setPaymentModal(purchase);

    setPaidAmount(purchase.paidAmount || 0);

    setPaymentMethod(purchase.paymentMethod || "Cash");
  };

  const closePaymentModal = () => {
    setPaymentModal(null);
    setPaidAmount("");
    setPaymentMethod("Cash");
  };

  const handlePayment = async () => {
    if (!paymentModal?._id) {
      return;
    }

    const result = await dispatch(
      updatePaymentStatus({
        id: paymentModal._id,
        data: {
          paidAmount: Number(paidAmount),
          paymentMethod,
        },
      }),
    );

    if (updatePaymentStatus.fulfilled.match(result)) {
      closePaymentModal();
      loadPurchases();
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const resetFilters = () => {
    setFilters({
      supplier: "",
      restaurant: "",
      store: "",
      warehouse: "",
      paymentStatus: "",
      purchaseStatus: "",
    });

    setPage(1);
  };

  const openCreateForm = () => {
    setEditingPurchase(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPurchase(null);
  };

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    setPage(nextPage);
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN");
  };

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toFixed(2)}`;
  };

  return (
    <div className="purchase-page">
      <div className="purchase-page-header">
        <div>
          <h1>Purchase Management</h1>

          <p>Manage purchases, suppliers, payments and stock receiving.</p>
        </div>

        <AddButton className="purchase-add-btn" onClick={openCreateForm}>
          + Add Purchase
        </AddButton>
      </div>

      <div className="purchase-summary-cards">
        <div className="summary-card">
          <span>Total Purchases</span>

          <strong>{summary.count || totalRecords || 0}</strong>
        </div>

        <div className="summary-card">
          <span>Total Purchase</span>

          <strong>{formatMoney(summary.totalPurchase)}</strong>
        </div>

        <div className="summary-card">
          <span>Total Paid</span>

          <strong>{formatMoney(summary.totalPaid)}</strong>
        </div>

        <div className="summary-card">
          <span>Total Due</span>

          <strong>{formatMoney(summary.totalDue)}</strong>
        </div>
      </div>

      <Modal
        open={showForm}
        title={editingPurchase ? "Update Purchase" : "Create Purchase"}
        onClose={closeForm}
        size="lg"
      >
        <PurchaseForm
          initialData={editingPurchase}
          onSubmit={editingPurchase ? handleUpdate : handleCreate}
          onCancel={closeForm}
          loading={loading}
        />
      </Modal>

      <div className="purchase-toolbar">
        <div className="purchase-search">
          <input
            type="text"
            placeholder="Search purchase number, invoice or ingredient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <div className="purchase-filters">
            <select
              name="paymentStatus"
              value={filters.paymentStatus}
              onChange={handleFilterChange}
            >
              <option value="">Payment Status</option>

              <option value="Pending">Pending</option>

              <option value="Partial">Partial</option>

              <option value="Paid">Paid</option>
            </select>

            <button onClick={resetFilters}>Reset</button>
          </div>
          {/* <button onClick={handleSearch}>Search</button>

          {search && <button onClick={clearSearch}>Clear</button>} */}
        </div>

        <div className="purchase-table-wrapper">
          <table className="purchase-table">
            <thead>
              <tr>
                <th>Purchase No</th>

                <th>Date</th>

                <th>Supplier</th>

                <th>Store</th>

                <th>Invoice</th>

                <th>Items</th>

                <th>Grand Total</th>

                <th>Paid</th>

                <th>Due</th>

                <th>Payment</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="empty-cell">
                    Loading purchases...
                  </td>
                </tr>
              ) : purchases.length === 0 ? (
                <tr>
                  <td colSpan="12" className="empty-cell">
                    No purchases found.
                  </td>
                </tr>
              ) : (
                purchases.map((purchase) => (
                  <tr key={purchase._id}>
                    <td>
                      <strong>{purchase.purchaseNo}</strong>
                    </td>

                    <td>{formatDate(purchase.purchaseDate)}</td>

                    <td>{purchase.supplier?.supplierName || "-"}</td>

                    <td>{purchase.store?.storeName || "-"}</td>

                    <td>{purchase.invoiceNumber || "-"}</td>

                    <td>
                      {purchase.totalItems ?? purchase.items?.length ?? 0}
                    </td>

                    <td>{formatMoney(purchase.grandTotal)}</td>

                    <td>{formatMoney(purchase.paidAmount)}</td>

                    <td>{formatMoney(purchase.dueAmount)}</td>

                    <td>
                      <span
                        className={`payment-status ${String(
                          purchase.paymentStatus || "",
                        ).toLowerCase()}`}
                      >
                        {purchase.paymentStatus || "Pending"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`purchase-status ${String(
                          purchase.purchaseStatus || "",
                        ).toLowerCase()}`}
                      >
                        {purchase.purchaseStatus || "-"}
                      </span>
                    </td>

                    <td>
                      <div className="purchase-actions">
                        <EditButton onClick={() => handleEdit(purchase._id)}>
                          Edit
                        </EditButton>

                        {purchase.purchaseStatus !== "Received" &&
                          purchase.purchaseStatus !== "Cancelled" && (
                            <button onClick={() => handleReceive(purchase._id)}>
                              Receive
                            </button>
                          )}

                        {purchase.purchaseStatus !== "Received" &&
                          purchase.purchaseStatus !== "Cancelled" && (
                            <button onClick={() => handleCancel(purchase._id)}>
                              Cancel
                            </button>
                          )}

                        <PaymentButton
                          onClick={() => openPaymentModal(purchase)}
                        >
                          Payment
                        </PaymentButton>

                        <DeleteButton
                          onClick={() => handleDelete(purchase._id)}
                        >
                          Delete
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {error && <div className="purchase-error">{error}</div>}

      {success && message && <div className="purchase-success">{message}</div>}

      <Modal
        open={!!paymentModal}
        title="Update Payment"
        onClose={closePaymentModal}
        size="md"
      >
        <div className="payment-form">
          <div className="form-group">
            <label>Purchase No</label>

            <input
              type="text"
              value={paymentModal?.purchaseNo || ""}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Grand Total</label>

            <input
              type="text"
              value={formatMoney(paymentModal?.grandTotal)}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Paid Amount</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Bank">Bank</option>
              <option value="Cheque">Cheque</option>
              <option value="Credit">Credit</option>
            </select>
          </div>

          <div className="modal-actions">
            <CancelButton type="button" onClick={closePaymentModal}>
              Cancel
            </CancelButton>

            <SaveButton
              type="button"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Payment"}
            </SaveButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Purchase;
