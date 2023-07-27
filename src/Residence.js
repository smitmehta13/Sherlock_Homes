import React, { useState, useEffect } from 'react';
import { API_RESIDENCES_ALL } from './Constants';
import axios from 'axios';

function Residence() {
  const [residences, setResidences] = useState([]);

  useEffect(() => {
    fetchResidences();
  }, []);

  const fetchResidences = async () => {
    try {
      const response = await axios.get(`${API_RESIDENCES_ALL}`);
      setResidences(response.data);
    } catch (error) {
      console.log('Error fetching residences:', error);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Residence Management</h3>
                </div>
                <div className="card-body">
                  {residences.length === 0 ? (
                    <p>No residences found.</p>
                  ) : (
                    <ul>
                      {residences.map((residence) => (
                        <li key={residence.id}>
                          <h3>{residence.name}</h3>
                          <p>Address: {residence.address}</p>
                          <p>Description: {residence.description}</p>
                          <p>City: {residence.city}</p>
                          <p>State: {residence.state}</p>
                          <p>Zip Code: {residence.zipCode}</p>
                          <p>Total Units: {residence.units.length}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Residence;
