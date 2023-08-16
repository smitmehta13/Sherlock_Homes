import React, { useState } from 'react';
import axios from 'axios';
import { API_NOTIFICATIONS_CREATE } from './Constants';
import { fileToBase64 } from './Utils/utils';
import { myHeaders } from './Constants';

const NotificationForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setDescription(e.target.value);
  };


  async function handleImageChange(event) {
    const file = event.target.files[0];
    fileToBase64(file).then((base64String) => {
      setImage(base64String);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Title and description are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
     
      //now do http request
      console.log(formData);
      const response = await axios.post(`${API_NOTIFICATIONS_CREATE}`, formData, myHeaders);
      console.log('Notification sent successfully');
      alert('Notification sent successfully');
      setError('');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Failed to send notification', error);
    }
  };

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Create Notification</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter notification title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label>description</label>
            <textarea
              className="form-control"
              placeholder="Enter notification message"
              value={description}
              onChange={handleContentChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              className="form-control-file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {error && <div className="text-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">Send Notification</button>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;
