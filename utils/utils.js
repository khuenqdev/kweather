/**
 * Created by Nguyen Quang Khue on 30-Jun-17.
 */

const axios = require('axios');
const locationUrl = 'https://freegeoip.net/json/';
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
const appid = '158a491261ce9975c998defedae62735';

var getWeatherInformation = (units, callback) => {
    axios.get(locationUrl).then((response) => {
        var lat = response.data.latitude;
        var lng = response.data.longitude;
        return axios.get(`${weatherUrl}?appid=${appid}&lat=${lat}&lon=${lng}&units=${units}`);
    }).then((response) => {
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
            console.log('Invalid API key!');
        }
    });
};

module.exports = {
    getWeatherInformation
};