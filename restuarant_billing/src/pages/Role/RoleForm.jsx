import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "./RoleForm.css";

import { CancelButton, SaveButton } from "../../components/Common/Button";

import Input from "../../components/Common/Input";

const initialForm = {
  roleName: "",
  status: "active",
  permissions: [],
};

const modules = [
  "Dashboard",
  "Restaurant",
  "Store",
  "Product",
  "Category",
  "Menu Category",
  "Menu Item",
  "Customer",
  "Supplier",
  "Purchase",
  "Order",
  "KOT",
  "Invoice",
  "Warehouse",
  "Batch",
  "Unit",
  "Recipe",
  "Reports",
];

const RoleForm = ({ editingRole, onSubmit, onCancel, loading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  const permissions = watch("permissions") || [];

  // =====================================================
  // LOAD EDIT DATA
  // =====================================================

  useEffect(() => {
    if (editingRole) {
      reset({
        roleName: editingRole.roleName || "",
        status: editingRole.status || "active",

        permissions: Array.isArray(editingRole.permissions)
          ? editingRole.permissions
          : [],
      });
    } else {
      reset(initialForm);
    }
  }, [editingRole, reset]);

  // =====================================================
  // GET PERMISSION
  // =====================================================

  const getPermission = (module) => {
    return (
      permissions.find(
        (permission) =>
          permission.module?.toLowerCase() === module.toLowerCase(),
      ) || {
        module,
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canPrint: false,
        canExport: false,
      }
    );
  };

  // =====================================================
  // UPDATE PERMISSION
  // =====================================================

  const handlePermissionChange = (module, field, value) => {
    const currentPermissions = [...permissions];

    const index = currentPermissions.findIndex(
      (permission) => permission.module?.toLowerCase() === module.toLowerCase(),
    );

    if (index === -1) {
      currentPermissions.push({
        module,
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canPrint: false,
        canExport: false,
        [field]: value,
      });
    } else {
      currentPermissions[index] = {
        ...currentPermissions[index],
        [field]: value,
      };
    }

    setValue("permissions", currentPermissions);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const onFormSubmit = async (data) => {
    const payload = {
      roleName: data.roleName.trim(),

      status: data.status,

      permissions: data.permissions || [],
    };

    await onSubmit(payload);
  };

  return (
    <form className="role-form" onSubmit={handleSubmit(onFormSubmit)}>
      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <div className="role-form-section">
        <h3>Basic Information</h3>

        <div className="role-form-grid">
          <div className="role-field">
            <Input
              label="Role Name"
              name="roleName"
              type="text"
              placeholder="Enter role name"
              register={register}
              error={errors.roleName?.message}
            />
          </div>

          <div className="role-field">
            <label>Status</label>

            <select {...register("status")}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* =================================================
          PERMISSIONS
      ================================================= */}

      <div className="role-form-section-basic">
        <h3>Permissions</h3>

        <div className="role-permission-table-container">
          <table className="role-permission-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>View</th>
                <th>Create</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Print</th>
                <th>Export</th>
              </tr>
            </thead>

            <tbody>
              {modules.map((module) => {
                const permission = getPermission(module);

                return (
                  <tr key={module}>
                    <td>{module}</td>

                    <td>
                      <input
                        type="checkbox"
                        checked={!!permission.canView}
                        onChange={(e) =>
                          handlePermissionChange(
                            module,
                            "canView",
                            e.target.checked,
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={!!permission.canCreate}
                        onChange={(e) =>
                          handlePermissionChange(
                            module,
                            "canCreate",
                            e.target.checked,
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={!!permission.canEdit}
                        onChange={(e) =>
                          handlePermissionChange(
                            module,
                            "canEdit",
                            e.target.checked,
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={!!permission.canDelete}
                        onChange={(e) =>
                          handlePermissionChange(
                            module,
                            "canDelete",
                            e.target.checked,
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={!!permission.canPrint}
                        onChange={(e) =>
                          handlePermissionChange(
                            module,
                            "canPrint",
                            e.target.checked,
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={!!permission.canExport}
                        onChange={(e) =>
                          handlePermissionChange(
                            module,
                            "canExport",
                            e.target.checked,
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="role-form-actions">
        <CancelButton
          type="button"
          className="role-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="role-submit-btn"
          disabled={loading}
        >
          {loading ? "Saving..." : editingRole ? "Update Role" : "Create Role"}
        </SaveButton>
      </div>
    </form>
  );
};

export default RoleForm;
