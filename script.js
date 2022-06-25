// Weather API
// var url = 'http://api.weatherapi.com/v1/current.json?key=a50a2f9209c04431921163312220806&q=tuticorin&aqi=no'
// var url = `http://api.weatherapi.com/v1/astronomy.json?key=a50a2f9209c04431921163312220806&q=London&dt=2022-06-09`
// Reverse GeoCode API
// var url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

var city = document.getElementById('city')
var btn = document.getElementById('btn')
var form = document.getElementById('form')

var doHeader = (data, date) => {

    document.getElementById('local').innerText = data.location.name + ', ' + data.location.region + ', ' + data.location.country
    document.getElementById('astro-date').innerText = date
    document.getElementById('today').innerText = data.location.localtime
}

var doWeather = data => {
    
    let con = document.getElementById('condition')
    let img = document.createElement('img')
    
    img.setAttribute('src', data.current.condition.icon)
    con.innerText = data.current.condition.text
    con.appendChild(img)
    
    document.getElementById('temp-c').innerText = data.current.temp_c
    document.getElementById('temp-f').innerText = data.current.temp_f
    
    document.getElementById('humidity').innerText = data.current.humidity + ' %'
    
    document.getElementById('cloud').innerText = data.current.cloud + ' %'
    
    document.getElementById('atm-mb').innerText = data.current.pressure_mb
    document.getElementById('atm-in').innerText = data.current.pressure_in
}

var doAstro = data => {
    
    document.getElementById('moon-rise').innerText = 'Rise Time : ' + data.astro.moonrise
    document.getElementById('moon-set').innerText = 'Set Time : ' + data.astro.moonset
    
    document.getElementById('sun-rise').innerText = 'Rise Time : ' + data.astro.sunrise
    document.getElementById('sun-set').innerText = 'Set Time : ' + data.astro.sunset
}

async function getData(url) {

    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
    
    if (data.latitude) getData(`http://api.weatherapi.com/v1/forecast.json?key=a50a2f9209c04431921163312220806&q=${data.city}&days=1&aqi=no&alert=no`)
    
    if (data.forecast) {

        doHeader(data, data.forecast.forecastday[0].date)
        doAstro(data.forecast.forecastday[0])
        doWeather(data)
    }
}

window.onload = () => {

    if (!navigator.geolocation) alert('Geolocation is not supported by your browser')
    
    else navigator.geolocation.getCurrentPosition(
        (p) => { 
            console.log(p)
            getData(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
        },
        (e) => console.warn('ERROR CODE : ' + e.code + '\nERROR MESSEGE : ' + e.message),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    )    
}

form.addEventListener('submit', (e) => {

    e.preventDefault()

    if (!city.value) alert('Enter Input Details Correctly')

    else getData(`http://api.weatherapi.com/v1/forecast.json?key=a50a2f9209c04431921163312220806&q=${city.value}&days=1&aqi=no&alert=no`)
    
    city.value = ''
})

city.addEventListener('keydown', (e) => {

    if(e.keycode == 13) {

        if (!city.value) alert('Enter Input Details Correctly')
    
        else getData(`http://api.weatherapi.com/v1/forecast.json?key=a50a2f9209c04431921163312220806&q=${city.value}&days=1&aqi=no&alert=no`)
    
    }
    
    city.value = ''
})
