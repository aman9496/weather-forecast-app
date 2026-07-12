let cityInput = document.getElementById("search-box");
let searchBut = document.getElementById("search-but");
let cityD = document.querySelector(".city-name");
let API_KEY = "6e92c3b524b1ea0fefc826a93a01529b";

let temp = document.getElementById("temp");
let minTemp = document.getElementById("min-temp");
let maxTemp = document.getElementById("max-temp");
let windDegree = document.getElementById("win-deg");
let feelsLike = document.getElementById("feels-like");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind-speed");
let weathMain = document.getElementById("weath-main");
let weathDesc = document.getElementById("weath-desc");


let showWeather = (data) => {
	temp.innerHTML = data.main.temp.toFixed(2);
	minTemp.innerHTML = data.main.temp_min.toFixed(2);
	maxTemp.innerHTML = data.main.temp_max.toFixed(2);
	windDegree.innerHTML = data.wind.deg ?? "N/A";
	feelsLike.innerHTML = data.main.feels_like.toFixed(2);
	humidity.innerHTML = data.main.humidity;
	windSpeed.innerHTML = data.wind.speed.toFixed(2);
	weathMain.innerHTML = data.weather[0].main;
	weathDesc.innerHTML = data.weather[0].description;
};

const getWeatherDetails = (cityName, lat, lon) => {

	const WEATHER_API_URL =
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

	fetch(WEATHER_API_URL)
		.then(res => res.json())
		.then(data => {

			showWeather(data);

		})
		.catch(() => {
			alert("An error occurred while fetching the weather forecast!");
		});

};

let getCityCoordinate = () => {
	const cityName = cityInput.value.trim(); // city name entered in the searchbox

	if (!cityName) return; // if empty 

	cityD.innerHTML = cityName;
	const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

	// get entered city coordinates (latitude , longitude and name ) from the api response
	fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {

		if (data.length === 0) {
			alert(`No coordinates found for ${cityName}`);
			return;
		}

		const { name, lat, lon } = data[0];
		getWeatherDetails(name, lat, lon);

	}).catch(() => {
		alert("An error occurred while fetching the coordinates!");
	});
}
searchBut.addEventListener("click", getCityCoordinate)