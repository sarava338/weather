// Weather API
// var url = 'http://api.weatherapi.com/v1/current.json?key=a50a2f9209c04431921163312220806&q=tuticorin&aqi=no'
// var url = `http://api.weatherapi.com/v1/astronomy.json?key=a50a2f9209c04431921163312220806&q=London&dt=2022-06-09`
// Reverse GeoCode API
// var url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

var city = document.getElementById('city')
var btn = document.getElementById('btn')
var form = document.getElementById('form')

const submitEvent = (e) => {
  e.preventDefault();
  if (!city.value) alert("Enter Input Details Correctly");
  else
    getData(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city.value}&days=1&aqi=no&alert=no`
    );
  city.value = "";
};

var doHeader = (data, date) => {

  document.getElementById("title").innerText =
    "Astro & Weather of " + data.location.name;
  document.getElementById("today").innerText = data.location.localtime;
};

var doWeather = (data) => {
  let con = document.getElementById("condition");
  let img = document.createElement("img");
  let p = document.createElement("p");

  img.setAttribute("src", data.current.condition.icon);
  p.innerText = data.current.condition.text;
  con.appendChild(img);
  con.appendChild(p);

  document.getElementById("temp-c").innerText = data.current.temp_c + "\u00B0C";
  document.getElementById("temp-f").innerText = data.current.temp_f + "\u00B0F";

  document.getElementById("humidity").innerText = data.current.humidity + " %";

  document.getElementById("cloud").innerText = data.current.cloud + " %";

  document.getElementById("atm-mb").innerText = data.current.pressure_mb + " mb";
  document.getElementById("atm-in").innerText = data.current.pressure_in + " Hg";
};

var doAstro = (data) => {
  document.getElementById("moon-rise").innerText =
    "Rise Time : " + data.astro.moonrise;
  document.getElementById("moon-set").innerText =
    "Set Time : " + data.astro.moonset;

  document.getElementById("sun-rise").innerText =
    "Rise Time : " + data.astro.sunrise;
  document.getElementById("sun-set").innerText =
    "Set Time : " + data.astro.sunset;
};

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (data.latitude)
    getData(
      `http://api.weatherapi.com/v1/forecast.json?key=a50a2f9209c04431921163312220806&q=${data.city}&days=1&aqi=no&alert=no`
    );

  if (data.forecast) {
    doHeader(data, data.forecast.forecastday[0].date);
    doAstro(data.forecast.forecastday[0]);
    doWeather(data);
  }
}

window.onload = () => {
  if (!navigator.geolocation)
    alert("Geolocation is not supported by your browser");
  else
    navigator.geolocation.getCurrentPosition(
      (position) =>
        getData(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
        ),
      (e) =>
        console.warn(
          "ERROR CODE : " + e.code + "\nERROR MESSEGE : " + e.message
        ),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
};

// form.addEventListener("submit", (e) => submitEvent());
