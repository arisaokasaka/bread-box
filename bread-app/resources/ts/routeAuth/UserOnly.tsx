import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {UserAuthContext} from '../contexts/UserAuthContext';

function UserOnly({ children, ...rest }) {
    const {state} = useContext(UserAuthContext);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          state.auth==="user" ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default UserOnly;