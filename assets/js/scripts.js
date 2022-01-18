// Variables
let requestUrl = 'https://openweathermap.org/api/one-call-api';

let resonseText = document.getElementById('BLA');

// API Call
fetch(requestUrl)
    .then (function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
    })

   





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