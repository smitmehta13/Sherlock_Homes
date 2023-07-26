import React, { useState, useEffect } from 'react';
import LeaseModel from '../models/LeaseModel';
import LeaseView from '../views/LeaseView';

function LeaseController() {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newLeaseData, setNewLeaseData] = useState({
    tenantName: '',
    property: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
  });

  const leaseModel = new LeaseModel();

  useEffect(() => {
    fetchLeases();
  }, []);

  const fetchLeases = async () => {
    try {
      const leases = await leaseModel.fetchLeases();
      setLeases(leases);
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
      await leaseModel.createLease(newLeaseData);
      setNewLeaseData({
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
    setNewLeaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <LeaseView
      leases={leases}
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      handleSearchQueryChange={handleSearchQueryChange}
      newLeaseData={newLeaseData}
      handleCreateLease={handleCreateLease}
      handleDeleteLease={handleDeleteLease}
      handleInputChange={handleInputChange}
    />
  );
}

export default LeaseController;
