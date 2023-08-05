import React, { useState, useEffect } from 'react';
import { fetchMaintenanceRequests, closeMaintenanceRequest } from '../models/MaintenanceRequestModel';
import MaintenanceRequestView from '../views/MaintenanceRequestView';
import Pagination from '../Utils/Pagination';

function MaintenanceRequest() {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState(null); // Add state to store the selected request

  useEffect(() => {
    fetchMaintenanceRequests().then((data) => setMaintenanceRequests(data));
  }, []);

  // Function to handle click on a maintenance request to show details
  const openDetails = (request) => {
    setSelectedRequest(request);
  };

  // Function to close a maintenance request
  const closeRequest = async (id) => {
    const success = await closeMaintenanceRequest(id);
    if (success) {
      // Update the request status in the state
      setMaintenanceRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === id ? { ...request, requestStatus: 2 } : request
        )
      );
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <MaintenanceRequestView
        maintenanceRequests={maintenanceRequests}
        currentPage={currentPage}
        requestsPerPage={requestsPerPage}
        openDetails={openDetails}
        closeRequest={closeRequest}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={requestsPerPage}
        totalItems={maintenanceRequests.length}
        paginate={paginate}
      />
    </>
  );
}

export default MaintenanceRequest;
