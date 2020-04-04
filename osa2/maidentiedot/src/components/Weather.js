import React, { useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [ weatherData, setWeatherData] = useState({})

    useEffect(() => {
        console.log('useEffect for shownData refresh')
          let getstring = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}/`
          console.log(getstring, 'getstring')
          axios  
            .get(getstring)
            .then(response => {
              setWeatherData(response.data)
              console.log(response.data, 'weatherstack data')
            })
      },[capital])
      
      // Wait for api to give weather info
      if (weatherData.current !== undefined) {
        return (
            <div>
                <p>Temperature: {weatherData.current.temperature}</p>
                <img src={weatherData.current.weather_icons[0]}/>
                <p>Wind: {weatherData.current.wind_speed}mph, direction: {weatherData.current.wind_dir}</p>
            </div>
        )
      }
      else return null
}

export default Weather