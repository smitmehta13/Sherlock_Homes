import React from 'react';

function AccountView({
  users,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  filteredUsers,
  handleEditUser,
  handleDeleteUser,
  handleCreateOrUpdateUser,
  toggleForm,
  showForm,
  newUserData,
  setNewUserData,
}) {
  return (
    <div className="wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Account Management</h1>
            </div>
            <button className="btn btn-primary" onClick={toggleForm}>
              {showForm ? 'Hide Form' : 'Add New User'}
            </button>
          </div>
        </div>
      </div>
      {!showForm && (
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Users</h3>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="searchInput">Search:</label>
                      <input
                        type="text"
                        id="searchInput"
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>User ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Address</th>
                          <th>Postal Code</th>
                          <th>DateOfBirth</th>
                          <th>College Name</th>
                          <th>Student ID</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{user.postalCode}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.collegeName}</td>
                            <td>{user.studentId}</td>
                            <td>
                                <i className="fa-solid fa-pen-to-square"
                              onClick={() => handleEditUser(user)}>
                              </i>
                              &nbsp;&nbsp;
                                <i className="fa-solid fa-trash"
                                onClick={() => handleDeleteUser(user.id)}
                                ></i>
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
        </section>
      )}
      <section className="content">
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-12">
              {showForm && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      {newUserData.id ? 'Update User' : 'Create User'}
                    </h3>
                  </div>
                  {/*Left Column */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name:</label>
                          <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            name="firstName"
                            value={newUserData.firstName}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                firstName: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name:</label>
                          <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            name="lastName"
                            value={newUserData.lastName}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                lastName: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={newUserData.email}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                email: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password:</label>
                          <input
                            type="text"
                            id="password"
                            className="form-control"
                            name="password"
                            value={newUserData.password}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                password: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phoneNumber">Phone Number:</label>
                          <input
                            type="text"
                            id="phoneNumber"
                            className="form-control"
                            name="phoneNumber"
                            value={newUserData.phoneNumber}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                phoneNumber: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="address">Address:</label>
                          <input
                            type="textbox"
                            id="address"
                            className="form-control"
                            name="address"
                            value={newUserData.address}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                address: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="postalCode">Postal Code:</label>
                          <input
                            type="text"
                            id="postalCode"
                            className="form-control"
                            name="postalCode"
                            value={newUserData.postalCode}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                postalCode: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="dateOfBirth">Date of Birth:</label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            className="form-control"
                            name="dateOfBirth"
                            value={newUserData.dateOfBirth}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                dateOfBirth: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="collegeName">College Name:</label>
                          <input
                            type="text"
                            id="collegeName"
                            className="form-control"
                            name="collegeName"
                            value={newUserData.collegeName}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                collegeName: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="studentId">Student ID:</label>
                          <input
                            type="text"
                            id="studentId"
                            className="form-control"
                            name="studentId"
                            value={newUserData.studentId}
                            onChange={(e) =>
                              setNewUserData((prevData) => ({
                                ...prevData,
                                studentId: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={handleCreateOrUpdateUser}
                    >
                      {newUserData.id ? 'Update User' : 'Create User'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountView;
