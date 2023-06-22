import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Residence() {
  const [residences, setResidences] = useState([]);

  useEffect(() => {
    fetchResidences();
  }, []);

  const fetchResidences = async () => {
    try {
      const response = await axios.get('/api/residences');
      setResidences(response.data);
    } catch (error) {
      console.log('Error fetching residences:', error);
    }
  };

  return (
    <div>
      <h1>Residence Management</h1>
      {residences.length === 0 ? (
        <p>No residences found.</p>
      ) : (
        <ul>
          {residences.map((residence) => (
            <li key={residence.id}>
              <h3>{residence.name}</h3>
              <p>Address: {residence.address}</p>
              <p>City: {residence.city}</p>
              <p>State: {residence.state}</p>
              <p>Zip Code: {residence.zipCode}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Residence;
