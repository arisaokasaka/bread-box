import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {UserAuthContext} from '../contexts/UserAuthContext';

function StoreOnly({ children, ...rest }) {
    const {state} = useContext(UserAuthContext);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          state.auth==="store"? (
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

export default StoreOnly;