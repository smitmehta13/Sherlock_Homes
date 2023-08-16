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
    id: '',
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
      const response = await axios.get(API_USERS_ALL);
      const userData = response.data.map((user) => ({
        id: user.id,
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
      setUsers(userData);
      setLoading(false);
    } catch (error) {
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
        id: '',
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
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Account Management</h1>
            </div>
            <button className="btn btn-primary" onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Add New Event'}
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
                        <th>Date of Birth</th>
                        <th>College Name</th>
                        <th>Student ID</th>
                        <th>Postal Code</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.address}</td>
                          <td>{user.dateOfBirth}</td>
                          <td>{user.collegeName}</td>
                          <td>{user.studentId}</td>
                          <td>{user.postalCode}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEditUser(user)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ml-2"
                              onClick={() => handleDeleteUser(user.id)}
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
                    <label htmlFor="phoneNumber">phoneNumber:</label>
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
                    <label htmlFor="address">address:</label>
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
                    <label htmlFor="postalCode">postalCode:</label>
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
                      type="Date"
                      id="DateOfBirth"
                      className="form-control"
                      name="DateOfBirth"
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
                      id="CollegeName"
                      className="form-control"
                      name="CollegeName"
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
                  <button
                    className="btn btn-primary"
                    onClick={handleCreateOrUpdateUser}
                  >
                    {newUserData.id ? 'Update User' : 'Create User'}
                  </button>
                </div>
              
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
