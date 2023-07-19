import axios from 'axios';
import {
  API_LEASES_ALL,
  API_LEASES_CREATE,
  API_LEASES_UPDATE,
  API_LEASES_DELETE,
  API_BASE_URL,
  MAX_RESULTS_PER_PAGE,
  MY_VARIABLE,
} from '../Constants';


class LeaseModel {
  
  async login(username, password) {
    try {
      console.log('login started');
      const response = await axios.post('https://focus-chain-392022.nn.r.appspot.com/login', { username, password});
      const token = response.data.token;
      console.log('got token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(token);
      // Store the token in local storage or cookies for future requests
      localStorage.setItem('token', token);
    } catch (error) {
      throw new Error('Login failed');
    }
  }
  async createLease(leaseData) {
    try {
      const response = await axios.post(`${API_LEASES_CREATE}`, leaseData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create lease');
    }
  }

  async fetchLeases() {
    try {
      const response = await axios.get(`${API_LEASES_ALL}`)
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch leases');
    }
  }

  async updateLease(leaseId, leaseData) {
    try {
      const response = await axios.put(`${API_LEASES_UPDATE}`, leaseData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update lease');
    }
  }

  async deleteLease(leaseId) {
    try {
      await axios.delete(`${API_LEASES_DELETE}`);
      return true;
    } catch (error) {
      throw new Error('Failed to delete lease');
    }
  }
}

export default LeaseModel;
