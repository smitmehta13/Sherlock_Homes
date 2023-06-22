import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Account from './account';
import Lease from './lease';
import MaintenanceRequest from './maintanceReq';
import Residence from './Residence';
import Unit from './unit';
import Signup from './SignUp';
import './AdminLTE-master/dist/css/adminlte.min.css';
import './AdminLTE-master/dist/js/adminlte.min.js';
import $ from 'jquery';

import Login from './Login';
import Navbar from './Navbar';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  return (
    <Router>
      <div className="admin-panel">
        {loggedIn && <Navbar handleLogout={handleLogout} />}
        
        <Switch>
        <ProtectedRoute
    path="/account"
    component={Account}
    isLoggedIn={loggedIn}
  />
  <ProtectedRoute
    path="/lease"
    component={Lease}
    isLoggedIn={loggedIn}
  />
  <ProtectedRoute
    path="/maintenance"
    component={MaintenanceRequest}
    isLoggedIn={loggedIn}
  />
  <ProtectedRoute
    path="/residence"
    component={Residence}
    isLoggedIn={loggedIn}
  />
  <ProtectedRoute
    path="/unit"
    component={Unit}
    isLoggedIn={loggedIn}
  />
  <Route
    exact
    path="/"
    render={() =>
      loggedIn ? <Home /> : <Login onLogin={handleLogin} />
    }
  />
  <Route render={() => <Redirect to="/" />} />
          <Route path="/account" component={Account} />
          <Route path="/lease" component={Lease} />
          <Route path="/maintenance" component={MaintenanceRequest} />
          <Route path="/residence" component={Residence} />
          <Route path="/unit" component={Unit} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" render={() => (loggedIn ? <Home /> : <Login onLogin={handleLogin} />)} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Welcome to the Home Page!</h1>;
}

export default App;
