import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/Navbar';
import Top from './components/Top';
import Home from './components/Home';
import Search from './components/Search';

 
const App: React.FC = () => {
    return (
        <Router>
            <div>
                <div>
    　　　　　   Hello World
                </div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Top} />
                    <Route path="/home" component={Home} />
                    <Route path="/search" component={Search} />
                </Switch>
            </div>
        </Router>
    )
}
 
 
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}