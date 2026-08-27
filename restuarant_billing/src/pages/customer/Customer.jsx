import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";
import "./Customer.css";

import Modal from "../../components/Common/Modal";

import CustomerForm from "./CustomerForm";

import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  changeCustomerStatus,
  searchCustomers,
} from "../../features/customer/customerSlice";

const Customer = () => {
  const dispatch = useDispatch();

  const {
    customers = [],
    loading = false,
    customerLoading = false,
    deleteLoading = false,
    error = null,
  } = useSelector((state) => state.customer || {});
  const { stores = [] } = useSelector((state) => state.stores || {});
  const { restaurants = [] } = useSelector((state) => state.restaurants || {});
  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  // =====================================================
  // FETCH CUSTOMERS
  // =====================================================

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // =====================================================
  // OPEN ADD CUSTOMER MODAL
  // =====================================================

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT CUSTOMER MODAL
  // =====================================================

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
  };

  // =====================================================
  // CREATE / UPDATE CUSTOMER
  // =====================================================

  const handleSubmitCustomer = async (formData) => {
    try {
      if (editingCustomer?._id) {
        await dispatch(
          updateCustomer({
            id: editingCustomer._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createCustomer(formData)).unwrap();
      }

      handleCloseModal();

      // Refresh list after create/update
      dispatch(fetchCustomers());
    } catch (error) {
      console.error("Customer save failed:", error);
    }
  };

  // =====================================================
  // DELETE CUSTOMER
  // =====================================================

  const handleDeleteCustomer = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteCustomer(id)).unwrap();

      dispatch(fetchCustomers());
    } catch (error) {
      console.error("Customer delete failed:", error);
    }
  };

  // =====================================================
  // CHANGE STATUS
  // =====================================================

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(
        changeCustomerStatus({
          id,
          status,
        }),
      ).unwrap();

      dispatch(fetchCustomers());
    } catch (error) {
      console.error("Customer status update failed:", error);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      dispatch(fetchCustomers());
      return;
    }

    dispatch(searchCustomers(value));
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const filteredCustomers = customers.filter((customer) => {
    if (statusFilter === "All") {
      return true;
    }

    return customer.status === statusFilter;
  });

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive",
  ).length;

  const blockedCustomers = customers.filter(
    (customer) => customer.status === "Blocked",
  ).length;

  return (
    <div className="customer-page">
      <div className="customer-page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customers and their information</p>
        </div>

        <AddButton
          type="button"
          className="customer-add-btn"
          onClick={handleAddCustomer}
        >
          + Add Customer
        </AddButton>
      </div>

      {error && <div className="customer-error-box">{error}</div>}

      <div className="customer-summary-grid">
        <div className="customer-summary-card">
          <div className="customer-summary-label">Total Customers</div>

          <div className="customer-summary-value">{totalCustomers}</div>
        </div>

        <div className="customer-summary-card">
          <div className="customer-summary-label">Active Customers</div>

          <div className="customer-summary-value">{activeCustomers}</div>
        </div>

        <div className="customer-summary-card">
          <div className="customer-summary-label">Inactive Customers</div>

          <div className="customer-summary-value">{inactiveCustomers}</div>
        </div>

        <div className="customer-summary-card">
          <div className="customer-summary-label">Blocked Customers</div>

          <div className="customer-summary-value">{blockedCustomers}</div>
        </div>
      </div>
      <div className="customer-grid-page">
        <div className="customer-toolbar">
          <div className="customer-search">
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="customer-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        <div className="customer-table-container">
          {loading ? (
            <div className="customer-loading">Loading customers...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="customer-empty">No customers found.</div>
          ) : (
            <table className="customer-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Customer Name</th>
                  <th>Type</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Membership</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer.customerCode || "-"}</td>

                    <td>
                      <div className="customer-name">
                        {customer.customerName || "-"}
                      </div>
                    </td>

                    <td>{customer.customerType || "-"}</td>

                    <td>{customer.mobile || "-"}</td>

                    <td>{customer.email || "-"}</td>

                    <td>{customer.membershipType || "None"}</td>

                    <td>
                      <select
                        className={`customer-status-select ${String(
                          customer.status || "",
                        ).toLowerCase()}`}
                        value={customer.status || "Active"}
                        onChange={(e) =>
                          handleStatusChange(customer._id, e.target.value)
                        }
                      >
                        <option value="Active">Active</option>

                        <option value="Inactive">Inactive</option>

                        <option value="Blocked">Blocked</option>
                      </select>
                    </td>

                    <td>
                      <div className="modal-actions">
                        <EditButton
                          type="button"
                          className="customer-edit-btn"
                          onClick={() => handleEditCustomer(customer)}
                        >
                          Edit
                        </EditButton>

                        <DeleteButton
                          type="button"
                          className="customer-delete-btn"
                          onClick={() => handleDeleteCustomer(customer._id)}
                          disabled={deleteLoading}
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
      <Modal
        open={showModal}
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
        onClose={handleCloseModal}
        size="lg"
      >
        <CustomerForm
          editingCustomer={editingCustomer}
          onSubmit={handleSubmitCustomer}
          onCancel={handleCloseModal}
          loading={customerLoading}
          restaurants={restaurants}
          stores={stores}
        />
      </Modal>
    </div>
  );
};

export default Customer;
