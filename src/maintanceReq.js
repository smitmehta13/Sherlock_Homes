import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MaintenanceRequest() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await axios.get('/api/maintenance-requests?status=open');
      setRequests(response.data);
    } catch (error) {
      console.log('Error fetching maintenance requests:', error);
    }
  };

  const closeMaintenanceRequest = async (id) => {
    try {
      await axios.delete(`/api/maintenance-requests/${id}`);
      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.log('Error closing maintenance request:', error);
    }
  };

  return (
    <div>
      <h1>Maintenance Request Management</h1>
      {requests.length === 0 ? (
        <p>No open requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.description}</td>
                <td>
                  <button onClick={() => closeMaintenanceRequest(request.id)}>Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MaintenanceRequest;
