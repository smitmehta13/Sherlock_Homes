import axios from 'axios';
import { API_PATH_TRANSACTIONS, myHeaders } from '../Constants';

class TransactionsModel {
  async getAllTransactions() {
    try {
      const response = await axios.get(API_PATH_TRANSACTIONS , myHeaders);
      return response.data;
    } catch (error) {
      console.log('Error fetching transactions:', error);
      return [];
    }
  }

  async getTransactionsByUserId(userId) {
    try {
      const response = await axios.get(`${API_PATH_TRANSACTIONS}/${userId}`, myHeaders);
      return response.data;
    } catch (error) {
      console.log('Error fetching transactions for user:', error);
      return [];
    }
  }
}

export default TransactionsModel;
