import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_MAINTENANCE_ALL, API_MAINTENANCE_UPDATE } from './Constants';
import Pagitation from './Utils/Pagination';

const MaintenanceRequest = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await axios.get(`${API_MAINTENANCE_ALL}`);
      setMaintenanceRequests(response.data);
    } catch (error) {
      console.log('Error fetching maintenance requests:', error);
    }
  };

  const openMaintenanceRequestDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeMaintenanceRequestDetails = () => {
    setSelectedRequest(null);
  };

  const handleStatus = (status) => {
    switch (status) {
      case 0:
        return 'Open';
      case 1:
        return 'In Progress';
      case 2:
        return 'Closed';
      default:
        return null;
    }
  };

  const handleCloseRequest = async (requestId) => {
    try {
      await axios.put(`${API_MAINTENANCE_UPDATE(requestId)}`, {
        requestStatus: 2,
      });
      fetchMaintenanceRequests();
    } catch (error) {
      console.log('Error closing maintenance request:', error);
    }
  };

  const handleOpenRequest = async (requestId) => {
    try {
      await axios.put(`${API_MAINTENANCE_UPDATE(requestId)}`, {
        requestStatus: 0,
      });
      fetchMaintenanceRequests();
    } catch (error) {
      console.log('Error opening maintenance request:', error);
    }
  };

  return (
    <div className="container">
      <h1>Maintenance Requests</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Unit</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.requestId}</td>
              <td>{request.requestDate}</td>
              <td>{request.requestDescription}</td>
              <td>{request.unitId}</td>
              <td>{request.userId}</td>
              <td>
                <button className="btn btn-primary" onClick={() => openMaintenanceRequestDetails(request)}>
                  <i className="fas fa-eye"></i>
                </button>
                {request.status === 0 && (
                  <button className="btn btn-danger ml-2" onClick={() => handleCloseRequest(request.id)}>
                    Close Request
                  </button>
                )}
                {request.status === 2 && (
                  <button className="btn btn-success ml-2" onClick={() => handleOpenRequest(request.id)}>
                    Open Request
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Maintenance request details modal */}
      {selectedRequest && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Maintenance Request Details</h5>
                <button type="button" className="close" onClick={closeMaintenanceRequestDetails}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {selectedRequest.id}
                </p>
                <p>
                  <strong>Date:</strong> {selectedRequest.date}
                </p>
                <p>
                  <strong>Description:</strong> {selectedRequest.description}
                </p>
                <p>
                  <strong>Unit:</strong> {selectedRequest.unit}
                </p>
                <p>
                  <strong>User:</strong> {selectedRequest.user}
                </p>
                <p>
                  <strong>Status:</strong> {handleStatus(selectedRequest.status)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequest;
