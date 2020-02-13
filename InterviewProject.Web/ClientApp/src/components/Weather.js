import React, { Component }          from 'react';
import WeatherData                   from './WeatherData';
import Loading                       from './Loading';
import Autocomplete                  from "./Autocomplete";
// import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';

export class Weather extends Component {
    static displayName = Weather.name;

    constructor(props){
      super(props)

      this.state = {
        loading: true,
        forecasts: [],
        input: '',
        activeLocation: '2487610',
        possibleCities: [],
      }

      this.handleNewLocation = this.handleNewLocation.bind(this)
      this.updateInput = this.updateInput.bind(this)
    }
        
    updateInput(e){
      const value = e.target.value

      if(value !== null){
        this.setState({
          input: value
        })
      }
    }

    handleNewLocation(location){
      console.log("handle new location called")
      this.setState({
        activeLocation: location,
      })
      console.log(this.state.activeLocation)
    }

    populateWeatherData(location) {
      console.log("populate weather data")
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const fullUrl = proxyurl + `https://www.metaweather.com/api/location/${location}`;
      
      fetch(fullUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          forecasts: data,
          loading: false,
        })
      })
      .catch((error) => console.log(error));
    }

  componentDidMount() {
    this.populateWeatherData(this.state.activeLocation);
  }


  render() {
    let contents = this.state.loading
      ? <Loading />
      : <WeatherData forecast={this.state.forecasts}/>;

    return (
      <div>
        <Autocomplete handleNewLocation={this.handleNewLocation}
        /> 
        <br />
        <button onClick={() => 
          this.populateWeatherData(this.state.activeLocation)}>
            Submit
        </button>
        {contents}
      </div>
    );
  }
}
