//LeaseView.js
import React, { useState, useEffect } from 'react';

function LeaseView({
  leases,
  loading,
  error,
  searchQuery,
  handleSearchQueryChange,
  selectedLease,
  toggleForm,
  showForm,
  handleEditLease,
  filteredLeases,
  handleStatusSelect,
  handleUnitNumberInput,
  editedLease,
  handleStatusChange,
}) {

  const sortedLeases = [...filteredLeases].sort((a, b) => {
    return a.leaseStatus - b.leaseStatus;
  });

  return (
    <div className="wrapper">
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
                {showForm && (
                  <li className="breadcrumb-item active">Edit Lease</li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {!showForm && (
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
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedLeases.map((lease) => (
                            <tr key={lease.id}>
                              <td>{lease.user.firstName} {lease.user.lastName}</td>
                              <td>{lease.subresidence.unitType} {lease.subresidence.unitId}</td>
                              <td>{lease.leaseStartDate}</td>
                              <td>{lease.leaseEndDate}</td>
                              <td>{lease.subresidence.monthlyRent}</td>
                              <td>
                                <span className={`badge bg-${lease.leaseStatus === 1 ? 'success' : lease.leaseStatus === 2 ? 'danger' : 'primary'}`}>
                                  {lease.leaseStatus === 0 ? 'Pending' : lease.leaseStatus === 1 ? 'Approved' : 'Denied'}
                                </span>
                              </td>
                              <td>
                                <i className="fas fa-eye" onClick={() => handleEditLease(lease)}></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              {showForm && (
                <div className="view-section">
                  <h2>Lease Details</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="info-box">
                        <span className="info-box-icon bg-info"><i className="fas fa-user"></i></span>
                        <div className="info-box-content">
                          <h5>Tenant Name</h5>
                          <p>{selectedLease.user.firstName} {selectedLease.user.lastName}</p>
                        </div>
                      </div>
                      <div className="info-box">
                        <span className="info-box-icon bg-success"><i className="fas fa-home"></i></span>
                        <div className="info-box-content">
                          <h5>Property</h5>
                          <p>{selectedLease.subresidence.unitType} {selectedLease.subresidence.unitId}</p>
                        </div>
                      </div>
                      <div className="info-box">
                        <span className="info-box-icon bg-warning"><i className="far fa-calendar-alt"></i></span>
                        <div className="info-box-content">
                          <h5>Start Date</h5>
                          <p>{selectedLease.leaseStartDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <span className="info-box-icon bg-danger"><i className="far fa-calendar-alt"></i></span>
                        <div className="info-box-content">
                          <h5>End Date</h5>
                          <p>{selectedLease.leaseEndDate}</p>
                        </div>
                      </div>
                      <div className="info-box">
                        <span className="info-box-icon bg-primary"><i className="fas fa-dollar-sign"></i></span>
                        <div className="info-box-content">
                          <h5>Monthly Rent</h5>
                          <p>{selectedLease.subresidence.monthlyRent}</p>
                        </div>
                      </div>
                      <div className="info-box">
                        <span className="info-box-icon bg-secondary"><i className="fas fa-info"></i></span>
                        <div className="info-box-content">
                          <h5>Lease Status</h5>
                          {selectedLease.leaseStatus === 0 ?(
                          <select
                            id="statusSelect"
                            className="form-control"
                            value={editedLease.leaseStatus}
                            onChange={handleStatusSelect}
                          >
                            <option value={0}>Change Status</option>
                            <option value={1}>Approved</option>
                            <option value={2}>Denied</option>
                          </select>
                          ): (
                            <strong ><p style={{fontStyle:'italic'}} 
                            className={`badge bg-${selectedLease.leaseStatus === 1 ? 'success' :'danger'}`}
                            >{selectedLease.leaseStatus === 1 ? 'Approved' : selectedLease.leaseStatus === 2 ? 'Denied' : 'Unknown'} </p></strong>
                          )
                          }
                        </div>
                      </div>
                      {editedLease.leaseStatus === 1 && (
                        <div className="info-box">
                          <span className="info-box-icon bg-info"><i className="fas fa-home"></i></span>
                          <div className="info-box-content">
                            <h5>Unit Number</h5>
                            <input
                              type="text"
                              id="unitNumberInput"
                              className="form-control"
                              value={editedLease.unitNo}
                              onChange={handleUnitNumberInput}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className={`btn ${editedLease.leaseStatus === 1 ? 'btn-primary' : 'btn-danger'}`}
                    onClick={handleStatusChange}
                  >
                    {editedLease.leaseStatus === 1 ? 'Approve' : editedLease.leaseStatus === 2 ? 'Deny' : 'Change Status'}
                  </button>
                  <button className="btn btn-secondary" onClick={toggleForm}>
                    Close
                  </button>
                </div>

              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default LeaseView;
