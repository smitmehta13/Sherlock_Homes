import React, { useState } from 'react';

function Event() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to add a new event
  const addEvent = () => {
    const newEvent = { id: Date.now(), name: eventName, date: eventDate, time: eventTime };
    setEvents([...events, newEvent]);
    setEventName('');
    setEventDate('');
    setEventTime('');
  };

  // Function to delete an event
  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  // Function to update an event
  const updateEvent = () => {
    const updatedEvents = events.map((event) => {
      if (event.id === selectedEventId) {
        return { ...event, name: eventName, date: eventDate, time: eventTime };
      }
      return event;
    });
    setEvents(updatedEvents);
    setEventName('');
    setEventDate('');
    setEventTime('');
    setSelectedEventId(null);
  };

  // Function to edit an event
  const editEvent = (eventId) => {
    const selectedEvent = events.find((event) => event.id === eventId);
    setEventName(selectedEvent.name);
    setEventDate(selectedEvent.date);
    setEventTime(selectedEvent.time);
    setSelectedEventId(eventId);
  };

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Event Management</h1>
            </div>
          </div>
        </div>
      </section>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ul className="list-group">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={event.id}>
                      <div>
                        <span>{event.name}</span>
                        <br />
                        <small>Date: {event.date}</small>
                        <br />
                        <small>Time: {event.time}</small>
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => editEvent(event.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteEvent(event.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No events found.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{selectedEventId ? 'Update Event' : 'Add Event'}</h3>
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
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              className="form-control"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventTime">Event Time</label>
            <input
              type="time"
              className="form-control"
              id="eventTime"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={selectedEventId ? updateEvent : addEvent}
          >
            {selectedEventId ? 'Update' : 'Add'}
          </button>
          {selectedEventId && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setEventName('');
                setEventDate('');
                setEventTime('');
                setSelectedEventId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Event;
