import React, { Component } from 'react';
import './Weather.css';

class Weather extends Component {
    state = {
        temp: undefined,
        description: undefined,
        icon: undefined,
        renderDiv: false
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const lat = pos.coords.latitude,
                lon = pos.coords.longitude;
                this.weatherData(lat, lon);
            });
        } else {
            console.log('no position found');
        }
    };

    weatherData = async (lat, lon) => {
        const apiKey = 'e24f5679cd826ebdad6179d1ba769f9b',
        response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&id=524901&APPID=${apiKey}`),
        jsonData = await response.json();
        console.log(jsonData);

        const temp = jsonData.main.temp,
        latestWeather = jsonData.weather.length - 1,
        description = jsonData.weather[latestWeather].description.charAt(0).toUpperCase() + jsonData.weather[latestWeather].description.slice(1),
        icon = `http://openweathermap.org/img/w/${jsonData.weather[latestWeather].icon}.png`;

        this.setState({
            temp,
            description,
            icon,
            renderDiv: true
        });

        this.changeWeatherIconSize();
    }

    changeWeatherIconSize = () => {
        const wheaterStatsWidth = document.getElementsByClassName('weatherStats')[0].offsetWidth,
        weatherStatsTextWidth = document.getElementsByClassName('weatherStatsText')[0].offsetWidth,
        weatherIcon = document.getElementsByClassName('weatherIcon')[0];

        const wheaterIconSize = setInterval(() => {
            if(weatherIcon.naturalWidth) {
                clearInterval(wheaterIconSize);
                console.log(wheaterStatsWidth, weatherStatsTextWidth, weatherIcon.offsetWidth);
            } else {
                console.log('n');
            }
        },10);

    }

    render() {
        return (
            <div className="weatherContainer">
                <div className={this.state.renderDiv ? 'hide' : 'weatherBtn'} onClick={this.getLocation}>
                    <p>Weather API</p>
                </div>
                <div className={this.state.renderDiv ? 'weatherStats' : 'hide'}>
                    <div className="weatherStatsText">
                        <p>{this.state.temp}°C</p>
                        <p>{this.state.description}</p>
                    </div>
                    <img className='weatherIcon' src={this.state.icon} alt='Icon'></img>
                </div>
            </div>
        )
    }
}

export default Weather;