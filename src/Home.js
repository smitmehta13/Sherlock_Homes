import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Widget } from './Widget'; // Create Widget component separately


function Home({ role }) {
    return (
      <div>
        <h1>Welcome to the Home Page!</h1>
        <p>Your role: {role}</p>
        <Dashboard />
      </div>
    );
  }
  // // Sidebar component
  // const Sidebar = () => {
  //   return (
  //     <aside className="main-sidebar">
  //       <section className="sidebar">
  //         {/* Sidebar content */}
  //         <ul>
  //           <li>Dashboard</li>
  //           <li>Analytics</li>
  //           <li>Reports</li>
  //         </ul>
  //       </section>
  //     </aside>
  //   );
  // };
  
  // // Header component
  // const Header = () => {
  //   return (
  //     <header className="main-header">
  //       {/* Header content */}
  //       <h1>Dashboard</h1>
  //     </header>
  //   );
  // };
  
  // // Content component
  // const Content = () => {
  //   return (
  //     <div className="content-wrapper">
  //       <section className="content">
  //         {/* Page content */}
          
  //         <h2>Welcome to the Dashboard</h2>
  //         <p>This is the main content of the dashboard.</p>
  //       </section>
  //     </div>
  //   );
  // };
  
  // // Footer component
  // const Footer = () => {
  //   return (
  //     <footer className="main-footer">
  //       {/* Footer content */}
  //       <p>© 2023 Your Company. All rights reserved.</p>
  //     </footer>
  //   );
  // };
  
  // // Dashboard component
  // const Dashboard = () => {
  //   return (
  //     <div className="wrapper">
  //       <Sidebar />
  //       <div className="content-wrapper">
  //         <Header />
  //         <Content />
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // };
  
 
  function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    var tempData;
    var tempid;
  
    useEffect(() => {
      // Replace 'API_ENDPOINT' with the actual endpoint to fetch JSON data
      const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';
      
      axios.get(API_ENDPOINT)
        .then((response) => {
          setData(response.data.users);
          setLoading(false);
          tempData = response.data.users;
          console.log(tempData);
        })
        .catch((error) => {
          console.log(error);
          setError('Failed to fetch data');
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Dashboard</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-6">
              <Widget title="Widget 1" data={data} />
            </div>
            <div className="col-md-6">
              <Widget title="Widget 2" data={data} />
            </div>
            {/* Add more widgets here */}
          </div>
        </section>
      </div>
    );
  }
    
  export default Home;
  export{Dashboard};