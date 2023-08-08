import React from 'react';

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
                      {sortedRequests.map((request) => (
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
                  <p>
                    <strong>ID:</strong> {selectedRequest.requestId}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedRequest.requestDate}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedRequest.requestDescription}
                  </p>
                  <p>
                    <strong>Unit:</strong> {selectedRequest.unitId}
                  </p>
                  <p>
                    <strong>User:</strong> {selectedRequest.userId}
                  </p>
                  {selectedRequest.requestStatus === 0 || selectedRequest.requestStatus === 1 ? (
                    <>
                      <div className="form-group">
                        <label htmlFor="remarks">Remarks:</label>
                        <textarea
                          className="form-control"
                          id="remarks"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                          className="form-control"
                          id="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="1">Open Request</option>
                          <option value="2">Close Request</option>
                        </select>
                      </div>
                      <button className="btn btn-primary" onClick={() => handleStatusChange(selectedRequest)}>
                        <i className="fas fa-exchange-alt"></i> Change Status
                      </button>
                      <button className="btn btn-danger ml-2" onClick={() => closeDetails()}>
                        <i className="fas fa-times"></i> Close
                      </button>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Remarks:</strong> {selectedRequest.requestRemarks}
                      </p>
                      <p>
                        <strong>Status:</strong> {selectedRequest.requestStatus === 1 ? 'Open Request' : 'Closed Request'}
                      </p>
                      <button className="btn btn-danger ml-2" onClick={() => closeDetails()}>
                        <i className="fas fa-times"></i> Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    );
  }
  
  export default MaintenanceRequestView;
  