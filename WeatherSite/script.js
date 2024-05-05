// Code by Michael White, 2023

function displayWeather(city, temp, maindescrip, description) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = "<h2>Weather in " + city + "</h2>"+
    "<p>Temperature: " + temp + "&degF</p>"+
    "<p>Weather: " + maindescrip + "</p>"+
    "<p>Description: " + description + "</p>";
    // TODO: Add checks to change images based on weather
    if(maindescrip == "Clouds") {
        weatherInfo.innerHTML += "<img src=\"images/rain.png\" class=\"small\" alt=\"rain\"/>";
    }
    else {
        weatherInfo.innerHTML += "<img src=\"images/sun.png\" class=\"small\" alt=\"sun\"/>";
    }
}

function getWeatherByCoords(latitude, longitude) {
    const apiKey = '030183d0d01fcfcc69fa4f55d2f55924';
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=imperial';
    fetch(url)
        .then((response) => response.json())
        .then(data => {
            displayWeather(data.name, data.main.temp, data.weather[0].main, data.weather[0].description);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again.</p></>';
        });
}

function getLocationWeather() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeatherByCoords(latitude, longitude);
        }, error => {
            console.error('Error getting user location', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = '<p>Failed to get user location. Please try again.</p></>';
        });
    } 
    else {
        console.error('Geolocation is not supported by this browser');
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = '<p>Geolocation is not supported by this browser.</p></>';
    }
}

getLocationWeather();