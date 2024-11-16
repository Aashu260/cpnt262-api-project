# cpnt262-api-project

## Name: Aashita

### Attributions:

- Weather data retrieved from the [OpenWeatherMap API](https://openweathermap.org/)

-Resources and inspiration:
- [W3schools](https://www.w3schools.com/js/default.asp)
- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Pseudo code:

1. Initialize variables:

- Define the apikey for getting the data from the OpenWeather API.
- Define variables.

2. Window onload:

- save local storage.
- save session storage.

3. Form submission:

- when form submitted, prevent default submission behavior.
- get the user inputs.
- save username in local storage
- save city in session storage
- display error if no city is entered.

4. Fetch data:

- define an async function to get the weather data. 
- if response is successful fetch the data.
- if it fails display an error.

5. Display weather Information:

- create elements to display the data for city name, temperature,humidity and description.
- add css classes to elements.
- append the elements to the card.