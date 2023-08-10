import React, { useState, useEffect } from 'react';
import { fetchMaintenanceRequests, closeMaintenanceRequest, toggleMaintenanceRequest } from '../models/MaintenanceRequestModel';
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
  const closeRequest = async (id, remarks) => {
    const success = await closeMaintenanceRequest(id, remarks);
    if (success) {
      console.log('API call successful');
      
      // Log the previous state
      console.log('Previous State:', maintenanceRequests);
  
      // Update the request status in the state
    window.location.reload();
      // Log the updated state
      console.log('Updated State:', maintenanceRequests);
    } else {
      console.log('API call failed');
    }
  };
  
  //toggle between open and pending
  const toggleStatus = async (id,remarks,status) => {
    const success = await toggleMaintenanceRequest(id, remarks, status);
    if (success) {
     window.location.reload();
      // Update the request status in the state
      console.log('success toggle');
      
    }
  };



  // ... Inside the MaintenanceRequestView component ...

const handleStatusChange = (request) => {
  if (!remarks) {
    alert('Please provide remarks before changing the status.');
    return;
  }
  let newStatus = document.getElementById('status').value;
  //convert into an intergar
  newStatus = parseInt(newStatus, 10);
  // Logic to change the status of the request
  const updatedRequest = {
    ...request,
    requestStatus: newStatus,
    remarks,
  };

  if (newStatus === 2) {
    closeRequest(updatedRequest.requestId, updatedRequest.remarks);
  }
  else {
   toggleStatus(updatedRequest.requestId, updatedRequest.remarks, updatedRequest.requestStatus);
  }

 
  // Clear the selected request and remarks after status change
  setMaintenanceRequests(maintenanceRequests.map((request) => {
    if (request.requestId === updatedRequest.requestId) {
      console.log('request', request);
      return updatedRequest;
    }
    return request;
  }));
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
