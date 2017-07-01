/**
 * Created by Nguyen Quang Khue on 30-Jun-17.
 */

const axios = require('axios');
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
const appid = '158a491261ce9975c998defedae62735';

var getWeatherInformation = (location, units, callback) => {
    var lat = location.lat;
    var lng = location.lng;

    if (lat !== null && lat !== undefined && lng !== null && lng !== undefined) {
        axios.get(`${weatherUrl}?appid=${appid}&lat=${lat}&lon=${lng}&units=${units}`)
            .then((response) => {
                var unitLabel = 'K';
                var windUnitLabel = 'meter/sec';
                if (units === 'metric') {
                    unitLabel = 'C';
                } else if (units === 'imperial') {
                    unitLabel = 'F';
                    windUnitLabel = 'miles/hour';
                }

                callback({
                    location: response.data.name,
                    country: response.data.sys.country,
                    temperature: response.data.main.temp,
                    temp_unit: unitLabel,
                    wind: response.data.wind.speed,
                    wind_unit: windUnitLabel,
                    pressure: response.data.main.pressure,
                    humidity: response.data.main.humidity,
                    weather: response.data.weather[0].main,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                    code: response.data.cod
                });
            }).catch((e) => {
            if (e.response.data.cod === 401) {
                console.log('Invalid weather API key!');
            }
        });
    } else {
        callback({
            location: 'Unknown',
            country: 'Unknown',
            temperature: 'N/A',
            temp_unit: 'N/A',
            wind: 'N/A',
            wind_unit: 'N/A',
            pressure: 'N/A',
            humidity: 'N/A',
            weather: 'N/A',
            description: 'N/A',
            icon: '01d',
            code: 'N/A'
        });
    }

};

module.exports = {
    getWeatherInformation
};