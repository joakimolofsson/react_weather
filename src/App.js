import React, { Component } from 'react';
import './App.css';
import Weather from './components/Weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='Nav'>
          <Weather/>
        </div>
      </div>
    );
  };
};

export default App;