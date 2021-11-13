var cityName;

let weather = {
    apiKey: "8a1912dd2412fd8247b7187c4b91b18d",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("Wrong city name, No weather found.");
            throw new Error("Wrong city name, No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, feels_like } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = name;
      cityName = name;
      console.log(cityName);
      document.querySelector(".Icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".Temp").innerText = temp + "°C";
      document.querySelector(".feels_like").innerText =
        "feels like: " + feels_like + "°C";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");

      var forecast = document.querySelector(".weatherWidget");
      while(forecast.hasChildNodes()) {
        forecast.removeChild(forecast.lastChild);
      }

      window.weatherWidgetConfig =  window.weatherWidgetConfig || [];
   window.weatherWidgetConfig.push({
       selector:".weatherWidget",
       apiKey:"HG55NEAJFM8VNTHM6SWJG7BLE", //Sign up for your personal key
       location: cityName, //Enter an address
       unitGroup:"metric", //"us" or "metric"
       forecastDays:5, //how many days forecast to show
       title: cityName, //optional title to show in the 
       showTitle:true, 
       showConditions:true
   });
  
   (function() {
   var d = document, s = d.createElement('script');
   s.src = 'https://www.visualcrossing.com/widgets/forecast-simple/weather-forecast-widget-simple.js';
   s.setAttribute('data-timestamp', + new Date());
   (d.head || d.body).appendChild(s);
   })();
     
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search-icon").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
        //console.log(cityName);
      }
    });
  
  weather.fetchWeather("Shanghai");
  
  