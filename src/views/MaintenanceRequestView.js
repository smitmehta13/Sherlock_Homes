import React from 'react';
import { API_BASE_URL } from '../Constants';

function MaintenanceRequestView({
  maintenanceRequests,
  currentPage,
  requestsPerPage,
  openDetails,
  closeRequest,
  paginate,
  selectedRequest,
  setSelectedRequest,
  remarks,
  setRemarks,
  status,
  setStatus,
  handleStatusChange,
  showModal,
  toggleModal,
  closeDetails,
}) {
  // Get current requests based on pagination
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = maintenanceRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  // Combine open and closed requests and sort them based on status (open/pending on top)
  const sortedRequests = currentRequests.sort((a, b) => a.requestStatus - b.requestStatus);
 
    return (
      <div className="wrapper p-2">
        <section className="content-header">
          <h1>Maintenance Requests</h1>
        </section>
        {!showModal && (
          <section className="content">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">
                  <i className="fas fa-clipboard-list"></i> Requests
                </h3>
                {sortedRequests.length === 0 ? (
                  <p>No maintenance requests found.</p>
                ) : (
                  <table className="table table-bordered table-hover">
                    {/* Table header */}
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      { sortedRequests.map((request) => (
                        <tr key={request.requestId}>
                          <td>{request.requestId}</td>
                          <td>{request.requestDate}</td>
                          <td>{request.requestDescription}</td>
                          <td>{request.unitId}</td>
                          <td>{request.userId}</td>
                          <td>
                            {request.requestStatus === 0 && (
                              <span className="badge bg-warning">Pending</span>
                            )}
                            {request.requestStatus === 1 && (
                              <span className="badge bg-info">Open</span>
                            )}
                            {request.requestStatus === 2 && (
                              <span className="badge bg-success">Closed</span>
                            )}
                          </td>
                          <td>
                            <i className="fas fa-eye" onClick={() => openDetails(request)}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </section>
        )}
  
        {/* New section for displaying details and changing status */}
        {showModal && (
  <section className="content">
    {selectedRequest && (
      <div className="card">
        <div className="card-body">
          <h2>Maintenance Request Details</h2>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td><strong>ID:</strong></td>
                <td>{selectedRequest.requestId}</td>
              </tr>
              <tr>
                <td><strong>Date:</strong></td>
                <td>{selectedRequest.requestDate}</td>
              </tr>
              <tr>
                <td><strong>Description:</strong></td>
                <td>{selectedRequest.requestDescription}</td>
              </tr>
              <tr>
                <td><strong>Unit:</strong></td>
                <td>{selectedRequest.unitId}</td>
              </tr>
              <tr>
                <td><strong>User:</strong></td>
                <td>{selectedRequest.userId}</td>
              </tr>
              {selectedRequest.img !== null && (
                <tr>
                  <td><strong>Category:</strong></td>
                  <td>
                    {selectedRequest.img.startsWith('http') ? (
                      
                        <img
                          src={`${selectedRequest.img}`}
                          alt="maintenance req img"
                          style={{ maxWidth: '20%', height: 'auto' }}
                        />
                    ) : (
                      <img
                        src={`${API_BASE_URL}/${selectedRequest.img}`}
                        alt="maintenance req img"
                        style={{ maxWidth: '20%', height: 'auto' }}
                      />
                    )}
                  </td>
                </tr>
              )}
              {selectedRequest.requestStatus === 0 || selectedRequest.requestStatus === 1 ? (
                <>
                  <tr>
                    <td><strong>Remarks:</strong></td>
                    <td>
                      <textarea
                        className="form-control"
                        id="remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        required
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>
                      <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {selectedRequest.requestStatus === 0 ? (
                          <option value="1">Open Request</option>
                        ) : (
                          <option value="0">Pending Request</option>
                        )}
                        <option value="2">Close Request</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleStatusChange(selectedRequest)}>
                        <i className="fas fa-exchange-alt"></i> Change Status
                      </button>
                      <button className="btn btn-danger ml-2" onClick={() => closeDetails()}>
                        <i className="fas fa-times"></i> Close
                      </button>
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td><strong>Remarks:</strong></td>
                    <td>{selectedRequest.remarks}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>{selectedRequest.requestStatus === 1 ? 'Open Request' : 'Closed Request'}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button className="btn btn-danger ml-2" onClick={() => closeDetails()}>
                        <i className="fas fa-times"></i> Close
                      </button>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </section>
)}
    </div>
    );
  }
  
  export default MaintenanceRequestView;
  