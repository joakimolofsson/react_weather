import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Weather from './components/Weather';
import SavedWeather from './components/SavedWeather';
import About from './components/About';
import Home from './components/Home';

class App extends Component {
  state = {
    tempData: undefined,
    descriptionData: undefined
  }

  saveWeatherData = (tempData, descriptionData) => {
    this.setState({
      tempData,
      descriptionData
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className='Nav'>
            <Weather saveWeatherData={this.saveWeatherData}/>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/save">Save</Link>
          </div>

          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/save" render={() => <SavedWeather weatherData={this.state}/>} />
        </div>
      </Router>
    )
  }
}

export default App;