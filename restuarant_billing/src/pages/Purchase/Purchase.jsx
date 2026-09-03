import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  EditButton,
  AddButton,
  CancelButton,
  DeleteButton,
  SaveButton,
  PaymentButton,
} from "../../components/Common/Button";

import Modal from "../../components/Common/Modal";

import PurchaseForm from "./PurchaseForm";

import {
  fetchPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
  receivePurchase,
  cancelPurchase,
  updatePaymentStatus,
  searchPurchase,
  fetchPurchaseById,
  fetchPurchaseSummary,
} from "../../features/purchase/purchaseSlice";

import { fetchStores } from "../../features/store/storeSlice";
import { fetchSuppliers } from "../../features/supplier/supplierSlice";
import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";
import { fetchWarehouses } from "../../features/warehouse/warehouseSlice";
import { fetchIngredients } from "../../features/ingredient/ingredientSlice";
// import { fetchBatches } from "../../features/batch/batchSlice.js";
import { fetchUnits } from "../../features/unit/unitSlice";

import "./Purchase.css";

const Purchase = () => {
  const dispatch = useDispatch();

  const {
    purchases = [],
    totalRecords = 0,
    loading = false,
    error = null,
    success = false,
    message = "",
    summary = {},
  } = useSelector((state) => state.purchase || {});

  const { restaurants = [] } = useSelector((state) => state.restaurants || {});

  const { stores = [] } = useSelector((state) => state.stores || {});

  const { suppliers = [] } = useSelector((state) => state.supplier || {});

  const { warehouses = [] } = useSelector((state) => state.warehouse || {});

  const { ingredients = [] } = useSelector((state) => state.ingredient || {});

  // const { batches = [] } = useSelector((state) => state.batch || {});

  const { units = [] } = useSelector((state) => state.unit || {});

  const state = useSelector((state) => state);
  console.log("STATE VALUES ARE :", state);

  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    dispatch(
      fetchPurchases({
        page,
        limit,
        ...filters,
      }),
    );

    dispatch(fetchPurchaseSummary());
  }, [dispatch, page, limit, filters]);

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
      fetchSuppliers({
        page: 1,
        limit: 1000,
      }),
    );

    dispatch(
      fetchWarehouses({
        page: 1,
        limit: 1000,
      }),
    );

    dispatch(
      fetchIngredients({
        page: 1,
        limit: 1000,
      }),
    );

    // dispatch(
    //   fetchBatches({
    //     page: 1,
    //     limit: 1000,
    //   }),
    // );

    dispatch(
      fetchUnits({
        page: 1,
        limit: 1000,
      }),
    );
  }, [dispatch]);

  const loadPurchases = () => {
    dispatch(
      fetchPurchases({
        page,
        limit,
        ...filters,
      }),
    );
  };

  const handleAddPurchase = () => {
    setEditingPurchase(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPurchase(null);
  };

  const handleSubmitPurchase = async (formData) => {
    console.log("Purchase form data:", formData);

    try {
      if (editingPurchase?._id) {
        await dispatch(
          updatePurchase({
            id: editingPurchase._id,
            purchase: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createPurchase(formData)).unwrap();
      }

      handleCloseModal();

      dispatch(
        fetchPurchases({
          page,
          limit,
          ...filters,
        }),
      );

      dispatch(fetchPurchaseSummary());
    } catch (error) {
      console.error("Purchase save failed:", error);
    }
  };

  const handleEditPurchase = async (id) => {
    try {
      const result = await dispatch(fetchPurchaseById(id)).unwrap();

      console.log("RESULT IS handleEditPurchase :", result);

      const purchase = result?.data || result?.purchase || result;
      console.log("Editing purchase:", purchase);

      setEditingPurchase(purchase);
      setShowModal(true);
    } catch (error) {
      console.error("Purchase fetch failed:", error);
    }
  };

  const handleDeletePurchase = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this purchase?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deletePurchase(id)).unwrap();

      loadPurchases();

      dispatch(fetchPurchaseSummary());
    } catch (error) {
      console.error("Purchase delete failed:", error);
    }
  };

  const handleReceivePurchase = async (id) => {
    const confirmed = window.confirm("Mark this purchase as received?");

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(receivePurchase(id)).unwrap();

      loadPurchases();

      dispatch(fetchPurchaseSummary());
    } catch (error) {
      console.error("Purchase receive failed:", error);
    }
  };

  const handleCancelPurchase = async (id) => {
    const confirmed = window.confirm("Cancel this purchase?");

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(cancelPurchase(id)).unwrap();

      loadPurchases();

      dispatch(fetchPurchaseSummary());
    } catch (error) {
      console.error("Purchase cancel failed:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      loadPurchases();
      return;
    }

    dispatch(searchPurchase(value));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setPage(1);

    setFilters((previous) => ({
      ...previous,
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

    try {
      await dispatch(
        updatePaymentStatus({
          id: paymentModal._id,
          data: {
            paidAmount: Number(paidAmount),
            paymentMethod,
          },
        }),
      ).unwrap();

      closePaymentModal();

      loadPurchases();

      dispatch(fetchPurchaseSummary());
    } catch (error) {
      console.error("Payment update failed:", error);
    }
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

  const restaurantOptions = restaurants.map((item) => ({
    label: item.restaurantName || item.restaurantCode || item.name || item._id,
    value: item._id,
  }));

  const storeOptions = stores.map((item) => ({
    label: item.storeName || item.storeCode || item.name || item._id,
    value: item._id,
  }));

  const supplierOptions = suppliers.map((item) => ({
    label: item.supplierName || item.name || item.supplierCode || item._id,
    value: item._id,
  }));

  const warehouseOptions = warehouses.map((item) => ({
    label: item.warehouseName || item.name || item.warehouseCode || item._id,
    value: item._id,
  }));

  const ingredientOptions = ingredients.map((item) => ({
    label: item.ingredientName || item.name || item.ingredientCode || item._id,
    value: item._id,
  }));

  // const batchOptions = batches.map((item) => ({
  //   label: item.batchNumber || item.batchCode || item.name || item._id,
  //   value: item._id,
  // }));

  const unitOptions = units.map((item) => ({
    label: item.unitName || item.name || item.unitCode || item._id,
    value: item._id,
  }));

  console.log("restaurantOptions is :", restaurantOptions);
  return (
    <div className="purchase-page">
      <div className="purchase-page-header">
        <div>
          <h1>Purchase Management</h1>

          <p>Manage purchases, suppliers, payments and stock receiving.</p>
        </div>

        <AddButton
          type="button"
          className="purchase-add-btn"
          onClick={handleAddPurchase}
        >
          + Add Purchase
        </AddButton>
      </div>

      {error && <div className="purchase-error">{error}</div>}

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

      <div className="purchase-toolbar">
        <div className="purchase-search">
          <input
            type="text"
            placeholder="Search purchase number, invoice or ingredient..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="purchase-filters">
          <select
            name="paymentStatus"
            value={filters.paymentStatus}
            onChange={handleFilterChange}
          >
            <option value="">All Payment Status</option>

            <option value="Pending">Pending</option>

            <option value="Partial">Partial</option>

            <option value="Paid">Paid</option>
          </select>

          <select
            name="purchaseStatus"
            value={filters.purchaseStatus}
            onChange={handleFilterChange}
          >
            <option value="">All Purchase Status</option>

            <option value="Draft">Draft</option>

            <option value="Ordered">Ordered</option>

            <option value="Received">Received</option>

            <option value="Cancelled">Cancelled</option>
          </select>

          <button type="button" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>

      <div className="purchase-table-wrapper">
        {loading ? (
          <div className="purchase-loading">Loading purchases...</div>
        ) : purchases.length === 0 ? (
          <div className="purchase-empty">No purchases found.</div>
        ) : (
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
              {purchases.map((purchase) => (
                <tr key={purchase._id}>
                  <td>
                    <strong>{purchase.purchaseNo || "-"}</strong>
                  </td>

                  <td>{formatDate(purchase.purchaseDate)}</td>

                  <td>
                    {purchase.supplier?.supplierName ||
                      purchase.supplier?.name ||
                      "-"}
                  </td>

                  <td>
                    {purchase.store?.storeName || purchase.store?.name || "-"}
                  </td>

                  <td>{purchase.invoiceNumber || "-"}</td>

                  <td>{purchase.totalItems ?? purchase.items?.length ?? 0}</td>

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
                    <div className="modal-actions">
                      <EditButton
                        type="button"
                        onClick={() => handleEditPurchase(purchase._id)}
                      >
                        Edit
                      </EditButton>

                      {purchase.purchaseStatus !== "Received" &&
                        purchase.purchaseStatus !== "Cancelled" && (
                          <button
                            type="button"
                            onClick={() => handleReceivePurchase(purchase._id)}
                          >
                            Receive
                          </button>
                        )}

                      {purchase.purchaseStatus !== "Received" &&
                        purchase.purchaseStatus !== "Cancelled" && (
                          <button
                            type="button"
                            onClick={() => handleCancelPurchase(purchase._id)}
                          >
                            Cancel
                          </button>
                        )}

                      <PaymentButton
                        type="button"
                        onClick={() => openPaymentModal(purchase)}
                      >
                        Payment
                      </PaymentButton>

                      <DeleteButton
                        type="button"
                        onClick={() => handleDeletePurchase(purchase._id)}
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

      {success && message && <div className="purchase-success">{message}</div>}

      <Modal
        open={showModal}
        title={editingPurchase ? "Edit Purchase" : "Add Purchase"}
        onClose={handleCloseModal}
        size="lg"
      >
        <PurchaseForm
          editingPurchase={editingPurchase}
          onSubmit={handleSubmitPurchase}
          onCancel={handleCloseModal}
          supplierOptions={supplierOptions}
          restaurantOptions={restaurantOptions}
          storeOptions={storeOptions}
          warehouseOptions={warehouseOptions}
          ingredientOptions={ingredientOptions}
          // batchOptions={batchOptions}
          unitOptions={unitOptions}
          purchaseUnitOptions={unitOptions}
          loading={loading}
        />
      </Modal>

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
