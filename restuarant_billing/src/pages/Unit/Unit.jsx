import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchUnits,
  searchUnits,
  createUnit,
  updateUnit,
  deleteUnit,
  activateUnit,
  deactivateUnit,
  fetchRestaurants,
  clearUnitError,
} from "../../features/unit/unitSlice";

import Modal from "../../components/Common/Modal";

import UnitForm from "./Unitform";

import {
  DeleteButton,
  EditButton,
  AddButton,
} from "../../components/Common/Button";

import "./Unit.css";

const Unit = () => {
  const dispatch = useDispatch();

  /* ==========================================================
     Redux
  ========================================================== */

  const {
    units,
    restaurants,
    loading,
    unitLoading,
    deleteLoading,
    restaurantLoading,
    error,
  } = useSelector((state) => state.unit);

  /* ==========================================================
     Local State
  ========================================================== */

  const [search, setSearch] = useState("");

  const [selectedUnit, setSelectedUnit] = useState(null);

  const [showModal, setShowModal] = useState(false);

  /* ==========================================================
     Initial Fetch
  ========================================================== */

  useEffect(() => {
    dispatch(
      fetchUnits({
        page: 1,
        limit: 1000,
      }),
    );

    dispatch(fetchRestaurants());
  }, [dispatch]);

  /* ==========================================================
     Search
  ========================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        dispatch(
          searchUnits({
            keyword: search.trim(),
          }),
        );
      } else {
        dispatch(
          fetchUnits({
            page: 1,
            limit: 1000,
          }),
        );
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  /* ==========================================================
     Clear Error
  ========================================================== */

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearUnitError());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  /* ==========================================================
     Open Create Modal
  ========================================================== */

  const handleAdd = () => {
    setSelectedUnit(null);
    setShowModal(true);
  };

  /* ==========================================================
     Open Edit Modal
  ========================================================== */

  const handleEdit = (unit) => {
    setSelectedUnit(unit);
    setShowModal(true);
  };

  /* ==========================================================
     Close Modal
  ========================================================== */

  const handleCloseModal = () => {
    if (unitLoading) {
      return;
    }

    setShowModal(false);
    setSelectedUnit(null);
  };

  /* ==========================================================
     Submit Form
  ========================================================== */

  const handleSubmit = async (data) => {
    try {
      if (selectedUnit) {
        await dispatch(
          updateUnit({
            id: selectedUnit._id,
            data,
          }),
        ).unwrap();
      } else {
        await dispatch(createUnit(data)).unwrap();
      }

      setShowModal(false);
      setSelectedUnit(null);

      dispatch(
        fetchUnits({
          page: 1,
          limit: 1000,
        }),
      );
    } catch (error) {
      console.error("Unit save error:", error);
    }
  };

  /* ==========================================================
     Delete
  ========================================================== */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this unit?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteUnit(id)).unwrap();
    } catch (error) {
      console.error("Delete unit error:", error);
    }
  };

  /* ==========================================================
     Toggle Active
  ========================================================== */

  const handleToggleStatus = async (unit) => {
    try {
      if (unit.isActive) {
        await dispatch(deactivateUnit(unit._id)).unwrap();
      } else {
        await dispatch(activateUnit(unit._id)).unwrap();
      }
    } catch (error) {
      console.error("Toggle unit status error:", error);
    }
  };

  /* ==========================================================
     Restaurant Name
  ========================================================== */

  const getRestaurantName = (restaurant) => {
    if (!restaurant) {
      return "-";
    }

    if (typeof restaurant === "object") {
      return restaurant.restaurantName || restaurant.name || "-";
    }

    const found = restaurants.find((item) => item._id === restaurant);

    return found?.restaurantName || found?.name || "-";
  };

  /* ==========================================================
     Base Unit Name
  ========================================================== */

  const getBaseUnitName = (baseUnit) => {
    if (!baseUnit) {
      return "-";
    }

    if (typeof baseUnit === "object") {
      return baseUnit.unitName
        ? `${baseUnit.unitName} (${baseUnit.unitCode || ""})`
        : "-";
    }

    const found = units.find((item) => item._id === baseUnit);

    return found ? `${found.unitName} (${found.unitCode})` : "-";
  };

  return (
    <div className="unit-page">
      {/* ====================================================
          Header
      ==================================================== */}

      <div className="unit-page-header">
        <div>
          <h2>Units</h2>

          <p>Manage restaurant measurement units</p>
        </div>

        <AddButton onClick={handleAdd}>Add Unit</AddButton>
      </div>

      {/* ====================================================
          Error
      ==================================================== */}

      {error && <div className="unit-error">{error}</div>}

      {/* ====================================================
          Search
      ==================================================== */}

      <div className="unit-toolbar">
        <div className="unit-search">
          <input
            type="text"
            placeholder="Search unit name or code..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      {/* ====================================================
          Table
      ==================================================== */}

      <div className="unit-table-container">
        {loading ? (
          <div className="unit-loading">Loading units...</div>
        ) : units.length === 0 ? (
          <div className="unit-empty">No units found.</div>
        ) : (
          <table className="unit-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Unit Name</th>
                <th>Code</th>
                <th>Restaurant</th>
                <th>Type</th>
                <th>Conversion</th>
                <th>Base Unit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {units.map((unit, index) => (
                <tr key={unit._id}>
                  <td>{index + 1}</td>

                  <td className="unit-name-cell">{unit.unitName}</td>

                  <td>
                    <span className="unit-code">{unit.unitCode}</span>
                  </td>

                  <td>{getRestaurantName(unit.restaurant)}</td>

                  <td>
                    <span className="unit-type">{unit.unitType}</span>
                  </td>

                  <td>{unit.conversionValue}</td>

                  <td>{getBaseUnitName(unit.baseUnit)}</td>

                  <td>
                    <button
                      type="button"
                      className={`unit-status ${
                        unit.isActive ? "active" : "inactive"
                      }`}
                      onClick={() => handleToggleStatus(unit)}
                    >
                      {unit.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td>
                    <div className="modal-actions">
                      <EditButton onClick={() => handleEdit(unit)} />

                      <DeleteButton
                        onClick={() => handleDelete(unit._id)}
                        disabled={deleteLoading}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ====================================================
          Modal
      ==================================================== */}

      {showModal && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          title={selectedUnit ? "Edit Unit" : "Create Unit"}
        >
          <UnitForm
            initialData={selectedUnit}
            restaurants={restaurants}
            units={units}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            loading={unitLoading || restaurantLoading}
          />
        </Modal>
      )}
    </div>
  );
};

export default Unit;
