import React from 'react';
import ReactDOM from 'react-dom';
 
 
const App: React.FC = () => {
    return (
        <div>
　　　　　   Hello World
        </div>
    )
}
 
 
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}