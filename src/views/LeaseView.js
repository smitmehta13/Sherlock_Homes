import React, { useState, useEffect } from 'react';
import LeaseModel from '../models/LeaseModel';

function LeaseView() {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newLeaseData, setNewLeaseData] = useState({
    leaseStatus: '',
    property: '',
    leaseStartDate: '',
    leaseleaseEndDate: '',
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
        leaseStatus: '',
        property: '',
        leaseStartDate: '',
        leaseEndDate: '',
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

  const filteredLeases = leases.filter((lease) => {
    const { leaseStatus, property } = lease;
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (searchQuery === '') {
      return true; // Return all leases when the search query is empty
    }
    return (
      (leaseStatus && leaseStatus.toLowerCase().includes(lowerCaseQuery)) ||
      (property && property.toLowerCase().includes(lowerCaseQuery))
    );
  });
  
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Lease Management</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Lease Management</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Leases</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="searchInput">Search:</label>
                    <input
                      type="text"
                      id="searchInput"
                      className="form-control"
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                    />
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Tenant Name</th>
                          <th>Property</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Monthly Rent</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeases.map((lease) => (
                          <tr key={lease.id}>
                            <td>{lease.leaseStatus}</td>
                            <td>{lease.property}</td>
                            <td>{lease.leaseStartDate}</td>
                            <td>{lease.leaseEndDate}</td>
                            <td>{lease.monthlyRent}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteLease(lease.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Create Lease</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="leaseStatus">Tenant Name:</label>
                    <input
                      type="text"
                      id="leaseStatus"
                      className="form-control"
                      name="leaseStatus"
                      value={newLeaseData.leaseStatus}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="property">Property:</label>
                    <input
                      type="text"
                      id="property"
                      className="form-control"
                      name="property"
                      value={newLeaseData.property}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="leaseStartDate">Start Date:</label>
                    <input
                      type="date"
                      id="leaseStartDate"
                      className="form-control"
                      name="leaseStartDate"
                      value={newLeaseData.leaseStartDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="leaseEndDate">End Date:</label>
                    <input
                      type="date"
                      id="leaseEndDate"
                      className="form-control"
                      name="leaseEndDate"
                      value={newLeaseData.leaseEndDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="monthlyRent">Monthly Rent:</label>
                    <input
                      type="text"
                      id="monthlyRent"
                      className="form-control"
                      name="monthlyRent"
                      value={newLeaseData.monthlyRent}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleCreateLease}>
                    Create Lease
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LeaseView;
