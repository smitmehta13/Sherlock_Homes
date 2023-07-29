import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_UNITS_ALL, API_USERS_ALL } from './Constants';
import { myHeaders } from './Constants';

function Unit() {
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchUnits();
    fetchUsers();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await axios.get(`${API_UNITS_ALL}`,  myHeaders);
      setUnits(response.data);
    } catch (error) {
      console.log('Error fetching units:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_USERS_ALL}`, myHeaders);
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleOccupancyChange = async (unitId, occupied) => {
    try {
      await axios.put(`/api/units/${unitId}`, { occupied }, myHeaders);
      fetchUnits(); // Refresh the unit data after changing occupancy status
    } catch (error) {
      console.log('Error changing occupancy status:', error);
    }
  };

  const handleUserAllocation = async () => {
    try {
      await axios.put(`/api/units/${selectedUnit}/allocate`, { userId: selectedUser }, myHeaders);
      fetchUnits(); // Refresh the unit data after allocating a user
    } catch (error) {
      console.log('Error allocating user to unit:', error);
    }
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Unit Management</h3>
                </div>
                <div className="card-body">
                  {/* Units Table */}
                  <h2>Units</h2>
                  {units.length === 0 ? (
                    <p>No units found.</p>
                  ) : (
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Unit Name</th>
                          <th>Occupied</th>
                          <th>Allocated User</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {units.map((unit) => (
                          <tr key={unit.id}>
                            <td>{unit.unitType}</td>
                            <td>{unit.occupied == 1 ? 'Yes' : 'No'}</td>
                            <td>{unit.user ? unit.user.name : '-'}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleOccupancyChange(unit.unit_id, unit.occupied == 0)}
                              >
                                {unit.occupied ? 'Vacate' : 'Occupy'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Allocate User to Unit</h3>
                </div>
                <div className="card-body">
                  {units.length === 0 || users.length === 0 ? (
                    <p>No units or users found.</p>
                  ) : (
                    <div>
                      {/* Form to allocate user to a unit */}
                      <form>
                        <div className="form-group">
                          <label htmlFor="unit">Select Unit:</label>
                          <select
                            id="unit"
                            className="form-control"
                            value={selectedUnit}
                            onChange={handleUnitChange}
                          >
                            <option value="">Select Unit</option>
                            {units.map((unit) => (
                              <option key={unit.id} value={unit.id}>
                                {unit.unitNumber}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="user">Select User:</label>
                          <select
                            id="user"
                            className="form-control"
                            value={selectedUser}
                            onChange={handleUserChange}
                          >
                            <option value="">Select User</option>
                            {users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.firstName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          className="btn btn-primary"
                          onClick={handleUserAllocation}
                          disabled={!selectedUnit || !selectedUser}
                        >
                          Allocate User
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Unit;
