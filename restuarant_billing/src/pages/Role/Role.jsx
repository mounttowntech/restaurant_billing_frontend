import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import Modal from "../../components/Common/Modal";

import RoleForm from "./RoleForm";

import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
  updateRoleStatus,
  searchRoles,
} from "../../features/role/roleSlice";

import "./Role.css";

const Role = () => {
  const dispatch = useDispatch();

  const {
    roles = [],
    loading = false,
    roleLoading = false,
    deleteLoading = false,
    error = null,
  } = useSelector((state) => state.role || {});

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingRole, setEditingRole] = useState(null);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  // =====================================================
  // FETCH ROLES
  // =====================================================

  useEffect(() => {
    dispatch(fetchRoles());

    console.log("STEP 1 - Role.jsx useEffect RUNNING");
    console.log("STEP 2 - dispatching fetchRoles()");
  }, [dispatch]);

  console.log("Roles are :", roles);

  // =====================================================
  // ADD ROLE
  // =====================================================

  const handleAddRole = () => {
    setEditingRole(null);
    setShowModal(true);
  };

  // =====================================================
  // EDIT ROLE
  // =====================================================

  const handleEditRole = (role) => {
    setEditingRole(role);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRole(null);
  };

  // =====================================================
  // CREATE / UPDATE ROLE
  // =====================================================

  const handleSubmitRole = async (formData) => {
    try {
      if (editingRole?._id) {
        await dispatch(
          updateRole({
            id: editingRole._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createRole(formData)).unwrap();
      }

      handleCloseModal();

      dispatch(fetchRoles());
    } catch (error) {
      console.error("Role save failed:", error);
    }
  };

  // =====================================================
  // DELETE ROLE
  // =====================================================

  const handleDeleteRole = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this role?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteRole(id)).unwrap();

      dispatch(fetchRoles());
    } catch (error) {
      console.error("Role delete failed:", error);
    }
  };

  // =====================================================
  // STATUS
  // =====================================================

  const handleStatusChange = async (role) => {
    const newStatus = role.status === "active" ? "inactive" : "active";

    try {
      await dispatch(
        updateRoleStatus({
          id: role._id,
          status: newStatus,
        }),
      ).unwrap();

      dispatch(fetchRoles());
    } catch (error) {
      console.error("Role status update failed:", error);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      dispatch(fetchRoles());
      return;
    }

    dispatch(searchRoles(value));
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredRoles = roles.filter((role) => {
    const roleName = String(role.roleName || "").toLowerCase();

    const searchValue = search.trim().toLowerCase();

    const searchMatch = !searchValue || roleName.includes(searchValue);

    const statusMatch =
      statusFilter === "All" ||
      String(role.status || "").toLowerCase() === statusFilter.toLowerCase();

    return searchMatch && statusMatch;
  });

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalRoles = roles.length;

  const activeRoles = roles.filter((role) => role.status === "active").length;

  const inactiveRoles = roles.filter(
    (role) => role.status === "inactive",
  ).length;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="role-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="role-page-header">
        <div>
          <h1>Roles</h1>

          <p>Manage user roles and permissions</p>
        </div>

        <AddButton
          type="button"
          className="role-add-btn"
          onClick={handleAddRole}
        >
          + Add Role
        </AddButton>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="role-error-box">
          {typeof error === "string"
            ? error
            : error?.message || "Something went wrong"}
        </div>
      )}

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="role-summary-grid">
        <div className="role-summary-card">
          <div className="role-summary-label">Total Roles</div>

          <div className="role-summary-value">{totalRoles}</div>
        </div>

        <div className="role-summary-card">
          <div className="role-summary-label">Active Roles</div>

          <div className="role-summary-value">{activeRoles}</div>
        </div>

        <div className="role-summary-card">
          <div className="role-summary-label">Inactive Roles</div>

          <div className="role-summary-value">{inactiveRoles}</div>
        </div>
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="role-grid-page">
        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="role-toolbar">
          <div className="role-search">
            <input
              type="text"
              placeholder="Search role..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="role-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>

              <option value="active">Active</option>

              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* =================================================
            ROLE TABLE
        ================================================= */}

        <div className="role-table-container">
          {loading ? (
            <div className="role-loading">Loading roles...</div>
          ) : filteredRoles.length === 0 ? (
            <div className="role-empty">No roles found.</div>
          ) : (
            <table className="role-table">
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Permissions</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role._id}>
                    {/* ROLE NAME */}

                    <td>
                      <div className="role-name">{role.roleName || "-"}</div>
                    </td>

                    {/* PERMISSIONS */}

                    <td>
                      {Array.isArray(role.permissions)
                        ? role.permissions.reduce(
                            (total, permission) =>
                              total +
                              [
                                permission.canView,
                                permission.canCreate,
                                permission.canEdit,
                                permission.canDelete,
                                permission.canPrint,
                                permission.canExport,
                              ].filter(Boolean).length,
                            0,
                          )
                        : 0}
                    </td>

                    {/* STATUS */}

                    <td>
                      <button
                        type="button"
                        className={`role-status ${
                          role.status === "active" ? "active" : "inactive"
                        }`}
                        onClick={() => handleStatusChange(role)}
                        disabled={roleLoading}
                      >
                        {role.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>

                    {/* CREATED */}

                    <td>
                      {role.createdAt
                        ? new Date(role.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="modal-actions">
                        <EditButton
                          type="button"
                          className="role-edit-btn"
                          onClick={() => handleEditRole(role)}
                        >
                          Edit
                        </EditButton>

                        <DeleteButton
                          type="button"
                          className="role-delete-btn"
                          onClick={() => handleDeleteRole(role._id)}
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

      {/* =================================================
          MODAL
      ================================================= */}

      <Modal
        open={showModal}
        title={editingRole ? "Edit Role" : "Add Role"}
        onClose={handleCloseModal}
        size="lg"
      >
        <RoleForm
          editingRole={editingRole}
          onSubmit={handleSubmitRole}
          onCancel={handleCloseModal}
          loading={roleLoading}
        />
      </Modal>
    </div>
  );
};

export default Role;
