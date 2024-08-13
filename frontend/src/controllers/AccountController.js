import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../models/AccountModel';
import AccountView from '../views/AccountView';

function AccountController() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Assuming users is an array of objects
const filteredUsers = users
? users.filter((user) => {
    const { _id, firstName, lastName, email } = user;
    const lowerCaseQuery = searchQuery ? searchQuery.toLowerCase() : '';
    const lowerCaseFirstName = firstName?.toLowerCase() || '';
    const lowerCaseLastName = lastName?.toLowerCase() || '';
    const lowerCaseEmail = email?.toLowerCase() || '';

    return (
      _id.toString().includes(lowerCaseQuery) ||
      lowerCaseFirstName.includes(lowerCaseQuery) ||
      lowerCaseLastName.includes(lowerCaseQuery) ||
      lowerCaseEmail.includes(lowerCaseQuery)
    );
  })
: [];

  

  const handleCreateOrUpdateUser = async () => {
    try {
      if (newUserData.id) {
        await updateUser(newUserData.id, newUserData);
      } else {
        await createUser(newUserData);
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
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (error) {
      setError('Failed to create/update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete this user?');
      if (confirmation) {
        await deleteUser(userId);
        const userData = await fetchUsers();
        setUsers(userData);
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
    setNewUserData(user);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AccountView
      users={users}
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filteredUsers={filteredUsers}
      handleEditUser={handleEditUser}
      handleDeleteUser={handleDeleteUser}
      handleCreateOrUpdateUser={handleCreateOrUpdateUser}
      toggleForm={toggleForm}
      showForm={showForm}
      newUserData={newUserData}
      setNewUserData={setNewUserData}
    />
  );
}

export default AccountController;
