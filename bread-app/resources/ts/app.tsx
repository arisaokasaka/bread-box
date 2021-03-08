//React
import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';

//Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//ContextProvider
import {UserAuthReducer, initialState } from './reducers/UserAuthReducer';
import {UserAuthContext} from './contexts/UserAuthContext';

//axios
import axios, { AxiosStatic } from 'axios';

//bootstrap(axios)
// import bootstrap from './bootstrap';

//Components
import NavBar from './components/layout/Navbar';
import LoginStore from './components/page/login/LoginStore';
import LoginUser from './components/page/login/LoginUser';
import ResetPassword_recreate from './components/page/passwordReset/ResetPassword_recreate';
import ResetPassword_request from './components/page/passwordReset/ResetPassword_request';
import Register_store from './components/page/register/Register_store';
import Register_user from './components/page/register/Register_user';
import Search from './components/page/search/Search';
import StoreEdit from './components/page/store/StoreEdit';
import StorePage from './components/page/store/StorePage';
import Top from './components/page/top/Top';
import UserPage from './components/page/user/UserPage';
import UserEdit from './components/page/user/UserEdit'; 
import Footer from './components/layout/Footer';
import NotFound from './components/page/NotFound';

//RouteAuth
import StoreOnly from './routeAuth/StoreOnly';
import UserOnly from './routeAuth/UserOnly';


declare global {
  interface Window {
    axios: AxiosStatic;
  }
  interface Element {
    content: string;
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(UserAuthReducer, initialState);
  
  return (
    <UserAuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <div id="global-container">
          <NavBar />
            <Switch>
                <Route path="/" exact component={Top} />
                <Route path="/search" component={Search} />
                <Route path="/login_store" component={LoginStore} />
                <Route path="/login_user" component={LoginUser} />
                <Route path="/password_reset_request" component={ResetPassword_request} />
                <Route path="/password_recreate/:token" component={ResetPassword_recreate} />
                <Route path="/register_store" component={Register_store} />
                <Route path="/register_user" component={Register_user} />
                <Route path="/store/:user_uuid" component={StorePage} />
                <StoreOnly path="/store_edit">
                  <StoreEdit />
                </StoreOnly>
                <UserOnly path="/user">
                  <UserPage />
                </UserOnly> 
                <UserOnly path="/user_edit">
                  <UserEdit />
                </UserOnly>
                <Route component={NotFound}></Route>
            </Switch>
          <Footer/>
        </div>
      </Router>
    </UserAuthContext.Provider>
  )
}
 
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}