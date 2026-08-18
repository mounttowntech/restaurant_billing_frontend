import { useEffect, useMemo, useState } from "react";
import Modal from "../../components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  AddButton,
  CancelButton,
  EditButton,
  DeleteButton,
} from "../../components/Common/Button";
import {
  cancelInvoice,
  deleteInvoice,
  fetchInvoices,
  markInvoicePaid,
  updateInvoice,
  createInvoice,
  refundInvoice,
  restoreInvoice,
} from "../../features/invoice/invoiceSlice";

import InvoiceForm from "./InvoiceForm";

import "./Invoice.css";

const Invoice = () => {
  const dispatch = useDispatch();

  const {
    invoices = [],
    loading,
    deleteLoading,
    paymentLoading,
    actionLoading,
    error,
  } = useSelector((state) => state.invoice || {});

  const [showForm, setShowForm] = useState(false);

  const [editingInvoice, setEditingInvoice] = useState(null);

  const [search, setSearch] = useState("");

  const [paymentFilter, setPaymentFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const filteredInvoices = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return invoices.filter((invoice) => {
      const invoiceNo = invoice.invoiceNo?.toLowerCase() || "";

      const customerName =
        invoice.customerName?.toLowerCase() ||
        invoice.customer?.name?.toLowerCase() ||
        "";

      const customerMobile =
        invoice.customerMobile || invoice.customer?.mobile || "";

      const matchesSearch =
        !searchValue ||
        invoiceNo.includes(searchValue) ||
        customerName.includes(searchValue) ||
        customerMobile.toString().includes(searchValue);

      const matchesPayment =
        paymentFilter === "All" || invoice.paymentStatus === paymentFilter;

      const matchesStatus =
        statusFilter === "All" || invoice.invoiceStatus === statusFilter;

      return matchesSearch && matchesPayment && matchesStatus;
    });
  }, [invoices, search, paymentFilter, statusFilter]);

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?",
    );

    if (!confirmDelete) return;

    dispatch(deleteInvoice(id));
  };

  const handleMarkPaid = (invoice) => {
    const paymentMethod = window.prompt(
      "Enter payment method: Cash, Card, UPI",
      invoice.paymentMethod || "Cash",
    );

    if (!paymentMethod) return;

    dispatch(
      markInvoicePaid({
        id: invoice._id,
        data: {
          paymentMethod,
          transactionId: "",
        },
      }),
    );
  };

  const handleCancel = (id) => {
    const remarks = window.prompt(
      "Enter cancellation remarks",
      "Cancelled by cashier",
    );

    if (remarks === null) return;

    dispatch(
      cancelInvoice({
        id,
        data: {
          remarks,
        },
      }),
    );
  };

  const handleRefund = (id) => {
    const confirmRefund = window.confirm(
      "Are you sure you want to refund this invoice?",
    );

    if (!confirmRefund) return;

    dispatch(refundInvoice(id));
  };

  const handleRestore = (id) => {
    dispatch(restoreInvoice(id));
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingInvoice(null);
  };

  const handleSubmitInvoice = async (data) => {
    console.log("Data from InvoiceForm :", data);
    try {
      if (editingInvoice) {
        await dispatch(
          updateInvoice({
            id: editingInvoice._id,
            data,
          }),
        ).unwrap();
      } else {
        await dispatch(createInvoice(data)).unwrap();
      }

      setShowForm(false);
      setEditingInvoice(null);

      dispatch(fetchInvoices());
    } catch (error) {
      console.error("Invoice submit error:", error);
    }
  };
  console.log("Invoices are :", invoices);
  return (
    <div className="invoice-page">
      {/* ======================================================
          Header
      ====================================================== */}

      <div className="invoice-page-header">
        <div>
          <h1>Invoices</h1>

          <p>Manage restaurant invoices and payments</p>
        </div>

        <AddButton
          className="invoice-primary-btn"
          onClick={() => {
            setEditingInvoice(null);
            setShowForm(true);
          }}
        >
          + Add Invoice
        </AddButton>
      </div>

      {/* ======================================================
          Error
      ====================================================== */}

      {error && <div className="invoice-error">{error}</div>}
      <div className="invoice-page-content">
        <div className="invoice-filter-card">
          <div className="invoice-search">
            <input
              type="text"
              placeholder="Search invoice, customer or mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="All">All Payments</option>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
            <option value="Paid">Paid</option>
            <option value="Refunded">Refunded</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="invoice-filter-actions">
          <div className="invoice-table-card">
            <div className="invoice-table-wrapper">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="invoice-empty">
                        Loading invoices...
                      </td>
                    </tr>
                  ) : filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="invoice-empty">
                        No invoices found
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice._id}>
                        <td>
                          <strong>{invoice.invoiceNo}</strong>
                        </td>

                        <td>
                          {invoice.invoiceDate
                            ? new Date(invoice.invoiceDate).toLocaleDateString()
                            : "-"}
                        </td>

                        <td>
                          {invoice.customerName ||
                            invoice.customer?.name ||
                            "Walk-in Customer"}

                          {(invoice.customerMobile ||
                            invoice.customer?.mobile) && (
                            <small>
                              {invoice.customerMobile ||
                                invoice.customer?.mobile}
                            </small>
                          )}
                        </td>

                        <td>{invoice.billingType || "Dine In"}</td>

                        <td>{invoice.totalQuantity || 0}</td>

                        <td>₹{Number(invoice.grandTotal || 0).toFixed(2)}</td>

                        <td>
                          <span
                            className={`invoice-badge payment-${(
                              invoice.paymentStatus || ""
                            ).toLowerCase()}`}
                          >
                            {invoice.paymentStatus || "Pending"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`invoice-badge status-${(
                              invoice.invoiceStatus || ""
                            ).toLowerCase()}`}
                          >
                            {invoice.invoiceStatus || "-"}
                          </span>
                        </td>

                        <td>
                          <div className="modal-actions">
                            <EditButton
                              type="button"
                              onClick={() => handleEdit(invoice)}
                            >
                              Edit
                            </EditButton>

                            {invoice.paymentStatus !== "Paid" &&
                              invoice.invoiceStatus !== "Cancelled" && (
                                <button
                                  type="button"
                                  onClick={() => handleMarkPaid(invoice)}
                                  disabled={paymentLoading}
                                >
                                  Paid
                                </button>
                              )}

                            {invoice.invoiceStatus !== "Cancelled" && (
                              <CancelButton
                                type="button"
                                onClick={() => handleCancel(invoice._id)}
                                disabled={actionLoading}
                              >
                                Cancel
                              </CancelButton>
                            )}

                            {invoice.paymentStatus === "Paid" &&
                              invoice.refundStatus !== "Refunded" && (
                                <button
                                  type="button"
                                  onClick={() => handleRefund(invoice._id)}
                                  disabled={actionLoading}
                                >
                                  Refund
                                </button>
                              )}

                            {invoice.isDeleted && (
                              <button
                                type="button"
                                onClick={() => handleRestore(invoice._id)}
                                disabled={actionLoading}
                              >
                                Restore
                              </button>
                            )}

                            {!invoice.isDeleted && (
                              <DeleteButton
                                type="button"
                                onClick={() => handleDelete(invoice._id)}
                                disabled={deleteLoading}
                              >
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
          </div>
        </div>

        {/* ======================================================
          Table
      ====================================================== */}

        <Modal
          open={showForm}
          title={editingInvoice ? "Edit Invoice" : "Add Invoice"}
          onClose={handleFormClose}
          size="lg"
        >
          <InvoiceForm
            editingInvoice={editingInvoice}
            onSubmit={handleSubmitInvoice}
            onCancel={handleFormClose}
            loading={loading}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Invoice;
