import React from "react";
import $ from 'jquery';


function Home({ role }) {
    return (
      <div>
        <h1>Welcome to the Home Page!</h1>
        <p>Your role: {role}</p>
        <Dashboard />
      </div>
    );
  }
  // Sidebar component
  const Sidebar = () => {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          {/* Sidebar content */}
          <ul>
            <li>Dashboard</li>
            <li>Analytics</li>
            <li>Reports</li>
          </ul>
        </section>
      </aside>
    );
  };
  
  // Header component
  const Header = () => {
    return (
      <header className="main-header">
        {/* Header content */}
        <h1>Dashboard</h1>
      </header>
    );
  };
  
  // Content component
  const Content = () => {
    return (
      <div className="content-wrapper">
        <section className="content">
          {/* Page content */}
          <h2>Welcome to the Dashboard</h2>
          <p>This is the main content of the dashboard.</p>
        </section>
      </div>
    );
  };
  
  // Footer component
  const Footer = () => {
    return (
      <footer className="main-footer">
        {/* Footer content */}
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    );
  };
  
  // Dashboard component
  const Dashboard = () => {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="content-wrapper">
          <Header />
          <Content />
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Home;
  export{Dashboard};