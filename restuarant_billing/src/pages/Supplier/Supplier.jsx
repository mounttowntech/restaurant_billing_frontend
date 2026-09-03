import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import "./Supplier.css";

import Modal from "../../components/Common/Modal";

import SupplierForm from "./SupplierForm";

import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  changeSupplierStatus,
  searchSuppliers,
  markPreferred,
  removePreferred,
} from "../../features/supplier/supplierSlice";
import { fetchStores } from "../../features/store/storeSlice";
import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";
const Supplier = () => {
  const dispatch = useDispatch();

  const {
    suppliers = [],
    loading = false,
    supplierLoading = false,
    deleteLoading = false,
    statusLoading = false,
    error = null,
  } = useSelector((state) => state.supplier || {});
  const { stores = [] } = useSelector((state) => state.stores || {});
  const { restaurants = [] } = useSelector((state) => state.restaurants || {});
  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingSupplier, setEditingSupplier] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [typeFilter, setTypeFilter] = useState("All");

  // =====================================================
  // FETCH SUPPLIERS
  // =====================================================

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

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
  }, [dispatch]);
  // =====================================================
  // OPEN ADD SUPPLIER MODAL
  // =====================================================

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT SUPPLIER MODAL
  // =====================================================

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSupplier(null);
  };

  // =====================================================
  // CREATE / UPDATE SUPPLIER
  // =====================================================

  const handleSubmitSupplier = async (formData) => {
    try {
      if (editingSupplier?._id) {
        await dispatch(
          updateSupplier({
            id: editingSupplier._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createSupplier(formData)).unwrap();
      }

      handleCloseModal();

      dispatch(fetchSuppliers());
    } catch (error) {
      console.error("Supplier save failed:", error);
    }
  };

  // =====================================================
  // DELETE SUPPLIER
  // =====================================================

  const handleDeleteSupplier = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteSupplier(id)).unwrap();

      dispatch(fetchSuppliers());
    } catch (error) {
      console.error("Supplier delete failed:", error);
    }
  };

  // =====================================================
  // CHANGE STATUS
  // =====================================================

  const handleStatusChange = async (id, isActive) => {
    try {
      await dispatch(
        changeSupplierStatus({
          id,
          isActive,
        }),
      ).unwrap();

      dispatch(fetchSuppliers());
    } catch (error) {
      console.error("Supplier status update failed:", error);
    }
  };

  // =====================================================
  // PREFERRED SUPPLIER
  // =====================================================

  const handlePreferredChange = async (id, isPreferred) => {
    try {
      if (isPreferred) {
        await dispatch(markPreferred(id)).unwrap();
      } else {
        await dispatch(removePreferred(id)).unwrap();
      }

      dispatch(fetchSuppliers());
    } catch (error) {
      console.error("Preferred supplier update failed:", error);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      dispatch(fetchSuppliers());
      return;
    }

    dispatch(searchSuppliers(value));
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredSuppliers = suppliers.filter((supplier) => {
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active"
        ? supplier.isActive === true
        : supplier.isActive === false);

    const typeMatch =
      typeFilter === "All" || supplier.supplierType === typeFilter;

    return statusMatch && typeMatch;
  });

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalSuppliers = suppliers.length;

  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.isActive === true,
  ).length;

  const inactiveSuppliers = suppliers.filter(
    (supplier) => supplier.isActive === false,
  ).length;

  const preferredSuppliers = suppliers.filter(
    (supplier) => supplier.isPreferredSupplier === true,
  ).length;

  return (
    <div className="supplier-container">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="supplier-header">
        <div>
          <h1 className="supplier-title">Suppliers</h1>

          <p>Manage your suppliers and their information</p>
        </div>

        <AddButton
          type="button"
          className="supplier-add-btn"
          onClick={handleAddSupplier}
        >
          + Add Supplier
        </AddButton>
      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && <div className="supplier-error-box">{error}</div>}

      {/* ===================================================
          SUMMARY
      =================================================== */}

      <div className="supplier-summary-grid">
        <div className="supplier-summary-card">
          <div className="supplier-summary-label">Total Suppliers</div>

          <div className="supplier-summary-value">{totalSuppliers}</div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-label">Active Suppliers</div>

          <div className="supplier-summary-value">{activeSuppliers}</div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-label">Inactive Suppliers</div>

          <div className="supplier-summary-value">{inactiveSuppliers}</div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-label">Preferred Suppliers</div>

          <div className="supplier-summary-value">{preferredSuppliers}</div>
        </div>
      </div>

      {/* ===================================================
          TABLE SECTION
      =================================================== */}

      <div className="supplier-grid-page">
        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="supplier-toolbar">
          <div className="supplier-search-container">
            <input
              type="text"
              placeholder="Search supplier..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="supplier-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>

              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="supplier-filter">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>

              <option value="Vegetable">Vegetable</option>

              <option value="Grocery">Grocery</option>

              <option value="Meat">Meat</option>

              <option value="Seafood">Seafood</option>

              <option value="Beverage">Beverage</option>

              <option value="Dairy">Dairy</option>

              <option value="Bakery">Bakery</option>

              <option value="Packaging">Packaging</option>

              <option value="General">General</option>
            </select>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="supplier-table-container">
          {loading ? (
            <div className="supplier-loading">Loading suppliers...</div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="supplier-empty">No suppliers found.</div>
          ) : (
            <table className="supplier-table">
              <thead>
                <tr>
                  <th>Code</th>

                  <th>Supplier Name</th>

                  <th>Company</th>

                  <th>Type</th>

                  <th>Mobile</th>

                  <th>Email</th>

                  <th>Payment Terms</th>

                  <th>Rating</th>

                  <th>Preferred</th>

                  <th>Status</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier._id}>
                    {/* CODE */}

                    <td>{supplier.supplierCode || "-"}</td>

                    {/* NAME */}

                    <td>
                      <div className="supplier-name">
                        {supplier.supplierName || "-"}
                      </div>
                    </td>

                    {/* COMPANY */}

                    <td>{supplier.companyName || "-"}</td>

                    {/* TYPE */}

                    <td>{supplier.supplierType || "-"}</td>

                    {/* MOBILE */}

                    <td>{supplier.mobile || "-"}</td>

                    {/* EMAIL */}

                    <td>{supplier.email || "-"}</td>

                    {/* PAYMENT */}

                    <td>{supplier.paymentTerms || "-"}</td>

                    {/* RATING */}

                    <td>{supplier.rating ?? 0}</td>

                    {/* PREFERRED */}

                    <td>
                      <input
                        type="checkbox"
                        checked={supplier.isPreferredSupplier === true}
                        onChange={(e) =>
                          handlePreferredChange(supplier._id, e.target.checked)
                        }
                      />
                    </td>

                    {/* STATUS */}

                    <td>
                      <select
                        className={`supplier-status-select ${
                          supplier.isActive ? "active" : "inactive"
                        }`}
                        value={supplier.isActive ? "Active" : "Inactive"}
                        disabled={statusLoading}
                        onChange={(e) =>
                          handleStatusChange(
                            supplier._id,
                            e.target.value === "Active",
                          )
                        }
                      >
                        <option value="Active">Active</option>

                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="modal-actions">
                        <EditButton
                          type="button"
                          className="supplier-edit-btn"
                          onClick={() => handleEditSupplier(supplier)}
                        >
                          Edit
                        </EditButton>

                        <DeleteButton
                          type="button"
                          className="supplier-delete-btn"
                          onClick={() => handleDeleteSupplier(supplier._id)}
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

      {/* ===================================================
          MODAL
      =================================================== */}

      <Modal
        open={showModal}
        title={editingSupplier ? "Edit Supplier" : "Add Supplier"}
        onClose={handleCloseModal}
        size="lg"
      >
        <SupplierForm
          editingSupplier={editingSupplier}
          onSubmit={handleSubmitSupplier}
          onCancel={handleCloseModal}
          loading={supplierLoading}
          restaurants={restaurants}
          stores={stores}
        />
      </Modal>
    </div>
  );
};

export default Supplier;
