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

//i18n
// import './18n';

//Components
import NavBar from './components/layout/Navbar';
import LoginStore from './components/page/login/LoginStore';
import LoginUser from './components/page/login/LoginUser';
import PasswordReset_store from './components/page/passwordReset/PasswordReset_store';
import PasswordReset_user from './components/page/passwordReset/PasswordReset_user';
import Register_store from './components/page/register/Register_store';
import Register_user from './components/page/register/Register_user';
import Review from './components/page/review/Review';
import Search from './components/page/search/Search';
import Search_input_mobile from './components/page/search/Search_input_mobile';
import StoreEdit from './components/page/store/StoreEdit';
import StorePage from './components/page/store/StorePage';
import Top from './components/page/top/Top';
import UserPage from './components/page/user/UserPage';
import UserEdit from './components/page/user/UserEdit'; 

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
          <div>
              <NavBar />
              <div id="global-container">
                  <Switch>
                      <Route path="/" exact component={Top} />
                      <Route path="/search" component={Search} />
                      <Route path="/search_mobile" component={Search_input_mobile} />
                      <Route path="/login_store" component={LoginStore} />
                      <Route path="/login_user" component={LoginUser} />
                      <Route path="/password_store" component={PasswordReset_store} />
                      <Route path="/password_user" component={PasswordReset_user} />
                      <Route path="/register_store" component={Register_store} />
                      <Route path="/register_user" component={Register_user} />
                      <Route path="/review" component={Review} />
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
                  </Switch>
              </div>
          </div>
      </Router>
    </UserAuthContext.Provider>
  )
}
 
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}