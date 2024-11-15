const apikey = "bf8755493a92eb08974e3974b0a725de";
const weatherForm = document.querySelector(".weatherForm");
const nameInput = document.querySelector(".nameInput");
const cityInput = document.querySelector(".cityInput");
const toggleCheckbox = document.querySelector("#toggleCheckbox");
const card = document.querySelector(".card");
const givenNameDisplay = document.querySelector("#givenName");

let unit = `metric`;
toggleCheckbox.addEventListener(`change`, function () {
  unit = toggleCheckbox.checked ? `imperial` : `metric`;
  if (cityInput.value.trim()) {
    getWeatherData(cityInput.value.trim());
  }
});

//Saved preferences
window.onload = function () {
  const savedName = localStorage.getItem("username");
  const savedCity = sessionStorage.getItem("lastCity");
  const savedWeatherData = JSON.parse(localStorage.getItem("weatherData"));

  if (savedName) {
    nameInput.value = savedName;
    givenNameDisplay.textContent = savedName;
  } else {
    givenNameDisplay.textContent = "User";
  }
  if (savedCity) {
    cityInput.value = savedCity;
  }
  if (savedWeatherData) {
    displayWeatherInfo(savedWeatherData);
  }
};

// form submission to fetch and display weather data
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const givenName = nameInput.value.trim();
  const city = cityInput.value;

  if (givenName) {
    localStorage.setItem("username", givenName);
    givenNameDisplay.textContent = givenName;
  } else {
    givenNameDisplay.textContent = "User";
  }

  // save city to sessionstorage and fetch weather data
  if (city) {
    sessionStorage.setItem("lastCity", city);
    try {
      const weatherData = await getWeatherData(city);
      console.log(weatherData);
      displayWeatherInfo(weatherData); // show weather data in card
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
    } catch (error) {
      displayError(error); //error if fetch fails
    }
  } else {
    displayError("Enter a city name"); //show error if no city is entered
  }
});
//fetch weather info from openweathermap api
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Not able to fetch weather data");
  }
  return await response.json();
}

// display weather info on card
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  // create elements with weather data
  const cityDisplay = document.createElement("h2");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");

  cityDisplay.textContent = `${city}`;

  tempDisplay.textContent = `${
    unit === `metric`
      ? (temp - 273.15).toFixed(1)
      : (((temp - 273.15) * 9) / 5 + 32).toFixed(1)
  }°${unit === `metric` ? `C` : `F`}`;

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = `Weather: ${description}`;

  // Adding css classes to elements
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");

  // Append elements to card
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
}

// error messages
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
