import React, { Component } from 'react';
import './Weather.css';

class Weather extends Component {
    state = {
        temp: undefined,
        description: undefined,
        icon: undefined,
        renderDiv: false,
        animateDescription: false
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    getLocation = () => {
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

        this.checkIconAndTextSize();
    }

    checkIconAndTextSize = () => {
        //Test weather animation
        this.setState({
            description: 'This is a very long sentence...'
        });
        
        const weatherStatsWidth = document.getElementsByClassName('weatherStats')[0].offsetWidth,
        weatherStatsTextWidth = document.getElementsByClassName('weatherStatsText')[0].offsetWidth,
        weatherIcon = document.getElementsByClassName('weatherIcon')[0];

        const getWeatherIconWidth = setInterval(() => {
            if(weatherIcon.naturalWidth) {
                clearInterval(getWeatherIconWidth);
                const weatherIconWidth = weatherIcon.offsetWidth;
                if(weatherStatsTextWidth + weatherIconWidth > weatherStatsWidth) {
                    this.startWeatherTextAnimation();
                }
            }
        },100);
    }

    startWeatherTextAnimation = () => {
        this.setState({
            animateDescription: true
        });

        const text1 = document.getElementsByClassName('wdat1')[0],
        text2 = document.getElementsByClassName('wdat2')[0],
        textMarginRight = 10;

        text1.style.left = textMarginRight + 'px';
        text2.style.left = text2.offsetWidth + textMarginRight + textMarginRight + 'px';
        
        function animateText(elem) {
            const text = elem,
            animationSpeed = 40;

            if(text.offsetLeft > -text.offsetWidth - textMarginRight) {
                text.style.left = text.offsetLeft - 1 + 'px';
                setTimeout(function() {
                    window.requestAnimationFrame(function(){
                        animateText(text);
                    });
                },animationSpeed);
            } else {
                text.style.left = text.offsetWidth + textMarginRight + 'px';
                setTimeout(function() {
                    window.requestAnimationFrame(function(){
                        animateText(text);
                    });
                },animationSpeed);
            }
        }
        animateText(text1);
        animateText(text2);
    }

    render() {
        return (
            <div className="weatherContainer">
                <div className={this.state.renderDiv ? "hide" : "weatherBtn"} onClick={this.getLocation}>
                    <p>Weather API</p>
                </div>
                <div className={this.state.renderDiv ? "weatherStats" : "hide"}>
                    <div className="weatherStatsText">
                        <p>{this.state.temp}°C</p>
                        <div className={this.state.animateDescription ? "weatherDescriptionAnimationContainer" : ""}>
                            <p className={this.state.animateDescription ? "weatherDescriptionAnimationText wdat1" : ""}>{this.state.description}</p>
                            <p className={this.state.animateDescription ? "weatherDescriptionAnimationText wdat2" : "hide"}>{this.state.description}</p>
                        </div>
                    </div>
                    <img className="weatherIcon" src={this.state.icon} alt="Icon"></img>
                </div>
            </div>
        )
    }
}

export default Weather;