import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getPOSBills,
  getPOSBillById,
  holdBill,
  resumeBill,
  makePayment,
  cancelBill,
  clearPOSBill,
} from "../../features/posBilling/posBillingSlice";

import POSBillingForm from "./POSBillingForm";

import "./POSBilling.css";

const POSBilling = () => {
  const dispatch = useDispatch();

  const {
    bills = [],
    bill = null,
    total = 0,
    page = 1,
    limit = 20,
    totalPages = 0,
    loading = false,
    error = null,
    actionLoading = false,
    actionError = null,
  } = useSelector((state) => state.posBilling || {});

  // ==================================================
  // SEARCH / FILTER
  // ==================================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");

  // ==================================================
  // PAYMENT
  // ==================================================

  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const [paymentAmount, setPaymentAmount] = useState("");

  const [referenceNo, setReferenceNo] = useState("");

  // ==================================================
  // CANCEL
  // ==================================================

  const [cancelReason, setCancelReason] = useState("");

  // ==================================================
  // INITIAL FETCH
  // ==================================================

  useEffect(() => {
    dispatch(
      getPOSBills({
        page: 1,
        limit: 20,
      }),
    );
  }, [dispatch]);

  // ==================================================
  // AFTER BILL CREATED (from POSBillingForm)
  // ==================================================

  const handleBillCreated = () => {
    dispatch(
      getPOSBills({
        page: 1,
        limit: 20,
      }),
    );
  };

  // ==================================================
  // SEARCH
  // ==================================================

  const handleSearch = () => {
    dispatch(
      getPOSBills({
        page: 1,
        limit: 20,
        search,
        status,
        paymentStatus,
      }),
    );
  };

  // ==================================================
  // RESET SEARCH
  // ==================================================

  const handleResetSearch = () => {
    setSearch("");
    setStatus("");
    setPaymentStatus("");

    dispatch(
      getPOSBills({
        page: 1,
        limit: 20,
      }),
    );
  };

  // ==================================================
  // PAGE
  // ==================================================

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (totalPages && newPage > totalPages)) {
      return;
    }

    dispatch(
      getPOSBills({
        page: newPage,
        limit,
        search,
        status,
        paymentStatus,
      }),
    );
  };

  // ==================================================
  // VIEW BILL
  // ==================================================

  const handleViewBill = (id) => {
    dispatch(getPOSBillById(id));
  };

  // ==================================================
  // HOLD
  // ==================================================

  const handleHold = async (id) => {
    try {
      await dispatch(holdBill(id)).unwrap();

      alert("Bill placed on hold");

      dispatch(
        getPOSBills({
          page,
          limit,
          search,
          status,
          paymentStatus,
        }),
      );
    } catch (error) {
      console.error("Hold Bill Error:", error);
    }
  };

  // ==================================================
  // RESUME
  // ==================================================

  const handleResume = async (id) => {
    try {
      await dispatch(resumeBill(id)).unwrap();

      alert("Bill resumed successfully");

      dispatch(
        getPOSBills({
          page,
          limit,
          search,
          status,
          paymentStatus,
        }),
      );
    } catch (error) {
      console.error("Resume Bill Error:", error);
    }
  };

  // ==================================================
  // PAYMENT
  // ==================================================

  const handlePayment = async (id) => {
    if (!paymentAmount) {
      alert("Enter payment amount");
      return;
    }

    try {
      await dispatch(
        makePayment({
          id,
          method: paymentMethod,
          amount: Number(paymentAmount),
          referenceNo,
        }),
      ).unwrap();

      alert("Payment recorded successfully");

      setPaymentAmount("");
      setReferenceNo("");

      dispatch(
        getPOSBills({
          page,
          limit,
          search,
          status,
          paymentStatus,
        }),
      );
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  // ==================================================
  // CANCEL
  // ==================================================

  const handleCancel = async (id) => {
    if (!cancelReason.trim()) {
      alert("Enter cancellation reason");
      return;
    }

    try {
      await dispatch(
        cancelBill({
          id,
          cancelReason,
        }),
      ).unwrap();

      alert("Bill cancelled successfully");

      setCancelReason("");

      dispatch(
        getPOSBills({
          page,
          limit,
          search,
          status,
          paymentStatus,
        }),
      );
    } catch (error) {
      console.error("Cancel Bill Error:", error);
    }
  };

  // ==================================================
  // FORMAT CURRENCY
  // ==================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="pos-billing-page">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="pos-billing-header">
        <div>
          <h1>POS Billing</h1>

          <p>Create and manage restaurant POS bills</p>
        </div>
      </div>

      {/* ==================================================
          ERROR
      ================================================== */}

      {error && <div className="pos-error">{error}</div>}

      {actionError && <div className="pos-error">{actionError}</div>}

      {/* ==================================================
          CREATE BILL FORM
      ================================================== */}

      <POSBillingForm onCreated={handleBillCreated} />

      {/* ==================================================
          BILL LIST
      ================================================== */}

      <div className="pos-bills-box">
        <div className="pos-bills-header">
          <div>
            <h2>POS Bills</h2>

            <p>Total Bills: {total}</p>
          </div>
        </div>

        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="pos-filters">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bill / customer / phone"
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>

            <option value="DRAFT">Draft</option>

            <option value="HOLD">Hold</option>

            <option value="RESUMED">Resumed</option>

            <option value="COMPLETED">Completed</option>

            <option value="CANCELLED">Cancelled</option>
          </select>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="">All Payments</option>

            <option value="PENDING">Pending</option>

            <option value="PARTIAL">Partial</option>

            <option value="PAID">Paid</option>
          </select>

          <button type="button" onClick={handleSearch}>
            Search
          </button>

          <button type="button" onClick={handleResetSearch}>
            Reset
          </button>
        </div>

        {/* ==================================================
            TABLE
        ================================================== */}

        <div className="pos-table-wrapper">
          <table className="pos-table">
            <thead>
              <tr>
                <th>Bill No</th>
                <th>Customer</th>
                <th>Order Type</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="pos-empty">
                    Loading bills...
                  </td>
                </tr>
              ) : bills.length === 0 ? (
                <tr>
                  <td colSpan="9" className="pos-empty">
                    No POS bills found
                  </td>
                </tr>
              ) : (
                bills.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <strong>{item.billNo}</strong>
                    </td>

                    <td>{item.customerName || item.customer?.name || "-"}</td>

                    <td>{item.orderType || "-"}</td>

                    <td>{formatCurrency(item.netAmount)}</td>

                    <td>{formatCurrency(item.paidAmount)}</td>

                    <td>{formatCurrency(item.balanceAmount)}</td>

                    <td>
                      <span
                        className={`pos-status payment-${String(
                          item.paymentStatus || "",
                        ).toLowerCase()}`}
                      >
                        {item.paymentStatus || "-"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`pos-status status-${String(
                          item.status || "",
                        ).toLowerCase()}`}
                      >
                        {item.status || "-"}
                      </span>
                    </td>

                    <td>
                      <div className="pos-actions">
                        <button
                          type="button"
                          onClick={() => handleViewBill(item._id)}
                        >
                          View
                        </button>

                        {item.status !== "COMPLETED" &&
                          item.status !== "CANCELLED" &&
                          item.status !== "HOLD" && (
                            <button
                              type="button"
                              onClick={() => handleHold(item._id)}
                              disabled={actionLoading}
                            >
                              Hold
                            </button>
                          )}

                        {item.status === "HOLD" && (
                          <button
                            type="button"
                            onClick={() => handleResume(item._id)}
                            disabled={actionLoading}
                          >
                            Resume
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

        {/* ==================================================
            PAGINATION
        ================================================== */}

        {totalPages > 1 && (
          <div className="pos-pagination">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ==================================================
          SELECTED BILL
      ================================================== */}

      {bill && (
        <div className="pos-selected-bill">
          <div className="pos-selected-header">
            <div>
              <h2>Bill Details</h2>

              <p>{bill.billNo}</p>
            </div>

            <button type="button" onClick={() => dispatch(clearPOSBill())}>
              ×
            </button>
          </div>

          <div className="pos-bill-summary">
            <div>
              <span>Sub Total</span>

              <strong>{formatCurrency(bill.subTotal)}</strong>
            </div>

            <div>
              <span>Item Discount</span>

              <strong>{formatCurrency(bill.itemDiscount)}</strong>
            </div>

            <div>
              <span>Bill Discount</span>

              <strong>{formatCurrency(bill.billDiscountAmount)}</strong>
            </div>

            <div>
              <span>Tax</span>

              <strong>{formatCurrency(bill.totalTax)}</strong>
            </div>

            <div>
              <span>Net Amount</span>

              <strong>{formatCurrency(bill.netAmount)}</strong>
            </div>

            <div>
              <span>Paid</span>

              <strong>{formatCurrency(bill.paidAmount)}</strong>
            </div>

            <div>
              <span>Balance</span>

              <strong>{formatCurrency(bill.balanceAmount)}</strong>
            </div>
          </div>

          {/* ==================================================
              PAYMENT
          ================================================== */}

          {bill.paymentStatus !== "PAID" && bill.status !== "CANCELLED" && (
            <div className="pos-action-box">
              <h3>Make Payment</h3>

              <div className="pos-form-grid">
                <div className="pos-form-group">
                  <label>Method</label>

                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="CASH">Cash</option>

                    <option value="CARD">Card</option>

                    <option value="UPI">UPI</option>

                    <option value="BANK">Bank</option>
                  </select>
                </div>

                <div className="pos-form-group">
                  <label>Amount</label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Payment amount"
                  />
                </div>

                <div className="pos-form-group">
                  <label>Reference No</label>

                  <input
                    type="text"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <button
                type="button"
                className="pos-payment-button"
                onClick={() => handlePayment(bill._id)}
                disabled={actionLoading}
              >
                Record Payment
              </button>
            </div>
          )}

          {/* ==================================================
              CANCEL
          ================================================== */}

          {bill.status !== "CANCELLED" && bill.paymentStatus !== "PAID" && (
            <div className="pos-action-box">
              <h3>Cancel Bill</h3>

              <div className="pos-form-group">
                <label>Cancellation Reason</label>

                <input
                  type="text"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter cancellation reason"
                />
              </div>

              <button
                type="button"
                className="pos-cancel-button"
                onClick={() => handleCancel(bill._id)}
                disabled={actionLoading}
              >
                Cancel Bill
              </button>
            </div>
          )}

          {/* ==================================================
              BILL ITEMS
          ================================================== */}

          {Array.isArray(bill.items) && bill.items.length > 0 && (
            <div className="pos-selected-items">
              <h3>Bill Items</h3>

              <table>
                <thead>
                  <tr>
                    <th>Product</th>

                    <th>Qty</th>

                    <th>Price</th>

                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {bill.items.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>
                        {item.product?.name ||
                          item.product?.productName ||
                          item.product ||
                          "-"}
                      </td>

                      <td>{item.quantity}</td>

                      <td>{formatCurrency(item.price)}</td>

                      <td>{formatCurrency(item.totalAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default POSBilling;
