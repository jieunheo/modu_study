import MiniAlert from "./MiniAlert.js";

// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const weatherInfo = document.getElementById("weather-info");

const API_KEY = `14060c2fec08fd1eecc07ae18298e073`;

const searchWeather = async () => {
  const city = cityInput.value.trim();
  if (!city) {
    MiniAlert.fire({
      // title: "경고",
      message: "도시 이름을 입력하세요",
      useBackdropClose: false,
      onClose: () => {
        cityInput.focus();
      },
    });
    // alert("도시 이름을 입력하세요");
    return;
  }
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("에러", res.status);

    const data = await res.json();
    // console.log(data);

    cityName.innerHTML = data.name;
    const weather = data.weather[0];
    const main = data.main;

    const weatherMain = document.createElement("p");
    weatherMain.innerHTML = `${main.temp}°C`;
    const weatherIcon = document.createElement("img");
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const weatherName = document.createElement("p");
    weatherName.innerHTML = `${weather.main} <span>(${weather.description})</span>`;

    weatherInfo.dataset.id = weather.id;
    weatherInfo.replaceChildren(weatherMain, weatherIcon, weatherName);

    let weatherStr = "";
    if (weather.description.indexOf("cloud") > -1) {
      weatherStr = "cloud";
    } else if (weather.description.indexOf("rain") > -1) {
      weatherStr = "rain";
    } else if (weather.description.indexOf("snow") > -1) {
      weatherStr = "snow";
    } else if (weather.description.indexOf("clear") > -1) {
      weatherStr = "clear";
    } else {
      weatherStr = "???";
    }

    // console.log(weatherStr);
    setBackgroundEffect(weatherStr);
  } catch (err) {
    console.error(err);
  }
};

searchBtn.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", (e) => {
  // console.log(e.code);
  if (e.code.indexOf("Enter") > -1) searchWeather();
});

// 날씨에 따른 배경 처리
function setBackgroundEffect(weatherStr) {
  let color;
  switch (weatherStr) {
    case "cloud":
      color = "gainsboro";
      break;
    case "rain":
      color = "lightsteelblue";
      break;
    case "snow":
      color = "aliceblue";
      break;
    case "clear":
      color = "lightyellow";
      break;
    default:
      color = "tomato";
      break;
  }
  document.body.style.background = color;
}
