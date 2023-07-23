
import axios from 'axios';
import { API_BASE_URL } from '../Constants';
// method to convert base64 string to image file
export const base64StringtoFile = (base64String) => {
    var image = new Image();
    image.src = 'data:image/jpeg;base64,' + base64String;
    return image.src;
}

// method to convert image file to base64 string synchronously
export const fileToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      let res = reader.result;
      //remove the first part of the base64 string
      res = res.split(',')[1];
      resolve(res);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(imageFile);
  });
};



class BaseApiHandler {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Key': 'Authorization',
      'Value': 'Bearer ' + localStorage.getItem('token')

    };
  }

  getFullUrl() {
    return `${API_BASE_URL}/api${this.endpoint}`;
  }

  async get() {
    try {
      const response = await axios.get(this.getFullUrl(), { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${this.endpoint}:`, error);
      return null;
    }
  }

  async post(data) {
    try {
      const response = await axios.post(this.getFullUrl(), data, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${this.endpoint}:`, error);
      return null;
    }
  }

  async put(id, data) {
    try {
      const response = await axios.put(`${this.getFullUrl()}/${id}`, data, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating data in ${this.endpoint}:`, error);
      return null;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.getFullUrl()}/${id}`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error deleting data from ${this.endpoint}:`, error);
      return null;
    }
  }
}

export default BaseApiHandler;
