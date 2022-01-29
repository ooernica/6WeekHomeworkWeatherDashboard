// variables
allWeatherDataApi = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=alerts&appid=32b541cf03be9ec1509a80d3e13aa8db';
fiveDayForecastApi = 'https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=32b541cf03be9ec1509a80d3e13aa8db'

// declare city coordinates and an object to be used when calling
// the website API (so eventually, users can search for any city)
class cityCoordinates {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
};

// function to call all of the weather data
function getAllWeatherData(cityCoordinates) {
  // Insert the latitude and longitude into the request URL
  let citySpecificApi = allWeatherDataApi.replace('{lat}', cityCoordinates.lat);
  citySpecificApi = citySpecificApi.replace('{lon}', cityCoordinates.lon);
  // grabs info from API 
  return fetch(citySpecificApi)
  .then(function (response) {
      return response.json();
  }) 
  // turns it into an object and allows it to be accessible 
  .then(function (data) {
      return data;
  });
}

// function to call the API for the 5 day forecast
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

document.querySelector('#searchBtn').addEventListener('click', function() {
  
  // get city name from search bar
  let cityName = document.querySelector('#searchBar').value;
  // This whole function runs when the user clicks search
  // stores API information in localstorage/in console.log
  getFiveDayForecast(cityName).then(function(forecast) {
    getAllWeatherData(forecast.city.coord).then(function(currentWeather){
      let jsonData = localStorage.getItem('storedCities')
      console.log(jsonData);
      // || means or, so if nothing in stored cites, show just empty list
      let storedCities = JSON.parse(jsonData || '[]')
      // push adds a city name to the array
      storedCities.push(cityName)
      // Display result
      console.log(forecast);
      console.log(currentWeather);
      localStorage.setItem('storedCities', JSON.stringify(storedCities));
      populateList(storedCities)
      document.querySelector('#searchBar').value = '';
      populateSummary(forecast,currentWeather)
    });
  });
})

// to do
// When we load the page
// Go get stored cites from localStorage and
// then add them to that list on the page

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

function populateList(cities) {
  document.getElementById('list-example').innerHTML = ''
  for (let i = 0; i < cities.length; i++) {
    let city = cities[i]
    document.getElementById('list-example')
    .innerHTML += `
      <a class="list-group-item list-group-item-action text-center" href="">${city}</a>
    `
  }
}

// adding other summary items, eventually will need to change temp 
// from Kelvin to F 
function populateSummary(data, weatherData) {
  let cityName = data.city.name
  let temp = weatherData.current.temp
  document.querySelector('#title').innerHTML=cityName
  document.querySelector('#temp').innerHTML='Temp: ' + temp
}

function main() {
  let initStoredCities = localStorage.getItem('storedCities')
  initStoredCities = JSON.parse(initStoredCities || '[]')
  populateList(initStoredCities);
}

main();