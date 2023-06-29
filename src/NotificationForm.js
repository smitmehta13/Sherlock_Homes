import React, { useState } from 'react';
import axios from 'axios';

const NotificationForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('https://dummy.restapiexample.com/api/v1/create', formData);
      console.log('Notification sent successfully');
      alert('Notification sent successfully');
      setError('');
      setTitle('');
      setContent('');
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
            <label>Content</label>
            <textarea
              className="form-control"
              placeholder="Enter notification message"
              value={content}
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
