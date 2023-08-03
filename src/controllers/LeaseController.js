//LeaseController.js
import React, { useState, useEffect } from 'react';
import LeaseModel from '../models/LeaseModel';
import LeaseView from '../views/LeaseView';

function LeaseController() {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLease, setSelectedLease] = useState({
    tenantName: '',
    property: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
  });

  const leaseModel = new LeaseModel();

  useEffect(() => {
    fetchLeases();
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showForm]);

  const handleKeyPress = (event) => {
    if (event.keyCode === 27 && showForm) {
      // ESC key code is 27
      toggleForm();
    }
  };
  const fetchLeases = async () => {
    try {
      const leases = await leaseModel.fetchLeases();
      setLeases(leases.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch leases');
      setLoading(false);
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCreateLease = async () => {
    try {
      await leaseModel.createLease(selectedLease);
      setSelectedLease({
        tenantName: '',
        property: '',
        startDate: '',
        endDate: '',
        monthlyRent: '',
      });
      fetchLeases();
    } catch (error) {
      setError('Failed to create lease');
    }
  };

  const handleDeleteLease = async (leaseId) => {
    try {
      await leaseModel.deleteLease(leaseId);
      fetchLeases();
    } catch (error) {
      setError('Failed to delete lease');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedLease((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const filteredLeases = leases.filter((lease) => {
    const leaseStatus = lease.leaseStatus;
    const tenant = lease.user.firstName + lease.user.lastName;
    const property = lease.subresidence.unitType + lease.subresidence.unitId;
    const lowerCaseQuery = searchQuery.toLowerCase().trim(); // Trim the searchQuery
  
    // Check if searchQuery is defined and not empty
    if (typeof searchQuery === 'string' && searchQuery.trim() !== '') {
      // Convert leaseStatus, tenant, and property to lowercase (if they are strings)
      const statusString = leaseStatus && typeof leaseStatus === 'string' ? leaseStatus.toLowerCase() : '';
      const tenantString = tenant && typeof tenant === 'string' ? tenant.toLowerCase() : '';
      const propertyString = property && typeof property === 'string' ? property.toLowerCase() : '';
  
      // Check if statusString, tenantString, or propertyString includes the searchQuery (case-insensitive)
      const statusMatch = statusString && statusString.includes(lowerCaseQuery);
      const tenantMatch = tenantString && tenantString.includes(lowerCaseQuery);
      const propertyMatch = propertyString && propertyString.includes(lowerCaseQuery);
  
      return statusMatch || propertyMatch || tenantMatch;
    }
  
    // Return all leases when the search query is empty or not a string
    return true;
  });

  const toggleForm = () => {
    console.log("toggle");
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleEditLease = (lease) => {
    try {
      toggleForm(); // Toggle the showForm state to show the form view
      setSelectedLease(lease);
    } catch (error) {
      setError('Failed to update lease');
    }
  };
  const [editedLease, setEditedLease] = useState({
    leaseStatus: selectedLease.leaseStatus,
    unitNo: selectedLease.unitNo || '',
  });

  const handleStatusSelect = (event) => {
    const newStatus = parseInt(event.target.value);
    setEditedLease((prevState) => ({
      ...prevState,
      leaseStatus: newStatus,
    }));
  };

  const handleUnitNumberInput = (event) => {
    const unitNo = event.target.value;
    setEditedLease((prevState) => ({
      ...prevState,
      unitNo,
    }));
  };

  const handleApproveLease = () => {
    if (editedLease.leaseStatus === 1 && editedLease.unitNo.trim() === '') {
      // If the status is "Approved" and the unit number is empty, show an alert and return.
      alert('Please enter the unit number before approving.');
      return;
    }

    leaseModel.updateLease(selectedLease.leaseId, editedLease);
    toggleForm();
  };
  const handleDenyLease = () => {
    setEditedLease((prevState) => ({
      ...prevState,
      leaseStatus: 2,
    }));
    leaseModel.updateLease(selectedLease.leaseId, editedLease);
    toggleForm();
  };

  

  return (
    <LeaseView
      leases={leases}
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      handleSearchQueryChange={handleSearchQueryChange}
      selectedLease={selectedLease}
      handleCreateLease={handleCreateLease}
      toggleForm={toggleForm}
      showForm={showForm}
      handleEditLease={handleEditLease}
      handleDeleteLease={handleDeleteLease}
      handleInputChange={handleInputChange}
      filteredLeases={filteredLeases}
      handleStatusSelect={handleStatusSelect}
      handleUnitNumberInput={handleUnitNumberInput}
      handleApproveLease={handleApproveLease}
      editedLease={editedLease}
      handleDenyLease={handleDenyLease}
    />
  );
}

export default LeaseController;
