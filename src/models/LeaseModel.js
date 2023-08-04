//LeaseModel.js
import axios from 'axios';
import {
  API_LEASES_ALL,
  API_LEASES_CREATE,
  API_LEASES_UPDATE,
  API_LEASES_DELETE,
  myHeaders,

} from '../Constants';

class LeaseModel {
  async createLease(leaseData) {
    try {
      const response = await axios.post(`${API_LEASES_CREATE}`, leaseData , myHeaders);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create lease');
    }
  }

  async fetchLeases() {
    try {
      const response = await axios.get(`${API_LEASES_ALL}`,  myHeaders);
      console.log("bheja");
      return response;
    } catch (error) {
      throw new Error('Failed to fetch leases');
    }
  }

  async updateLease(leaseId, leaseData) {
    try {
      const response = await axios.put(`${API_LEASES_UPDATE}`, leaseData, myHeaders);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update lease');
    }
  }

  async deleteLease(leaseId) {
    try {
      await axios.delete(`${API_LEASES_DELETE}` , myHeaders);
      return true;
    } catch (error) {
      throw new Error('Failed to delete lease');
    }
  }
}

export default LeaseModel;
