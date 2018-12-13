import React, { Component } from 'react';
import './App.css';
import Weather from './components/Weather';
import SavedWeather from './components/SavedWeather';

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
      <div className="App">
        <div className='Nav'>
          <Weather saveWeatherData={this.saveWeatherData}/>
          <SavedWeather weatherData={this.state}/>
        </div>
      </div>
    )
  }
}

export default App;