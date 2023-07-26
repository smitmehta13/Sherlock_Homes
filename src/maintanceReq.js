import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_MAINTENANCE_ALL, API_MAINTENANCE_UPDATE } from './Constants';

const Pagination = ({ currentPage, itemsPerPage, totalItems }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
}


function MaintenanceRequest() {
  const [requests, setRequests] = useState([]);
  const [closedRequests, setClosedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10); // Set the number of requests to display per page

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
    }catch (error) {
      console.log('Error closing maintenance request:', error);
    }
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
                          <tr
                          key={request.requestId}>
                            <td>{request.requestId}</td>
                            <td>{request.requestDescription}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => closeMaintenanceRequest(request.requestId)}
                              >
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
                          <tr key={request.id}>
                            <td>{request.requestId}</td>
                            <td>{request.requestDescription}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {/* Optional: Implement logic to reopen the request */}}
                              >
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
    </div>
  );
}

export default MaintenanceRequest;
