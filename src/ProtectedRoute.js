import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, isLoggedIn, allowedRoles, ...rest }) {
  const userRole = localStorage.getItem('role');

  // Check if the user is logged in and their role is allowed for the route
  const isAuthorized = isLoggedIn && allowedRoles.includes(userRole);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={isLoggedIn ? '/unauthorized' : '/login'} />
        )
      }
    />
  );
}

export default ProtectedRoute;
