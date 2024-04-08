const clouds = document.querySelectorAll(".cloud");

// Preset variables:
let cityT = document.querySelector(".city").textContent;
const weather = document.querySelector(".weather");
const degree = document.querySelector(".degree");

const byInput = document.getElementById("by");
const søk = document.getElementById("søk");

const kaboom = document.querySelector(".sun");

const key = "Gqoo2Ox7TTq0GZ8vsFGAgDiujsDVzbKC";

const sun = document.querySelector(".actualSun");

const bgMusic = document.getElementById("bg-music");
const rainMusic = document.getElementById("rain");

// Functions:
const getConditions = async (id) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  if (data[0].IsDayTime === true) {
    kaboom.style.backgroundColor = "#2289e4";
    bgMusic.innerHTML =
      '<source src="./musikk/birds-in-forest-on-sunny-day-14444.mp3" type="audio/mpeg">';

    bgMusic.pause(); // Pause current audio if playing
    bgMusic.load(); // Load new audio
    bgMusic.play(); // Play new audio
  } else {
    kaboom.style.backgroundColor = "#05233e";
    bgMusic.innerHTML =
      '<source src="./musikk/night-ambience-17064.mp3" type="audio/mpeg">';

    bgMusic.pause(); // Pause current audio if playing
    bgMusic.load(); // Load new audio
    bgMusic.play(); // Play new audio
  }

  if

  return data[0];
};

const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

søk.addEventListener("click", async () => {
  const city = byInput.value;
  if (city !== "") {
    const cityDetails = await getCity(city);
    console.log("CityDetails:", cityDetails);

    cityT = byInput.value; // Change this line

    try {
      const data = await getConditions(cityDetails.Key);
      console.log(data);
      byInput.value = "";

      if (data) {
        // Display the weather text
        if (data.WeatherText) {
          weather.innerHTML = data.WeatherText;
        } else {
          weather.innerHTML = "Weather information not available";
        }

        // Display the temperature
        if (data.Temperature && data.Temperature.Metric) {
          degree.innerHTML = data.Temperature.Metric.Value + "°C";
        } else {
          degree.innerHTML = "Temperature information not available";
        }

        if (
          data.WeatherText === "Sunny" ||
          data.WeatherText === "Mostly sunny" ||
          data.WeatherText === "Partly sunny"
        ) {
          sun.style.opacity = "1";
          sun.style.padding = `${data.Temperature.Metric.Value}px`;

          if (data.Temperature.Metric.Value > 10) {
            sun.innerHTML = "🌞";
          } else {
            sun.innerHTML = "😞";
          }
        } else {
          sun.style.opacity = "0";
        }

        // Check if the clouds element exists before setting its display property
        const clouds = document.querySelector(".cloud");
        if (clouds) {
          if (
            data.WeatherText === "Cloudy" ||
            data.WeatherText === "Mostly Cloudy" ||
            data.WeatherText === "Partly Cloudy"
          ) {
            clouds.style.display = "block";
          } else {
            clouds.style.display = "none";
          }
        } else {
          console.error("Clouds element not found");
        }
      } else {
        // Handle the case when data is not available
        weather.innerHTML = "Weather information not available";
        degree.innerHTML = "Temperature information not available";
      }
    } catch (err) {
      console.log(err);
    }
  }
});
