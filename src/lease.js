import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Lease() {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch leases from the server
  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos'); // Replace with your API endpoint
        setLeases(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch leases');
        setLoading(false);
      }
    };

    fetchLeases();
  }, []);

  // Filter leases based on the search query
  const filteredLeases = leases.filter((lease) => {
    const { id, title, url, thumbnailUrl } = lease;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      id.toString().includes(searchQuery) ||
      title.toLowerCase().includes(lowerCaseQuery) ||
      url.toLowerCase().includes(lowerCaseQuery) ||
      thumbnailUrl.toLowerCase().includes(lowerCaseQuery)
    );
  });

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render leases
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Lease Management</h3>
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
                  <table id="leasesTable" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Lease ID</th>
                        <th>Tenant Name</th>
                        <th>Property</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Monthly Rent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeases.map((lease) => (
                        <tr key={lease.id}>
                          <td>{lease.id}</td>
                          <td>{lease.title}</td>
                          <td>{lease.url}</td>
                          <td>{lease.thumbnailUrl}</td>
                          <td>{lease.albumId}</td>
                          <td>{lease.monthlyRent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Lease;
