(function () {
  function setDateValue(date = null) {
    let urlAPI = null;
    if (date === null) {
      urlAPI =
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    } else {
      urlAPI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`;
      // console.log(date);
    }
    fetch(urlAPI)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (response) {
        printData(response);
      });
  }

  /* Print data from the bank */
  function printData(data) {
    if (document.querySelector(".exchange-rates__body")) {
      let template = "";
      data.forEach((el) => {
        template += `<tr>
                        <td class="exchange-rates__body-elem">${el.txt}</td>
                        <td class="exchange-rates__body-elem">${el.rate}</td>
                        <td class="exchange-rates__body-elem">${el.cc}</td>
                        <td class="exchange-rates__body-elem">${el.exchangedate}</td>
                      </tr>`;
      });
      document.querySelector(".exchange-rates__body").innerHTML = template;
    }
  }

  setDateValue();

  /* Listener date from calendar */
  document.getElementById("date_rate").addEventListener("change", function (e) {
    let inputDateValue = e.target.value.replace(/-/g, "");
    setDateValue(inputDateValue);
  });
})();
