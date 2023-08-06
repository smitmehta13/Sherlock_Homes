import React, { useState, useEffect } from 'react';
import { fetchMaintenanceRequests, closeMaintenanceRequest } from '../models/MaintenanceRequestModel';
import MaintenanceRequestView from '../views/MaintenanceRequestView';
import Pagination from '../Utils/Pagination';

function MaintenanceRequest() {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState(null); // Add state to store the selected request
  const [remarks, setRemarks] = useState(''); // Add state to store the remarks
  const [status, setStatus] = useState('0'); // Add state to store the status
  const [showModal, setShowModal] = useState(false); // Add state to store the modal visibility


  useEffect(() => {
    fetchMaintenanceRequests().then((data) => setMaintenanceRequests(data));
  }, []);

  // Function to handle click on a maintenance request to show details
  const openDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // Function to close a maintenance request
  const closeRequest = async (id,remarks) => {
    const success = await closeMaintenanceRequest(id, remarks);
    if (success) {
      // Update the request status in the state
      setMaintenanceRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === id ? { ...request, requestStatus: 2 } : request
        )
      );
    }
  };

  // ... Inside the MaintenanceRequestView component ...

const handleStatusChange = (request) => {
  if (!remarks) {
    alert('Please provide remarks before changing the status.');
    return;
  }

  // Logic to change the status of the request
  const updatedRequest = {
    ...request,
    requestStatus: request.requestStatus === 0 ? 2 : 0,
    remarks,
  };

  closeRequest(updatedRequest.requestId, updatedRequest.remarks);

  // Clear the selected request and remarks after status change
  setSelectedRequest(null);
  setRemarks('');
};
const toggleModal = () => setShowModal(!showModal);

const closeDetails = () => {
  setSelectedRequest(null);
  setShowModal(false);
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
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
        remarks={remarks}
        setRemarks={setRemarks}
        status={status}
        setStatus={setStatus}
        handleStatusChange={handleStatusChange}
        showModal={showModal}
        toggleModal={toggleModal}
        closeDetails={closeDetails}
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
