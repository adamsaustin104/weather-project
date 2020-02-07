import React, { Component } from 'react';
import { WeatherData } from './WeatherData';

export class Weather extends Component {
    static displayName = Weather.name;

    state = {
        forecasts: [],
        loading: true
    };
  

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
      return (
          console.log(forecasts),
          <div class="card-columns">
              <div class="card">
                  <div class="card-img">
                  </div>
                  <div class="card-body">
                      <h5 class="card-title">@product.Title</h5>
                  </div>
                  <div class="card-footer">
                  </div>
              </div>
          </div >,


        <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td></td>
                <td>{forecasts.consolidated_weather[0].created}</td>
                <td>{forecasts.consolidated_weather[0].the_temp}</td>
                <td>{forecasts.consolidated_weather[0].the_temp}</td>
                <td>{forecasts.summary}</td>
            </tr>
        </tbody>
      </table >
     );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Weather.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
    //https://www.metaweather.com/static/img/weather/c.svg images
    async populateWeatherData() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const response = await fetch(proxyurl + 'https://www.metaweather.com/api/location/44418');
        const data = await response.json();
        
        this.setState({
            forecasts: data,
            loading: false
        });
  }
}
