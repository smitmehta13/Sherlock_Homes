// MaintenanceRequest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_MAINTENANCE_ALL, API_MAINTENANCE_UPDATE } from './Constants';

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function MaintenanceRequest() {
  const [requests, setRequests] = useState([]);
  const [closedRequests, setClosedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState(null); // Add state to store the selected request

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);
  const fetchMaintenanceRequests = async () => {
    try {
      const response = await axios.get(`${API_MAINTENANCE_ALL}`);
      setRequests(response.data.filter((request) => request.requestStatus === 0 || request.requestStatus === 1));
      setClosedRequests(response.data.filter((request) => request.requestStatus === 2));
    } catch (error) {
      console.log('Error fetching maintenance requests:', error);
    }
  };

  const MaintenanceRequestInfo = ({ selectedRequest, onClose }) => {
    if (!selectedRequest) {
      return null;
    }
  
    return (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Maintenance Request Details</h5>
              <button type="button" className="close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{console.log("here")}<strong>Date:</strong> {selectedRequest.requestDate}</p>
              <p><strong>Time:</strong> {selectedRequest.time}</p>
              <p><strong>User:</strong> {selectedRequest.userId}</p>
              <p><strong>Unit:</strong> {selectedRequest.unitId}</p>
              <p><strong>Picture:</strong> <img src={selectedRequest.img} alt="Maintenance Request" /></p>
              <p><strong>Description:</strong> {selectedRequest.requestDescription}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const closeMaintenanceRequest = async (id) => {
    try {
      // Send a PUT or PATCH request to update the maintenance request status
      console.log('Closing maintenance request...', id);
      await axios.put(`${API_MAINTENANCE_UPDATE(id)}`, { requestStatus: 2 });
      console.log('Maintenance request closed successfully');
  
      // Update the requests state to reflect the closed request
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === id ? { ...request, requestStatus: 2 } : request
        )
      );
      fetchMaintenanceRequests();
    } catch (error) {
      console.log('Error closing maintenance request:', error);
    }
  };

  const openMaintenanceRequestDetails = (id) => {
    // Find the selected request from the open requests or closed requests array
    const selectedReq = [...requests, ...closedRequests].find((request) => request.requestId === id);
    setSelectedRequest(selectedReq);
  };

  const closeMaintenanceRequestDetails = () => {
    setSelectedRequest(null);
  };


  // Get current open requests based on pagination
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Get current closed requests based on pagination
  const indexOfLastClosedRequest = currentPage * requestsPerPage;
  const indexOfFirstClosedRequest = indexOfLastClosedRequest - requestsPerPage;
  const currentClosedRequests = closedRequests.slice(indexOfFirstClosedRequest, indexOfLastClosedRequest);

  // Change page for both open and closed requests
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle click on a maintenance request to show details
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Maintenance Request Management</h1>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-xs-6">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Open Requests</h3>
              </div>

              <div className="box-body">
                {currentRequests.length === 0 ? (
                  <p>No open requests found.</p>
                ) : (
                  <>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRequests.map((request) => (
                          <tr key={request.requestId} onClick={() => openMaintenanceRequestDetails(request.requestId)}>
                            <td>{request.requestId}</td>
                            <td>{request.requestDescription}</td>
                            <td>
                              <button className="btn btn-danger btn-sm" onClick={() => closeMaintenanceRequest(request.requestId)}>
                                Close
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={requestsPerPage}
                      totalItems={requests.length}
                      paginate={paginate}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-xs-6">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Closed Requests</h3>
              </div>

              <div className="box-body">
                {currentClosedRequests.length === 0 ? (
                  <p>No closed requests found.</p>
                ) : (
                  <>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentClosedRequests.map((request) => (
                          <tr key={request.id} onClick={() => openMaintenanceRequestDetails(request.requestId)}>
                            <td>{request.requestId}</td>
                            <td>{request.requestDescription}</td>
                            <td>
                              <button className="btn btn-primary btn-sm">
                                Reopen
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={requestsPerPage}
                      totalItems={closedRequests.length}
                      paginate={paginate}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add the MaintenanceRequestInfo modal */}
      <MaintenanceRequestInfo selectedRequest={selectedRequest} onClose={closeMaintenanceRequestDetails} />
    </div>
  );
}

export default MaintenanceRequest;