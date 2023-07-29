import React, { useState, useEffect } from 'react';
import { API_NOTICES_ALL } from './Constants';
import axios from 'axios';

function CreateAnnouncement() {
  const [announcement, setAnnouncement] = useState({
    title: '',
    body: '',
    externalUrl: '',
    img: null,
    isPinned: 0,
    createdAt: '',
    error: '',
  });

  // Add a new state to hold the current time
  const [currentTime, setCurrentTime] = useState('');

  // Update the "createdAt" field with the current time when the component mounts
  useEffect(() => {
    setCurrentTime(new Date().toISOString().slice(0, 16));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prevAnnouncement) => ({ ...prevAnnouncement, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!announcement.title || !announcement.body) {
      setAnnouncement((prevAnnouncement) => ({ ...prevAnnouncement, error: 'Title and description are required' }));
      return;
    }

    const formData = new FormData();
    formData.append('title', announcement.title);
    formData.append('body', announcement.body);
    if (announcement.img) {
      formData.append('img', announcement.img);
    }

    try {
      //now do http request
      console.log(formData);
      const response = await axios.post(`${API_NOTICES_ALL}`, formData);
      console.log('Notification sent successfully');
      alert('Notification sent successfully');
      resetForm();
    } catch (error) {
      console.error('Failed to send notification', error);
    }
  };

  const resetForm = () => {
    setAnnouncement({
      title: '',
      body: '',
      externalUrl: '',
      img: null,
      isPinned: 0,
      createdAt: '',
      error: '',
    });
  };

    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Create Announcement</h1>
        </section>

        <section className="content">
          <div className="box">
            <div className="box-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={announcement.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <textarea
                    className="form-control"
                    id="body"
                    name="body"
                    rows="5"
                    value={announcement.body}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="externalUrl">External URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="externalUrl"
                    name="externalUrl"
                    value={announcement.externalUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="img">Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isPinned"
                    name="isPinned"
                    checked={announcement.isPinned}
                    onChange={(e) =>
                      setAnnouncement((prevAnnouncement) => ({
                        ...prevAnnouncement,
                        isPinned: e.target.checked ? 1 : 0,
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="isPinned">
                    Pinned
                  </label>
                </div>
                <div className="form-group"  style={{ display: 'none' }}>
                  <label htmlFor="createdAt">Created At</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="createdAt"
                    name="createdAt"
                    value={currentTime} // Use currentTime state instead of announcement.createdAt
                    onChange={handleChange}
                  />

                </div><br/>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
export default CreateAnnouncement;
