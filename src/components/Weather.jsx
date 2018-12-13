import React, { Component } from 'react';
import './Weather.css';

class Weather extends Component {
    state = {
        temp: undefined,
        description: undefined,
        icon: undefined,
        showWeatherStats: false,
        animateWeatherDescription: false
    };

    componentDidMount() {
        //console.log('componentDidMount');
    };

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(this.positionWeatherData, this.errorMessage);
    };
    
    positionWeatherData = async pos => {
        const lat = pos.coords.latitude,
        lon = pos.coords.longitude,
        apiKey = 'e24f5679cd826ebdad6179d1ba769f9b',
        response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&id=524901&APPID=${apiKey}`),
        jsonData = await response.json();
        //console.log(jsonData);

        const temp = this.convertKelvin(jsonData.main.temp, jsonData.sys.country),
        latestWeather = jsonData.weather.length - 1,
        description = jsonData.weather[latestWeather].description.charAt(0).toUpperCase() + jsonData.weather[latestWeather].description.slice(1),
        icon = `http://openweathermap.org/img/w/${jsonData.weather[latestWeather].icon}.png`;

        this.setState({
            temp,
            description,
            icon,
        });
        
        this.checkIconAndTextSize();
    };

    errorMessage = err => {
        this.setState({
            description: err.message,
            showWeatherStats: true
        });
        const weatherIcon = document.getElementsByClassName('weatherIcon')[0];
        weatherIcon.className = 'hide';
    };

    convertKelvin = (kelvin, country) => {
        const fahrenheitCountries = ['BS','BZ','GU','KY','PR','PW','US','VI '];
        if(fahrenheitCountries.indexOf(country) !== -1) {
            const fahrenheit = kelvin * 1.8 - 459;
            return fahrenheit.toFixed(2) + '°F';
        } else {
            const celsius = kelvin - 273.15;
            return celsius.toFixed(2)  + '°C';
        }
    };

    checkIconAndTextSize = () => {
        /* this.setState({
            description: 'This will start the text animation...'
        }); */
        
        const weatherContainerWidth = document.getElementsByClassName('weatherContainer')[0].offsetWidth,
        weatherStatsTextWidth = document.getElementsByClassName('weatherStatsText')[0].offsetWidth,
        weatherIcon = document.getElementsByClassName('weatherIcon')[0];

        const getWeatherIconWidth = setInterval(() => {
            if(weatherIcon.naturalWidth) {
                clearInterval(getWeatherIconWidth);

                this.setState({
                    showWeatherStats: true
                });

                const weatherIconWidth = weatherIcon.offsetWidth;
                if(weatherStatsTextWidth + weatherIconWidth > weatherContainerWidth) {
                    this.startWeatherTextAnimation();
                }
            } else {
                //console.log('Waiting for icon to load...');
            }
        },100);
    };

    startWeatherTextAnimation = () => {
        this.setState({
            animateWeatherDescription: true
        });

        const text1 = document.getElementsByClassName('wdat1')[0],
        text2 = document.getElementsByClassName('wdat2')[0],
        textMarginRight = 10;

        text1.style.left = textMarginRight + 'px';
        text2.style.left = text2.offsetWidth + textMarginRight + textMarginRight + 'px';
        
        this.animateText = elem => {
            const animationSpeed = 40;

            if(elem.offsetLeft > -elem.offsetWidth - textMarginRight) {
                elem.style.left = elem.offsetLeft - 1 + 'px';
                setTimeout(() => {
                    window.requestAnimationFrame(() => {
                        this.animateText(elem);
                    });
                },animationSpeed);
            } else {
                elem.style.left = elem.offsetWidth + textMarginRight + 'px';
                setTimeout(() => {
                    window.requestAnimationFrame(() => {
                        this.animateText(elem);
                    });
                },animationSpeed);
            }
        }
        this.animateText(text1);
        this.animateText(text2);
    };

    render() {
        return (
            <div className="weatherContainer">
                <div className={this.state.showWeatherStats ? "hide" : "weatherBtn"} onClick={this.getLocation}>
                    <p>Weather API</p>
                </div>
                <div className={this.state.showWeatherStats ? "weatherStats" : "invisible"}>
                    <div className="weatherStatsText">
                        <p>{this.state.temp}</p>
                        <div className={this.state.animateWeatherDescription ? "weatherDescriptionAnimationContainer" : ""}>
                            <p className={this.state.animateWeatherDescription ? "weatherDescriptionAnimationText wdat1" : ""}>{this.state.description}</p>
                            <p className={this.state.animateWeatherDescription ? "weatherDescriptionAnimationText wdat2" : "hide"}>{this.state.description}</p>
                        </div>
                    </div>
                    <img className="weatherIcon" src={this.state.icon} alt="Icon"></img>
                </div>
            </div>
        );
    };
};

export default Weather;