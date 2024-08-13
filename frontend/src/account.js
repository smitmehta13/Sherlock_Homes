import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  API_USERS_ALL,
  API_USERS_CREATE,
  API_USERS_UPDATE,
  API_USERS_DELETE,
  API_BASE_URL,
  API_USERS_PATH,
} from './Constants';

function Account() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false); // Add a state variable to handle form visibility
  const [newUserData, setNewUserData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    collegeName: '',
    studentId: '',
    postalCode: '',
    role: '',
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_USERS_ALL);
      const responseData = await response.json()
      const userData = responseData.map((user) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        password: user.password,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        collegeName: user.collegeName,
        studentId: user.studentId,
        postalCode: user.postalCode,
        // Add other fields as needed
      }));
      console.log('User data:', userData);
      setUsers(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
      setLoading(false);
    }
  };
    

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const { id, name, email } = user;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      id.toString().includes(searchQuery) ||
      name.toLowerCase().includes(lowerCaseQuery) ||
      email.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const handleCreateOrUpdateUser = async () => {
    try {
      if (newUserData.id) {
        await axios.put(`${API_BASE_URL}${API_USERS_PATH}/${newUserData.id}`, newUserData);
      } else {
        await axios.post(API_USERS_CREATE, newUserData);
      }
      setNewUserData({
        _id: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        collegeName: '',
        studentId: '',
        postalCode: '',
        role: '',
      });
      fetchUsers();
    } catch (error) {
      setError('Failed to create/update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete this user?');
      if (confirmation) {
        await axios.delete(`${API_BASE_URL}${API_USERS_PATH}/${userId}`);
        fetchUsers();
      }
    } catch (error) {
      setError('Failed to delete user');
    }
  };
  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleEditUser = (user) => {
    toggleForm();
    console.log(user);
    setNewUserData(user);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {!showForm && (
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active">Account Management</li>
                </ol>
              )}
              {showForm && (
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href="/account">Account Management</a></li>
                  <li className="breadcrumb-item active">Add New User</li>
                </ol>
              )}
            </div>
            <div className="col-sm-6">
              <button className="btn btn-primary float-right" onClick={toggleForm}>
                {showForm ? 'Hide Form' : 'Add New User'}
              </button>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <h1 className="m-0 text-dark">Account Management</h1>
            </div>
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
                     
                        {filteredUsers.length === 0 ? (
                          <p>"No users found. Please add new members."</p>
                        ) : ( <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
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
                        )}
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
                            value={newUserData.name.split(" ")[0]}
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
                            value={newUserData.name.split(" ").pop()}
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

export default Account;
