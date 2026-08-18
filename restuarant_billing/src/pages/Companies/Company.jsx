import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCompanies,
  fetchCompanyById,
  deleteCompany,
  restoreCompany,
  toggleCompanyStatus,
} from "../../features/company/companySlice";

import {
  AddButton,
  EditButton,
  DeleteButton,
} from "../../components/common/Button";

import Modal from "../../components/common/Modal";
import CompanyForm from "./CompanyForm";

import "./Company.css";

const Company = () => {
  const dispatch = useDispatch();

  const {
    companies = [],
    selectedCompany,
    loading = false,
    error = null,
  } = useSelector((state) => state.company || {});

  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // =====================================================
  // FETCH COMPANIES
  // =====================================================

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {
    dispatch(
      fetchCompanies({
        search: search.trim(),
        status,
      }),
    );
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const handleStatusChange = (e) => {
    const value = e.target.value;

    setStatus(value);

    dispatch(
      fetchCompanies({
        search: search.trim(),
        status: value,
      }),
    );
  };

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setStatus("");

    dispatch(fetchCompanies());
  };

  // =====================================================
  // OPEN CREATE FORM
  // =====================================================

  const openCreateForm = () => {
    setEditingCompany(null);
    setShowForm(true);
  };

  // =====================================================
  // OPEN EDIT FORM
  // =====================================================

  const handleEdit = async (id) => {
    const result = await dispatch(fetchCompanyById(id));

    if (fetchCompanyById.fulfilled.match(result)) {
      setEditingCompany(result.payload);
      setShowForm(true);
    }
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    setShowForm(false);
    setEditingCompany(null);
  };

  // =====================================================
  // DELETE COMPANY
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmed) return;

    const result = await dispatch(deleteCompany(id));

    if (deleteCompany.fulfilled.match(result)) {
      dispatch(
        fetchCompanies({
          search: search.trim(),
          status,
        }),
      );
    }
  };

  // =====================================================
  // RESTORE COMPANY
  // =====================================================

  const handleRestore = async (id) => {
    const result = await dispatch(restoreCompany(id));

    if (restoreCompany.fulfilled.match(result)) {
      dispatch(
        fetchCompanies({
          search: search.trim(),
          status,
        }),
      );
    }
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const handleToggleStatus = async (id) => {
    await dispatch(toggleCompanyStatus(id));

    dispatch(
      fetchCompanies({
        search: search.trim(),
        status,
      }),
    );
  };

  // =====================================================
  // CREATE / UPDATE SUCCESS
  // =====================================================

  const handleFormSuccess = () => {
    closeForm();

    dispatch(
      fetchCompanies({
        search: search.trim(),
        status,
      }),
    );
  };

  return (
    <div className="company-page">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="company-page-header">
        <div>
          <h1>Companies</h1>
          <p>Manage your companies</p>
        </div>

        <AddButton onClick={openCreateForm}>Add Company</AddButton>
      </div>

      {/* =================================================
          FILTER SECTION
      ================================================= */}

      <div className="company-filter-section">
        <div className="company-search-group">
          <input
            type="text"
            placeholder="Search company name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>

        <div className="company-filter-group">
          <select value={status} onChange={handleStatusChange}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="company-filter-actions">
          <button
            type="button"
            className="company-reset-button"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <table className="company-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Company Code</th>
              <th>Company Name</th>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>GST Number</th>
              <th>City</th>
              <th>Country</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="company-empty">
                  Loading companies...
                </td>
              </tr>
            ) : companies.length === 0 ? (
              <tr>
                <td colSpan="11" className="company-empty">
                  No companies found
                </td>
              </tr>
            ) : (
              companies.map((company, index) => (
                <tr key={company._id}>
                  <td>{index + 1}</td>

                  <td>
                    <span className="company-code">
                      {company.companyCode || "-"}
                    </span>
                  </td>

                  <td>
                    <strong>{company.companyName || "-"}</strong>
                  </td>

                  <td>{company.ownerName || "-"}</td>

                  <td>{company.email || "-"}</td>

                  <td>{company.phone || "-"}</td>

                  <td>{company.gstNumber || "-"}</td>

                  <td>{company.city || "-"}</td>

                  <td>{company.country || "-"}</td>

                  <td>
                    <button
                      type="button"
                      className={`company-status-badge ${
                        company.status === "Active" ? "active" : "inactive"
                      }`}
                      onClick={() => handleToggleStatus(company._id)}
                      disabled={loading}
                    >
                      {company.status || "Inactive"}
                    </button>
                  </td>

                  <td>
                    <div className="modal-actions">
                      {!company.isDeleted ? (
                        <>
                          <EditButton onClick={() => handleEdit(company._id)}>
                            Edit
                          </EditButton>

                          <DeleteButton
                            onClick={() => handleDelete(company._id)}
                          >
                            Delete
                          </DeleteButton>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="company-restore-button"
                          onClick={() => handleRestore(company._id)}
                        >
                          Restore
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

      {error && <div className="company-error">{error}</div>}

      {/* =================================================
          CREATE / UPDATE MODAL
      ================================================= */}

      <Modal
        open={showForm}
        title={editingCompany ? "Update Company" : "Create Company"}
        onClose={closeForm}
        size="lg"
      >
        <CompanyForm
          initialData={editingCompany}
          onSuccess={handleFormSuccess}
          onCancel={closeForm}
        />
      </Modal>
    </div>
  );
};

export default Company;
