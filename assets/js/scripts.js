allWeatherDataApi = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=alerts&appid=32b541cf03be9ec1509a80d3e13aa8db';
fiveDayForecastApi = 'https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=32b541cf03be9ec1509a80d3e13aa8db'

class cityCoordinates {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
};
 
function getAllWeatherData(cityCoordinates) {
  // Insert the latitude and longitude into the request URL
  let citySpecificApi = allWeatherDataApi.replace('{lat}', cityCoordinates.lat);
  citySpecificApi = citySpecificApi.replace('{lon}', cityCoordinates.lon);
  
  return fetch(citySpecificApi)
  .then(function (response) {
      return response.json();
  }) 
  .then(function (data) {
      return data;
  });
}

function getFiveDayForecast(cityName) {
  // Insert the city name into the request URL
  let citySpecificApi = fiveDayForecastApi.replace('{city name}', cityName) 
  return fetch(citySpecificApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    return data;
  });
}


// let cityForecast;
// getFiveDayForecast("Denver").then(function(forecast) {
//   cityForecast = forecast;
  
// });
getFiveDayForecast("Denver").then(function(forecast) {
  getAllWeatherData(forecast.city.coord).then(function(currentWeather){
    // Store result in localStorage
    let storedForecast = {forecast, currentWeather}
    // Display result
    console.log(forecast);
    console.log(currentWeather);
  });
});



// Auto complete for search bar -- not currently working, come back to this later

// $(function () {
//     let availableTags = [
//         "Denver",
//         "New York",
//         "Seattle",
//     ];
//     $(".autocomplete").autocomplete({
//         source: availableTags
//     });
// )};