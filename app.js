const weatherApi = {
    key: "e9db8f9aa496897a412305c2f4afb434",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInput = document.getElementById('input-search');
searchInput.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
        console.log(searchInput.value);
        getWeatherReport(searchInput.value);
        document.querySelector('.weather-details').style.display = "block";
    }
});


function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`

    let minMAxTemp = document.getElementById('min-max');
    minMAxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (Min) / ${Math.ceil(weather.main.temp_max)}&deg;C (Max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('img/clear.jpg')";
    }
    else if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('img/haze.jpg')";
    }
    else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('img/clouds.jpg')";
    }
    else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('img/rain.jpg')";
    }
    else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('img/snow.jpg')";
    }
    else if (weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";
    }
    else {
        document.body.style.backgroundImage = "url('img/clear.jpg')";
    }

}

function dateManage(fullDate) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
        "December"];

    let year = fullDate.getFullYear();
    let month = months[fullDate.getMonth()];
    let date = fullDate.getDate();
    let day = days[fullDate.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}