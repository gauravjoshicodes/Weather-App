# Weather-App
A modern and responsive Weather Application built using HTML, CSS, and JavaScript that provides real-time weather information for cities around the world using the OpenWeatherMap API.

## Features
* Search weather by city name
* Quick city selection dropdown
* Real-time weather data from OpenWeatherMap API
* Displays:

  * Temperature
  * Weather Condition
  * Feels Like Temperature
  * Humidity
  * Wind Speed
  * Weather Icon
* Responsive and user-friendly interface
* Error handling for invalid cities and API issues

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* OpenWeatherMap API

## Project Structure

weather-app/
│
├── index.html
├── weather.css
├── weather.js
├── config.js
└── README.md

## Setup Instructions

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to the project folder

```bash
cd weather-app
```

3. Create a `config.js` file and add your OpenWeatherMap API key:

```javascript
window.OPENWEATHER_API_KEY = "YOUR_API_KEY";
```

4. Open `index.html` in your browser.

## API Used

OpenWeatherMap Current Weather API

https://openweathermap.org/api

## Future Improvements

* 5-Day Weather Forecast
* Current Location Weather
* Dark Mode Support
* Weather History
* Air Quality Index (AQI)
* Weather Maps Integration
