//Events.js
import React, { useState, useEffect } from 'react';
import {
  base64StringtoFile,
  fileToBase64
} from './Utils/utils';
import {
  API_BASE_URL,
  API_EVENTS_ALL,
  API_EVENTS_CREATE,
  API_EVENTS_UPDATE,
  API_EVENTS_DELETE,
} from './Constants';
import BaseApiHandler from './Utils/utils';
import LocationSelector from './Utils/LocationSelector';
import { myHeaders } from './Constants';

function Event() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [id, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventBanner, setEventBanner] = useState(null);
  const [eventDateTime, setEventDateTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsApi = new BaseApiHandler('/events');
  const [showForm, setShowForm] = useState(false); // Add a state variable to handle form visibility




  useEffect(() => {
    fetchEvents();
  }, []);

  async function handleImageSelect(event) {
    const file = event.target.files[0];
    fileToBase64(file).then((base64String) => {
      setEventBanner(base64String);
    });
  }

  const fetchEvents = async () => {
    const eventsData = await eventsApi.get();
    if (eventsData) {
      setEvents(eventsData);
    }
  };

  const addEvent = async () => {
    const newEvent = {
      eventName,
      eventDetails,
      eventDateTime,
      eventBanner,
      eventLocation,
      capacity,
      eventStatus,
    };

    try {
      console.log(newEvent);
      const response = await fetch(API_EVENTS_CREATE, {
        method: 'POST',
        body: JSON.stringify(newEvent),
        myHeaders,
      });

      if (response.ok) {
        const eventData = await response.json();
        setEvents([...events, eventData]);
        resetEventForm();
      } else {
        console.error('Failed to add event:', response.status);
      }
    } catch (error) {

      console.error('Failed to add event:', error);
    }
  };

  const updateEvent = async () => {
    const updatedEvent = {
      id,
      eventName,
      eventDetails,
      eventBanner,
      eventDateTime,
      eventLocation,
      capacity,
      eventStatus,
    };

    try {
      const response = await fetch(`${API_EVENTS_UPDATE}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        const eventData = await response.json();
        const updatedEvents = events.map((event) =>
          event.id === selectedEvent.id ? eventData : event
        );
        setEvents(updatedEvents);
        resetEventForm();
      } else {
        console.error('Failed to update event:', response.status);
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      console.log(eventId);
      const response = await fetch(`${API_EVENTS_DELETE}/${eventId}`, {
        method: 'DELETE',
      });

      console.log(response);
      if (response.ok) {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
      } else {
        console.error('Failed to delete event:', response.status);
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleEditEvent = (event) => {
    toggleForm();
    setSelectedEvent(event);
    setEventId(event.id);
    setEventName(event.eventName);
    setEventDetails(event.eventDetails);
    setEventDateTime(event.eventDateTime);
    setEventBanner(event.eventBanner);
    setEventLocation(event.eventLocation);
    setCapacity(event.capacity);
    setEventStatus(event.eventStatus);
    setIsAddingEvent(true);
  };

  const resetEventForm = () => {
    setSelectedEvent(null);
    setEventName('');
    setEventDetails('');
    setEventBanner(null);
    setEventDateTime('');
    setEventLocation('');
    setCapacity('');
    setEventStatus('');
    setIsAddingEvent(false);
    toggleForm();
  };

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleLocationSelect = ({ location, latitude, longitude }) => {
    console.log("this",location);
    const locationString = `${location}--${latitude}--${longitude}`;
    console.log(locationString);
    setEventLocation(locationString);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Event Management</h1>
            </div>
            <button className="btn btn-primary" onClick={toggleForm}>
              {showForm ? 'Hide Form' : 'Add New Event'}
            </button>
          </div>
        </div>
      </section>
      {!showForm && (
        <section className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Events</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="searchInput">Search:</label>
                  <input
                    type="text"
                    id="searchInput"
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                {filteredEvents.length > 0 ? (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Event Name</th>
                        <th>Description</th>
                        <th>Banner</th>
                        <th>Date & Time</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event) => (
                        <tr key={event.id}>
                          <td>{event.id}</td>
                          <td>{event.eventName}</td>
                          <td>{event.eventDetails}</td>
                          <td>
                            {event.eventBanner && (
                              <img
                                src={`${API_BASE_URL}/${event.eventBanner}`}
                                alt="Event Banner"
                                style={{ maxWidth: '100px' }}
                              />
                            )}
                          </td>
                          <td>{event.eventDateTime.slice(0,-3)}</td>
                          <td>{event.eventLocation.split('--')[0]}</td>
                          <td>{event.capacity}</td>
                          <td>
                            {event.eventStatus === 1
                              ? 'Open'
                              : event.eventStatus === 2
                                ? 'Closed'
                                : event.eventStatus === 3
                                  ? 'Cancelled'
                                  : 'Unknown'}
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleEditEvent(event)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteEvent(event.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No events found.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      {showForm && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Add Event</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                className="form-control"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDetails">Event Details</label>
              <textarea
                className="form-control"
                id="eventDetails"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="eventImage">Event Image</label>
              <input
                type="file"
                className="form-control-file"
                id="eventImage"
                accept="image/*"
                onChange={handleImageSelect}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDateTime">Event Date and Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="eventDateTime"
                value={eventDateTime}
                onChange={(e) => setEventDateTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventLocation">Event Location</label>
              <LocationSelector
              onChange={handleLocationSelect}
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                className="form-control"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventStatus">Event Status</label>
              <select
                className="form-control"
                id="eventStatus"
                value={eventStatus}
                onChange={(e) => setEventStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="1">Open</option>
                <option value="2">Closed</option>
                <option value="3">Cancelled</option>
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={isAddingEvent ? updateEvent : addEvent}
            >
              {isAddingEvent ? 'Update Event' : 'Add Event'}
            </button>
            <button className="btn btn-secondary" onClick={resetEventForm}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
