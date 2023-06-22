import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Account() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Account Management</h1>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Users</h3>
              </div>

              <div className="box-body">
                {users.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Allotted Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.unit ? user.unit.name : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Account;
