import React, { Component } from 'react';
import './SavedWeather.css';

class SavedWeather extends Component {
    state = {
        weatherData: []
    }

    saveWeather = () => {     
        const newSave = {...this.props.weatherData, id: Date.now()};
        const weatherData = [...this.state.weatherData, newSave];
        this.setState({
            weatherData
        });
    }

    deleteWeather = id => {
        this.setState(prevState => ({
            weatherData: prevState.weatherData.filter(data => data.id !== id)
        }));
    }

    render() {
        return (
            <div className="savedWeatherContainer">
                <p className="savedWeatherTitle">SavedWeather</p>
                <div>{this.state.weatherData.map((data, index) => {
                    return (
                        <div className="savedWeatherItem" key={index}>
                            <p className="savedWeatherText">{data.id}</p>
                            <p className="savedWeatherText">{data.tempData} {data.descriptionData}</p>
                            <div className="savedWeatherDelete" onClick={() => this.deleteWeather(data.id)}>x</div>
                        </div>
                        )
                })}</div>
                <div className="savedWeatherSave" onClick={this.saveWeather}>Save</div>
            </div>
        );
    }
}

export default SavedWeather;