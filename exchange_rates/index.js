(function () {
    let dateForAPI = new Date();
    console.log(dateForAPI.getDate());
    console.log(dateForAPI.getMonth());
    console.log(dateForAPI.getFullYear());
    const urlAPI =
      'https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014';
    fetch(urlAPI).then(function (response) { 
        if (response.ok) {
            return response.json();
        }
     }).then(function (data) { 
        console.log(data);
      });
    })();
