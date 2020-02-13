import React from 'react'

const WeatherData = (props) => (
  <div>
    <h2 style={{textAlign: 'center'}}>{props.forecast.title}</h2>
    <hr />
      <div className="card-columns">
        {props.forecast.consolidated_weather.map(
          ({ id, applicable_date, weather_state_name, weather_state_abbr, max_temp, min_temp, the_temp}) => 
          (
          <div className='card' key={id}>
            <div className='card-header'><h5>{new Date(applicable_date).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'} )}</h5>
            </div>
            <div className='card-img' style={
              {backgroundImage: `url(${`https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`})`}
              }>
            </div>
            <div className='card-footer'>
              {(the_temp === props.forecast.consolidated_weather[0].the_temp)
              ? <h5>Current: {(32 + (the_temp / 0.5556)) | 0}˚F</h5>
              : <br />}
              <p>High: {(32 + (max_temp / 0.5556)) | 0}˚F</p>
              <p>Low: {(32 + (min_temp / 0.5556)) | 0}˚F</p>
            </div>  
          </div>
        ))}
      </div>
  </div>
)

export default WeatherData;
