let now = new Date();
let dateToday = document.querySelector("#date");
let date = now.getDate();
let month = 1 + now.getMonth();
let year = now.getFullYear();
dateToday.innerHTML = `${date}.${month}.${year}`;

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector(".searching-city").innerHTML = response.data.name;
  document.querySelector(".current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity + " %";
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed)+ " km/h";
  document.querySelector("#main-icon").innerHTML = response.data.weather[0].main;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#visibility").innerHTML = response.data.visibility + " m";
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".enter-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
