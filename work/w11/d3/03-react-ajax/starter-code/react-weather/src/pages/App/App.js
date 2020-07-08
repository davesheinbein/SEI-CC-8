import React, { Component } from 'react';
import './App.css';
import Map from '../../components/Map/Map';
import { getCurrentLatLng } from '../../services/geolocation';
import { getCurWeatherByLatLng } from '../../services/weather-api';

class App extends Component {

  state = {
    lat: null,
    lng: null,
    temp: null,
    icon: ''
  }


  async componentDidMount(){
    console.log(getCurrentLatLng)
    try {
      const {lat, lng} = await getCurrentLatLng();
      const weatherData = await getCurWeatherByLatLng(lat, lng);

      console.log(weatherData)

      this.setState({
        lat: lat,
        lng: lng,
        temp: weatherData.main.temp,
        icon: weatherData.weather[0].icon
      })
    } catch(err){
      console.log(err);
    }


  }
  render() {
    return (
      <div className='App'>
        <Map lat={this.state.lat} lng={this.state.lng}/>
        <header className='App-header'>
          <div>{this.state.temp}&deg;</div>
          REACT WEATHER
          {this.state.icon &&
            <img
              src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
              alt="current Weather Conditions"
            />
          }
        </header>
      </div>
    );
  }

}

export default App;
