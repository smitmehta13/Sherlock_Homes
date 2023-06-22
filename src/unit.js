import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get('/api/units');
      setUnits(response.data);
    } catch (error) {
      console.log('Error fetching units:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleOccupancyChange = async (unitId, occupied) => {
    try {
      await axios.put(`/api/units/${unitId}`, { occupied });
      fetchUnits(); // Refresh the unit data after changing occupancy status
    } catch (error) {
      console.log('Error changing occupancy status:', error);
    }
  };

  const handleUserAllocation = async () => {
    try {
      await axios.put(`/api/units/${selectedUnit}/allocate`, { userId: selectedUser });
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
    <div>
      <h1>Unit Management</h1>
      <h2>Units</h2>
      {units.length === 0 ? (
        <p>No units found.</p>
      ) : (
        <table>
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
                <td>{unit.name}</td>
                <td>{unit.occupied ? 'Yes' : 'No'}</td>
                <td>{unit.user ? unit.user.name : '-'}</td>
                <td>
                  <button onClick={() => handleOccupancyChange(unit.id, !unit.occupied)}>
                    {unit.occupied ? 'Vacate' : 'Occupy'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Allocate User to Unit</h2>
      {units.length === 0 || users.length === 0 ? (
        <p>No units or users found.</p>
      ) : (
        <div>
          <label htmlFor="unit">Select Unit:</label>
          <select id="unit" value={selectedUnit} onChange={handleUnitChange}>
            <option value="">Select Unit</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>

          <label htmlFor="user">Select User:</label>
          <select id="user" value={selectedUser} onChange={handleUserChange}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <button onClick={handleUserAllocation} disabled={!selectedUnit || !selectedUser}>
            Allocate User
          </button>
        </div>
      )}
    </div>
  );
}

export default Unit;
