import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: "1d6a433ebb2ea720bd6f9d1374253318",
    base: "https://api.openweathermap.org/data/2.5/"
};

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState(null);

    const search = event => {
        if (event.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }
    };

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div className={weather && weather.main ? (weather.main.temp > 16 ? 'app-warm' : 'app') : 'app'}>
            <main>
                <div className="search-container">
                    <input 
                        type="text" 
                        className="search-bar" 
                        placeholder='Search...'
                        value={query}
                        onChange={e => setQuery(e.target.value)} 
                        onKeyPress={search}
                    />
                    {weather && weather.main ? (
                        <div className="location-box">
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className="date">
                                {dateBuilder(new Date())}
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}°C
                                </div>
                                <div className="weather">
                                    {weather.weather[0].main}
                                </div>
                            </div>
                        </div>
                    ) : ('')}
                </div>
            </main>
        </div>
    );
};

export default Weather;
