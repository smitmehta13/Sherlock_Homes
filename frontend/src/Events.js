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
import axios from 'axios';

function Event() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [_id, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventBanner, setEventBanner] = useState(null);
  const [eventDateTime, setEventDateTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const eventsApi = new BaseApiHandler('/events');
  const [fee, setEventFee] = useState([]); // Add a state variable to hold the event feed
  const [showForm, setShowForm] = useState(false); // Add a state variable to handle form visibility




  useEffect(() => {
    fetchEvents();
  }, []);

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64String = await fileToBase64(file);
      setEventBanner(base64String);
    }
  };

  const fetchEvents = async () => {
    const eventsData = await axios.get(API_EVENTS_ALL)
    if (eventsData) {
      setEvents(eventsData.data.data);
      console.log(eventsData.data.data);
    }
  };

  const addEvent = async () => {
    if (
      !eventName ||
      !eventDetails ||
      !eventDateTime ||
      !eventLocation ||
      !eventBanner ||
      eventStatus === ''
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Convert capacity and fee to numbers
    const capacityNumber = parseInt(capacity);
    const feeNumber = parseFloat(fee);

    const newEvent = {
      eventName,
      eventDetails,
      eventDateTime,
      eventLocation,
      capacity: capacityNumber,
      eventStatus: parseInt(eventStatus),
      fee: feeNumber,
      eventBanner,
    };
    try {
      const response = await axios.post(API_EVENTS_CREATE, newEvent, { headers: myHeaders });

      if (response.status === 201) {
        const eventData = await response.data;
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

    if (!eventName || !eventDetails || !eventDateTime || !eventLocation || !eventStatus) {
      // Add validation to check if any of the required fields are empty
      alert("Please fill in all the required fields.");
      return;
    }
    // Check if a new image was selected during the update
    const fileInput = document.getElementById('eventImage');
    let updatedEvent;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const eventBannerData = await fileToBase64(file);
      updatedEvent = {
        _id,
        eventName,
        eventDetails,
        eventDateTime,
        eventBanner: eventBannerData,
        eventLocation,
        capacity,
        eventStatus,
        fee,
      };
    } else {
      // Use the existing eventBanner if no new image is selected
      updatedEvent = {
        _id,
        eventName,
        eventDetails,
        eventDateTime,
        eventBanner: selectedEvent.eventBanner,
        eventLocation,
        capacity,
        eventStatus,
        fee,
      };
    }
    console.log(updatedEvent);

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
          event._id === selectedEvent._id ? eventData : event
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
      const confirmation = window.confirm('Are you sure you want to delete this Event?');
      if (confirmation) {
        console.log(eventId);
        const response = await fetch(`${API_EVENTS_DELETE}/${eventId}`, {
          method: 'DELETE',
        });

        console.log(response);
        if (response.ok) {
          const updatedEvents = events.filter((event) => event._id !== eventId);
          setEvents(updatedEvents);
        } else {
          console.error('Failed to delete event:', response.status);
        }
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
    setEventId(event._id);
    setEventName(event.eventName);
    setEventDetails(event.eventDetails);
    setEventDateTime(event.eventDateTime);
    setEventBanner(event.eventBanner);
    setEventLocation(event.eventLocation);
    setCapacity(event.capacity);
    setEventStatus(event.eventStatus);
    setEventFee(event.fee);
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
    console.log("this", location);
    const locationString = `${location}--${latitude}--${longitude}`;
    console.log(locationString);
    setEventLocation(locationString);
  };

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return a.eventStatus - b.eventStatus;
  });

  return (
    <div className="wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {!showForm && (
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active">Event Management</li>
                </ol>
              )}
              {showForm && (
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href="/account">Event Management</a></li>
                  <li className="breadcrumb-item active">Add New Event</li>
                </ol>
              )}
            </div>
            <div className="col-sm-6">
              <button className="btn btn-primary float-right" onClick={toggleForm}>
                {showForm ? 'Hide Form' : 'Add New Event'}
              </button>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <h1 className="m-0 text-dark">Event Management</h1>
            </div>
          </div>
        </div>
      </div>
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
                {sortedEvents.length > 0 ? (
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
                      {sortedEvents.map((event) => (
                        <tr key={event._id}>
                          <td>{event._id}</td>
                          <td>{event.eventName}</td>
                          <td>{event.eventDetails}</td>
                          <td>
                            {event.eventBanner && (
                              <img
                                src={event.eventBanner.startsWith("http") ? (
                                  event.eventBanner
                                ) : (
                                  `${API_BASE_URL}/${event.eventBanner}`
                                )}
                                alt="Event Banner"
                                style={{ maxWidth: '100px' }}
                              />
                            )}
                          </td>

                          <td>{event.eventDateTime.slice(0, -3)}</td>
                          <td>{event.eventLocation.split('--')[0]}</td>
                          <td>{event.capacity}</td>
                          <td>
                          <span className={`badge ${event.eventStatus === 'UpComing' ? 'bg-secondary' : event.eventStatus === 'OnGoing' ? 'bg-success' : event.eventStatus === 'Closed' ? 'bg-warning' : event.eventStatus === 'Cancelled' ? 'bg-danger' : 'bg-info'}`}>
    {event.eventStatus === 'UpComing'
        ? 'UpComing'
        : event.eventStatus === 'OnGoing'
        ? 'On Going'
        : event.eventStatus === 'Closed'
        ? 'Closed'
        : event.eventStatus === 'Cancelled'
        ? 'Cancelled'
        : 'Unknown'}
</span>

                          </td>
                          <td>
                            <i className="fas fa-edit"
                              onClick={() => handleEditEvent(event)}
                            ></i>
                            &nbsp;&nbsp;
                            <i className="fas fa-trash"
                              onClick={() => deleteEvent(event._id)}
                            ></i>
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
      )}{showForm && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Add Event</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
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
                  <label htmlFor="eventFee">Fee</label>
                  <input
                    type="number"
                    className="form-control"
                    id="eventFee"
                    value={fee}
                    onChange={(e) => setEventFee(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
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
                  <LocationSelector onChange={handleLocationSelect} />
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
                    <option value="1">UpComing</option>
                    <option value="2">OnGoing</option>
                    <option value="3">Closed</option>
                    <option value="4">Cancelled</option>
                  </select>
                </div>
              </div>
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
