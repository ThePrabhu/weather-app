// fetching locaion manually
async function getWeather() {
  const location = document.querySelector("#Location").value.trim().toLowerCase();
  const outputDiv = document.querySelector(".result");

  if (!location) {
    outputDiv.innerHTML = `⚠️ Enter a location`;
    return;
  }

  outputDiv.innerHTML = `Loading...`;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    outputDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    `;
  } catch (error) {
    outputDiv.innerHTML = "Error: " + error.message;
  }
}

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  getWeather();
});


// Fetching weather using the current location

document.querySelector("#byLocation").addEventListener("click", () => {
  const outputDiv = document.querySelector(".result");
  outputDiv.innerHTML = "Fetching your location...";

  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=476e39419c6d310427b5be41ff22119e&units=metric`
      );

      if (!response.ok) throw new Error("Location not found");

      const data = await response.json();

      outputDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
      `;
    } catch (error) {
      outputDiv.innerHTML = "Error: " + error.message;
    }
  }, () => {
    outputDiv.innerHTML = "⚠️ Unable to access location.";
  });
});