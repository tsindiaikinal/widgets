"use strict";

import { TOKEN } from "./config.js"; /* Import token from config */

(function () {
  let widget = document.getElementById("weather");
  const WEATHER_SERVER = `https://api.openweathermap.org/data/2.5/weather?lat=47.95557365079761&lon=23.87679685218749&appid=${TOKEN}&units=metric&lang=uk`;

  /* PRELOADER */
  widget.innerHTML =
    '<div style="taxt-align: center; width: 50%; heigh: 50%; margin: auto;"><img style="display: inline-block; width: 100%; height: 100%;" src="sun.svg" alt="preloader"></div>';
  /* **************** */

  fetch(WEATHER_SERVER)
    .then(function (response) {
      // console.log(response.ok);
      if (response.ok) {
        return response.json();
      }
      if (!response.ok) {
        widget.innerHTML =
          '<p style="color: red">Проблема с загрузкой данных!</p>';
        throw new Error("Ответ сети был не ok.");
      }
    })
    .then(function (res) {
      printDataWeather(res);
    });
/* PRINT DATA FROM THE SERVER 'OPENWEATHERMAP' */
  function printDataWeather(forecast) {
    let template = `
    <h2 style="text-align: center">Прогноз погоди</h2>
        <div class="data-container" style="text-align: center">
          <h3>Солотвино</h3>
          <figure>
          <img class="icon-clouds" src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt="Clouds" />
          <figcaption style="text-transform: uppercase">${
            forecast.weather[0].description
          }</figcaption>
          </figure>
          <p style="font-weight: bold; font-size: 3rem">${Math.round(
            forecast.main.temp
          )} &deg;C</p>
          <p>Відчувається як: ${Math.round(forecast.main.feels_like)} &deg;C</p>
        </div>`;
    widget.innerHTML = template;
  }
})();
