import axios from 'axios';
import {
  API_USERS_ALL,
  API_USERS_CREATE,
  API_USERS_UPDATE,
  API_USERS_DELETE,
} from '../Constants';
import { myHeaders } from '../Constants';

export async function fetchUsers() {
  try {
    const response = await axios.get(API_USERS_ALL, myHeaders);
    const userData = response.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
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
    return userData;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
}

export async function createUser(user) {
  try {
    await axios.post(API_USERS_CREATE, user, myHeaders);
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

export async function updateUser(userId, user) {
  try {
    await axios.put(`${API_USERS_UPDATE}/${userId}`, user, myHeaders);
  } catch (error) {
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(userId) {
  try {
    await axios.delete(`${API_USERS_DELETE}/${userId}`, myHeaders);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}
