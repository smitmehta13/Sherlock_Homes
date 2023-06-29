import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Account from './account';
import Lease from './lease';
import MaintenanceRequest from './maintanceReq';
import Residence from './Residence';
import Unit from './unit';
import Signup from './SignUp';
import Login from './Login';
import Navbar from './Navbar';
import NotificationForm from './NotificationForm';
import './AdminLTE-master/dist/css/adminlte.min.css';
import './AdminLTE-master/dist/js/adminlte.min.js';
import $ from 'jquery';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('loggedIn'));
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const handleLogin = (userRole) => {
    setLoggedIn(true);
    setRole(userRole);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('role', userRole);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
  };

  return (
    <Router>
      <div className="admin-panel">
        {loggedIn && <Navbar handleLogout={handleLogout} />}

        <Switch>
          <ProtectedRoute path="/account" component={Account} isLoggedIn={loggedIn} allowedRoles={['admin', 'manager', 'submanager']} />
          <ProtectedRoute path="/lease" component={Lease} isLoggedIn={loggedIn} allowedRoles={['admin', 'manager']} />
          <ProtectedRoute path="/maintenance" component={MaintenanceRequest} isLoggedIn={loggedIn} allowedRoles={['admin', 'manager', 'submanager']} />
          <ProtectedRoute path="/residence" component={Residence} isLoggedIn={loggedIn} allowedRoles={['admin']} />
          <ProtectedRoute path="/unit" component={Unit} isLoggedIn={loggedIn} allowedRoles={['admin', 'manager']} />
          <ProtectedRoute path="/notification" component={NotificationForm} isLoggedIn={loggedIn} allowedRoles={['admin', 'manager', 'submanager']} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" render={() => (loggedIn ? <Home role={role} /> : <Login onLogin={handleLogin} />)} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

function Home({ role }) {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Your role: {role}</p>
    </div>
  );
}

export default App;
