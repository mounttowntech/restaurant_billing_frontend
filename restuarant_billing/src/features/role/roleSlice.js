import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { roleService } from "./roleService";

// =====================================================
// FETCH ROLES
// =====================================================

export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await roleService.getRoles(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch roles",
      );
    }
  },
);

// =====================================================
// SEARCH ROLES
// =====================================================

export const searchRoles = createAsyncThunk(
  "role/searchRoles",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await roleService.searchRoles(keyword);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search roles",
      );
    }
  },
);

// =====================================================
// GET ROLE BY ID
// =====================================================

export const fetchRoleById = createAsyncThunk(
  "role/fetchRoleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await roleService.getRoleById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch role",
      );
    }
  },
);

// =====================================================
// CREATE ROLE
// =====================================================

export const createRole = createAsyncThunk(
  "role/createRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await roleService.createRole(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create role",
      );
    }
  },
);

// =====================================================
// UPDATE ROLE
// =====================================================

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await roleService.updateRole(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update role",
      );
    }
  },
);

// =====================================================
// DELETE ROLE
// =====================================================

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await roleService.deleteRole(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete role",
      );
    }
  },
);

// =====================================================
// UPDATE ROLE STATUS
// =====================================================

export const updateRoleStatus = createAsyncThunk(
  "role/updateRoleStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await roleService.updateRoleStatus(id, status);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update role status",
      );
    }
  },
);

// =====================================================
// ADD PERMISSION
// =====================================================

export const addPermission = createAsyncThunk(
  "role/addPermission",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await roleService.addPermission(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add permission",
      );
    }
  },
);

// =====================================================
// UPDATE PERMISSION
// =====================================================

export const updatePermission = createAsyncThunk(
  "role/updatePermission",
  async ({ module, id, data }, { rejectWithValue }) => {
    try {
      const response = await roleService.updatePermission(module, id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update permission",
      );
    }
  },
);

// =====================================================
// REMOVE PERMISSION
// =====================================================

export const removePermission = createAsyncThunk(
  "role/removePermission",
  async ({ module, id }, { rejectWithValue }) => {
    try {
      const response = await roleService.removePermission(module, id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove permission",
      );
    }
  },
);

// =====================================================
// GET ROLE PERMISSIONS
// =====================================================

export const fetchRolePermissions = createAsyncThunk(
  "role/fetchRolePermissions",
  async (id, { rejectWithValue }) => {
    try {
      const response = await roleService.getRolePermissions(id);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch permissions",
      );
    }
  },
);

// =====================================================
// SLICE
// =====================================================

const roleSlice = createSlice({
  name: "role",

  initialState: {
    roles: [],
    role: null,
    permissions: [],
    loading: false,
    roleLoading: false,
    deleteLoading: false,
    permissionLoading: false,
    error: null,
  },

  reducers: {
    clearRoleError: (state) => {
      state.error = null;
    },

    clearRole: (state) => {
      state.role = null;
      state.permissions = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // FETCH ROLES
      // =================================================

      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;

        state.roles = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })

      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // SEARCH ROLES
      // =================================================

      .addCase(searchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchRoles.fulfilled, (state, action) => {
        state.loading = false;

        state.roles = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })

      .addCase(searchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // FETCH ROLE BY ID
      // =================================================

      .addCase(fetchRoleById.pending, (state) => {
        state.roleLoading = true;
        state.error = null;
      })

      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.role = action.payload;
      })

      .addCase(fetchRoleById.rejected, (state, action) => {
        state.roleLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // CREATE ROLE
      // =================================================

      .addCase(createRole.pending, (state) => {
        state.roleLoading = true;
        state.error = null;
      })

      .addCase(createRole.fulfilled, (state) => {
        state.roleLoading = false;
      })

      .addCase(createRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // UPDATE ROLE
      // =================================================

      .addCase(updateRole.pending, (state) => {
        state.roleLoading = true;
        state.error = null;
      })

      .addCase(updateRole.fulfilled, (state) => {
        state.roleLoading = false;
      })

      .addCase(updateRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // DELETE ROLE
      // =================================================

      .addCase(deleteRole.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.roles = state.roles.filter((role) => role._id !== action.payload);
      })

      .addCase(deleteRole.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // UPDATE STATUS
      // =================================================

      .addCase(updateRoleStatus.pending, (state) => {
        state.roleLoading = true;
        state.error = null;
      })

      .addCase(updateRoleStatus.fulfilled, (state, action) => {
        state.roleLoading = false;

        const updatedRole = action.payload;

        const index = state.roles.findIndex(
          (role) => role._id === updatedRole?._id,
        );

        if (index !== -1) {
          state.roles[index] = updatedRole;
        }
      })

      .addCase(updateRoleStatus.rejected, (state, action) => {
        state.roleLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // ADD PERMISSION
      // =================================================

      .addCase(addPermission.pending, (state) => {
        state.permissionLoading = true;
        state.error = null;
      })

      .addCase(addPermission.fulfilled, (state, action) => {
        state.permissionLoading = false;
        state.permissions = action.payload || [];
      })

      .addCase(addPermission.rejected, (state, action) => {
        state.permissionLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // UPDATE PERMISSION
      // =================================================

      .addCase(updatePermission.pending, (state) => {
        state.permissionLoading = true;
        state.error = null;
      })

      .addCase(updatePermission.fulfilled, (state) => {
        state.permissionLoading = false;
      })

      .addCase(updatePermission.rejected, (state, action) => {
        state.permissionLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // REMOVE PERMISSION
      // =================================================

      .addCase(removePermission.pending, (state) => {
        state.permissionLoading = true;
        state.error = null;
      })

      .addCase(removePermission.fulfilled, (state, action) => {
        state.permissionLoading = false;
        state.permissions = action.payload || [];
      })

      .addCase(removePermission.rejected, (state, action) => {
        state.permissionLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // GET PERMISSIONS
      // =================================================

      .addCase(fetchRolePermissions.pending, (state) => {
        state.permissionLoading = true;
        state.error = null;
      })

      .addCase(fetchRolePermissions.fulfilled, (state, action) => {
        state.permissionLoading = false;

        state.permissions = action.payload?.permissions || [];
      })

      .addCase(fetchRolePermissions.rejected, (state, action) => {
        state.permissionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRoleError, clearRole } = roleSlice.actions;

export default roleSlice.reducer;
