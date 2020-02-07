import React from 'react'

export const WeatherData = ({
    id = "No Id",
    weather_state = "Clear",
    weather_State_Abbr = "c",
    date = Date.now(),
    max_Temp = 50,
    min_Temp = 0,
    the_Temp = 25,
    title = "Today"}) => {
    return (
        <section>
            <h2>{title}</h2>
            <img alt={weather_state} src='https://www.metaweather.com/static/img/weather/c.svg'/>
            <p>High: {max_Temp}</p>
            <p>Low: {min_Temp}</p>
        </section>
    )
}