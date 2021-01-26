//React
import React from 'react';
import ReactDOM from 'react-dom';

//Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//i18n
// import './18n';

//Components
import NavBar from './components/layout/Navbar';
import Login_store from './components/login/Login_store';
import Login_user from './components/login/Login_user';
import PasswordReset_store from './components/passwordReset/PasswordReset_store';
import PasswordReset_user from './components/passwordReset/PasswordReset_user';
import Register_store from './components/register/Register_store';
import Register_user from './components/register/Register_user';
import Review from './components/review/Review';
import Search from './components/search/Search';
import StoreEdit from './components/store/StoreEdit';
import StorePage from './components/store/StorePage';
import Top from './components/top/Top';
import UserPage from './components/user/UserPage';
import Home from './components/Home';
 
const App: React.FC = () => {
    return (
        <Router>
            <div>
                <NavBar />
                <div id="global-container">
                    <Switch>
                        <Route path="/" exact component={Top} />
                        <Route path="/home" component={Home} />
                        <Route path="/search" component={Search} />
                        <Route path="/login_store" component={Login_store} />
                        <Route path="/login_user" component={Login_user} />
                        <Route path="/password_store" component={PasswordReset_store} />
                        <Route path="/password_user" component={PasswordReset_user} />
                        <Route path="/register_store" component={Register_store} />
                        <Route path="/register_user" component={Register_user} />
                        <Route path="/review" component={Review} />
                        <Route path="/store_edit" component={StoreEdit} />
                        <Route path="/store" component={StorePage} />
                        <Route path="/user" component={UserPage} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
 
 
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}