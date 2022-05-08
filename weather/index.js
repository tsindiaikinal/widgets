(function () {
  let widget = document.getElementById("weather");
  const weatherServer =
    "https://api.openweathermap.org/data/2.5/weather?lat=47.95557365079761&lon=23.87679685218749&appid=fb0814e0a5ddd5c7090ad2025182d6dd&units=metric&lang=uk";
  widget.innerHTML = '<div style="taxt-align: center; width: 50%; heigh: 50%; margin: auto;"><img style="display: inline-block; width: 100%; height: 100%;" src="sun.svg" alt="preloader"></div>';

  fetch(weatherServer)
    .then(function (response) {
      console.log(response.ok);
      if (response.ok) {
        return response.json();
      }
      if (!response.ok) {
        widget.innerHTML = '<p style="color: red">Проблема с загрузкой данных!</p>';
        throw new Error("Ответ сети был не ok.");
      }
    })
    .then(function (res) {
      console.log(res);
      printDataWeather(res);
    });

  function printDataWeather(forecast) {
    let template = `
    <h2 style="text-align: center">Прогноз погоди</h2>
        <div class="data-container" style="text-align: center">
          <h3>Солотвино</h3>
          <figure>
          <img class="icon-clouds" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Clouds" />
          <figcaption style="text-transform: uppercase">${forecast.weather[0].description}</figcaption>
          </figure>
          <p style="font-weight: bold; font-size: 3rem">${Math.round(forecast.main.temp)} &deg;C</p>
          <p>Відчувається як: ${Math.round(forecast.main.feels_like)} &deg;C</p>
          <p>
              <span></span>
          </p>
        </div>`;
    widget.innerHTML = template;
  }
})();