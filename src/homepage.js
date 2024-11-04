function buttonClicked() {
    const city = document.getElementById("cityInput").value;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); 

            // for current weather
            const locationname = data.location.name;
            const temperature = data.current.temp_c;
            const feelslike = data.current.feelslike_c;
            const iconUrl = `https:${data.current.condition.icon}`;
            const conditiontext = data.current.condition.text;
            const localtime = data.location.localtime;
            const region = data.location.region;
            const country = data.location.country;
            const humidity = data.current.humidity;
            const windSpeed = data.current.wind_kph;
            const sunrise = data.forecast.forecastday[0].astro.sunrise;
            const sunset = data.forecast.forecastday[0].astro.sunset;
            const pressure = data.current.pressure_mb;
            const clouds = data.current.cloud;
            const chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
            const chanceOfSnow = data.forecast.forecastday[0].day.daily_chance_of_snow;

            // // update the DOM with current weather data
            document.querySelector('.locationname').innerText = locationname;
            document.querySelector('.temperature').innerText = `Temperature: ${temperature} °C`;
            document.querySelector('.feelslike').innerText = `Feels like: ${feelslike} °C`;
            document.querySelector('.icon').src = iconUrl;
            document.querySelector('.conditiontext').innerText = conditiontext;
            document.querySelector('.localtime').innerText = localtime;
            document.querySelector('.region').innerText = region;
            document.querySelector('.country').innerText = country;
            document.getElementById('humidity').innerText = `${humidity}%`;
            document.getElementById('windSpeed').innerText = `${windSpeed} kph`;
            document.getElementById('sunrise').innerText = sunrise;
            document.getElementById('sunset').innerText = sunset;
            document.getElementById('pressure').innerText = `${pressure} mb`;
            document.getElementById('clouds').innerText = `${clouds}%`;
            document.getElementById('chanceOfRain').innerText = `${chanceOfRain}%`;
            document.getElementById('chanceOfSnow').innerText = `${chanceOfSnow}%`;


            sessionStorage.setItem("weatherCondition", conditiontext.toLowerCase());


            // to display hourly forecast
            const forecastHours = data.forecast.forecastday[0].hour;
            for (let i = 0; i < 6; i++) {
                const hourForecast = forecastHours[i * 4];
                document.getElementById(`timeHour${i + 1}`).innerText = hourForecast.time;
                document.getElementById(`iconHour${i + 1}`).src = `https:${hourForecast.condition.icon}`; 
                document.getElementById(`tempHour${i + 1}`).innerText = `${hourForecast.temp_c} °C`;
                document.getElementById(`conditionHour${i + 1}`).innerText = hourForecast.condition.text; 
                document.getElementById(`windHour${i + 1}`).innerText = `Wind Speed: ${hourForecast.wind_kph} kph`; 
                document.getElementById(`humiHour${i + 1}`).innerText = `Humidity: ${hourForecast.humidity}%`; 
            }

            document.getElementById('viewActivityButton').style.display = 'block';
        
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred: " + error.message);
        });
}

// redirect to activities.html
function redirectToActivities() {
    window.location.href = "activities.html"
}