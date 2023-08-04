import React from 'react';

function MaintenanceRequestView({ maintenanceRequests, currentPage, requestsPerPage, openDetails, closeRequest, paginate }) {
  // Get current requests based on pagination
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = maintenanceRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Maintenance Requests</h1>
      </section>

      <section className="content">
        <div className="box">
          <div className="box-body">
            {currentRequests.length === 0 ? (
              <p>No maintenance requests found.</p>
            ) : (
              <table className="table table-bordered table-hover">
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
                  {currentRequests.map((request) => (
                    <tr key={request.requestId}>
                      <td>{request.requestId}</td>
                      <td>{request.requestDate}</td>
                      <td>{request.requestDescription}</td>
                      <td>{request.unitId}</td>
                      <td>{request.userId}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => openDetails(request)}>
                          View Details
                        </button>
                        {request.requestStatus === 0 && (
                          <button className="btn btn-danger" onClick={() => closeRequest(request.requestId)}>
                            Close Request
                          </button>
                        )}
                        {request.requestStatus === 1 && (
                          <button className="btn btn-success" onClick={() => closeRequest(request.requestId)}>
                            Open Request
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MaintenanceRequestView;
