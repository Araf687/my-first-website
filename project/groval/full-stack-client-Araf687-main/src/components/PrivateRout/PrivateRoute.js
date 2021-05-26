import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({children,...rest}) => {
  console.log(children);
  const [user,]=useContext(UserContext);
  const x=1;
    return (
        <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
           children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;