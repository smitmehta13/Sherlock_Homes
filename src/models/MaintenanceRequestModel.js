import axios from 'axios';
import { API_MAINTENANCE_ALL, API_MAINTENANCE_UPDATE } from '../Constants';
import { myHeaders } from '../Constants';

export const fetchMaintenanceRequests = async () => {
  try {
    const response = await axios.get(`${API_MAINTENANCE_ALL}`, myHeaders);
    return response.data;
  } catch (error) {
    console.log('Error fetching maintenance requests:', error);
    return [];
  }
};

export const closeMaintenanceRequest = async (id) => {
  try {
    await axios.put(`${API_MAINTENANCE_UPDATE(id)}`, { requestStatus: 2 }, myHeaders);
    console.log('Maintenance request closed successfully');
    return true;
  } catch (error) {
    console.log('Error closing maintenance request:', error);
    return false;
  }
};
