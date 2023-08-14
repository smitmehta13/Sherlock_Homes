import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BOOKABLE_ITEMS } from './Constants';

function BookableItemsPage() {
  const [bookableItems, setBookableItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchBookableItems();
  }, []);

  const fetchBookableItems = async () => {
    try {
      const response = await axios.get(`${API_BOOKABLE_ITEMS}`);
      setBookableItems(response.data);
    } catch (error) {
      console.error('Error fetching bookable items:', error);
    }
  };

  const fetchBookingDetails = async (itemId) => {
    try {
      const response = await axios.get(`${API_BOOKABLE_ITEMS}/${itemId}`);
      setSelectedItem({ ...bookableItems.find(item => item.id === itemId), bookings: response.data });
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  return (
    <div className="wrapper p-3">
      <section className="content-header">
        <h1>Bookable Items</h1>
      </section>
      <section className="content">
        <div className="box">
          <div className="box-body">
            <ul className="list-group">
              {bookableItems.map(item => (
                <li
                  key={item.id}
                  className="list-group-item"
                  onClick={() => fetchBookingDetails(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.name}
                  <img src={item.imgUrl} alt={item.name} style={{ width: '100px', float: 'right' }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedItem && (
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">{selectedItem.name} Booking Details</h3>
            </div>
            <div className="box-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Booking Date</th>
                    <th>Booked Till</th>
                    <th>Booked By</th>
                    <th></th>
                
                    {/* Add more columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  {selectedItem.bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.bookedFrom}</td>
                        <td>{booking.bookedTo}</td>
                      <td>{booking.user.firstName}</td>
                      {/* Add more columns as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default BookableItemsPage;
